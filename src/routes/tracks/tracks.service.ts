import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './entities/tracks.entity';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { NOT_EXIST } from 'src/utils';


@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>
  ) {}

  async findAll(): Promise<Track[]> {
    return await this.trackRepository.find();
 }

 
 async findOne(trackId: string): Promise<Track> {
  const track = await this.trackRepository.findOne( {where: {id: trackId}} )
  if (!track) {
  throw new NotFoundException(NOT_EXIST);
} else {
  return track;
}
  }

  async create( track: CreateTrackDto): Promise<Track> {
    const createdTrack = this.trackRepository.create(track);
    return await this.trackRepository.save(createdTrack);
}

async remove(trackId: string): Promise<void> {
  const result = await this.trackRepository.delete(trackId);

  if (result.affected === 0) {
    throw new NotFoundException();
  }
  return;
}

async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
  const album = await this.trackRepository.findOne({ where: { id } });
  if (album) {
    return await this.trackRepository.save(
      this.trackRepository.create({
        ...album,
        ...updateTrackDto,
      }),
    );
  }
  throw new NotFoundException();
}
   
  async removeArtist(id: string): Promise<void> {
    const tracks = await this.findAll();
    for (const track of tracks) {
      if (track.artistId === id)
        await this.update(track.id, { ...track, artistId: null });
    }
    return;
  }

  async removeAlbum(id: string): Promise<void> {
    const tracks = await this.findAll();
    for (const track of tracks) {
      if (track.albumId === id)
        await this.update(track.id, { ...track, albumId: null });
    }
    return;
  }
}

