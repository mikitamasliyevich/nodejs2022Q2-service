import { Injectable, NotFoundException, Inject,  forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './entities/artists.entity';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';
import { TracksService } from '../tracks/tracks.service';
import { NOT_EXIST } from 'src/utils';
import { AlbumsService } from '../albums/albums.service';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject(forwardRef(() => TracksService))
    private  tracksService: TracksService,

    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,

    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>
  ) {}
  

  async findAll(): Promise<Artist[]> {
    return await this.artistRepository.find();
 }

 async findOne(artistId: string): Promise<Artist> {
    const artist = await this.artistRepository.findOne( {where: {id: artistId}} )
    if (!artist) {
    throw new NotFoundException(NOT_EXIST);
  } else {
    return artist;
  }
}

 async create(artist: CreateArtistDto): Promise<Artist> {
  const createdArtist = this.artistRepository.create(artist);
  return await this.artistRepository.save(createdArtist);
}


async remove(id: string): Promise<void> {
  const result = await this.artistRepository.delete(id);
  if (result.affected === 0) {
    throw new NotFoundException();
  }
  // await this.tracksService.remove(id);
  // await this.albumsService.remove(id);  
  return;
}


 async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
  const artist = await this.artistRepository.findOne({ where: { id } });
  if (artist) {
    return await this.artistRepository.save(
      this.artistRepository.create({
        ...artist,
        ...updateArtistDto,
      }),
    );
  }
  throw new NotFoundException();
}
}

