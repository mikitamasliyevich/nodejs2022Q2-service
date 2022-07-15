import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import { InMemoryStore } from 'src/db/in-memory.db';
import { Track } from './entities/tracks.entity';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';


@Injectable()
export class TracksService {
  constructor(private inMemoryStore: InMemoryStore) {}

  findAll(): Track[] {
    return this.inMemoryStore.tracks;
 }

 
 findOne(id: string): Track {
    const track: Track = this.inMemoryStore.tracks.find((item) => item.id === id);
    if (!track) {
      throw new NotFoundException(`There is no track with id: ${id}`);
    } else {
      return track;
    }
  }

 create({name, artistId, albumId, duration}: CreateTrackDto) {
    const newTrack = new Track();
    newTrack.id = v4();
    newTrack.name = name;
    newTrack.artistId = artistId;
    newTrack.albumId = albumId;
    newTrack.duration = duration;
    this.inMemoryStore.tracks.push(newTrack);
    return newTrack;
}

remove(id: string): void {
    const track: Track = this.inMemoryStore.tracks.find((item: Track) => item.id === id);
    if (track) {
      this.inMemoryStore.tracks = this.inMemoryStore.tracks.filter((item) => item.id !== id);
    } else {
      throw new NotFoundException(`There is no track with id: ${id}`);
    }
}

update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.inMemoryStore.tracks.find((item: Track) => item.id === id);
  
    if (track) {
      return Object.assign(track, updateTrackDto);
    } else {
      throw new NotFoundException(`There is no track with id: ${id}`);
    }
   }

   async removeArtist(id: string): Promise<void> {
    this.inMemoryStore.tracks = this.inMemoryStore.tracks.map((item) =>
     item.artistId === id ? { ...item, artistId: null } : item);
  }

  async removeAlbum(id: string): Promise<void> {
    this.inMemoryStore.tracks = this.inMemoryStore.tracks.map((item) =>
    item.albumId === id ? { ...item, albumId: null } : item);
  }
}

