import { Module } from '@nestjs/common';
import { InMemoryStore } from 'src/db/in-memory.db';
import { AlbumController } from './albums.controller';
import { AlbumsService } from './albums.service';


@Module({
  controllers: [AlbumController],
  providers: [AlbumsService, InMemoryStore],
  exports: [AlbumsService]
})
export class AlbumModule {}
