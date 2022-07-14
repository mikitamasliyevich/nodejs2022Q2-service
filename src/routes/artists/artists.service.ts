import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import { InMemoryStore } from 'src/db/in-memory.db';
import { Artist } from './entities/artists.entity';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';

@Injectable()
export class ArtistsService {
  constructor(private inMemoryStore: InMemoryStore) {}


  findAll(): Artist[] {
    return this.inMemoryStore.artists;
 }

  findOne(id: string): Artist {
  const artist:Artist = this.inMemoryStore.artists.find((item) => item.id === id);
  if (!artist) {
    throw new NotFoundException('Artist is not found with this ID');
  } else {
    return artist;
  }
}

 create({ name, grammy }: CreateArtistDto) {
    const newArtist = new Artist();
    newArtist.id = v4();
    newArtist.name = name;
    newArtist.grammy = grammy;
    this.inMemoryStore.artists.push(newArtist);
    return newArtist;
}


 remove(id: string): any {
  const artist: Artist = this.inMemoryStore.artists.find((item: Artist) => item.id === id);
  if (artist) {
    this.inMemoryStore.artists = this.inMemoryStore.artists.filter((item) => item.id !== id);
  } else {
    throw new NotFoundException(`There is no artist with id: ${id}`);
  }
}


 update(id: string, updateArtistDto: UpdateArtistDto) {
  const artist = this.inMemoryStore.artists.find((item: Artist) => item.id === id);

  if (artist) {
    return Object.assign(artist, updateArtistDto);
  } else {
    throw new NotFoundException(`There is no artist with id: ${id}`);
  }
 }
}

