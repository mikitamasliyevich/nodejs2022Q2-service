import { Module } from '@nestjs/common';
import { InMemoryStore } from 'src/db/in-memory.db';
import { ArtistController } from './artists.controller';
import { ArtistsService } from './artists.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistsService, InMemoryStore],
  exports: [ArtistsService],
})
export class ArtistModule {}
