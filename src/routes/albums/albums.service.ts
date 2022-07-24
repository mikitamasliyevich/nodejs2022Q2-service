import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import { InMemoryStore } from 'src/db/in-memory.db';
import { Album } from './entities/albums.entity';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { TracksService } from '../tracks/tracks.service';


@Injectable()
export class AlbumsService {
  constructor(private inMemoryStore: InMemoryStore) {}

  @Inject(TracksService)
  private  tracksService: TracksService;

  findAll(): Album[] {
    return this.inMemoryStore.albums;
 }

 findOne(id: string): Album {
    const album:Album = this.inMemoryStore.albums.find((item) => item.id === id);
    if (!album) {
      throw new NotFoundException(`There is no album with id: ${id}`);
    } else {
      return album;
    }
  }

 create({name, year, artistId}: CreateAlbumDto) {
      const newAlbum = new Album();
      newAlbum.id = v4();
      newAlbum.name = name;
      newAlbum.year = year;
      newAlbum.artistId = artistId;
      this.inMemoryStore.albums.push(newAlbum);
      return newAlbum;
}

    remove(id: string): void  {
    this.tracksService.removeAlbum(id);
    const album: Album = this.inMemoryStore.albums.find((item: Album) => item.id === id);
    if (album) {
       this.inMemoryStore.albums = this.inMemoryStore.albums.filter((item) => item.id !== id);
    } else {
      throw new NotFoundException(`There is no album with id: ${id}`);
    }
}

update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.inMemoryStore.albums.find((item: Album) => item.id === id);
  
    if (album) {
      return Object.assign(album, updateAlbumDto);
    } else {
      throw new NotFoundException(`There is no album with id: ${id}`);
    }
   }
}

