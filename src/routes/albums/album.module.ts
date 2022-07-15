import { Module } from '@nestjs/common';
import { InMemoryStore } from 'src/db/in-memory.db';
import { TracksService } from '../tracks/tracks.service';
import { AlbumController } from './albums.controller';
import { AlbumsService } from './albums.service';


@Module({
  controllers: [AlbumController],
  providers: [TracksService, AlbumsService, InMemoryStore],
  exports: [AlbumsService]
})
export class AlbumModule {}
