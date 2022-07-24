import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/albums.entity';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { TracksService } from '../tracks/tracks.service';
import { NOT_EXIST } from 'src/utils';


@Injectable()
export class AlbumsService {
  constructor(
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,

    @InjectRepository(Album)
    private albumRepository: Repository<Album>
  ) {}

  async findAll(): Promise<Album[]> {
    return await this.albumRepository.find();
 }

 async findOne(albumId: string): Promise<Album> {
  const album = await this.albumRepository.findOne( {where: {id: albumId}} )
  console.log(album)
  if (!album) {
  throw new NotFoundException(NOT_EXIST);
} else {
  return album;
}
  }

  async create(album: CreateAlbumDto): Promise<Album> {
    const createdAlbum = this.albumRepository.create(album);
    return await this.albumRepository.save(createdAlbum);
}

  async remove(id: string): Promise<void>  {
    const result = await this.albumRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }

  //  await this.tracksService.remove(id);
   return;
}

async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
  const album = await this.albumRepository.findOne({ where: { id } });
  if (album) {
    return await this.albumRepository.save(
      this.albumRepository.create({
        ...album,
        ...updateAlbumDto,
      }),
    );
  }
  throw new NotFoundException();
}
}

