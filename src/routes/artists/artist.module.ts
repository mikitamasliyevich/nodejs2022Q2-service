import { Module } from '@nestjs/common';
import { InMemoryStore } from 'src/db/in-memory.db';
import { TracksService } from '../tracks/tracks.service';
import { ArtistController } from './artists.controller';
import { ArtistsService } from './artists.service';

@Module({
  controllers: [ArtistController],
  providers: [TracksService, ArtistsService, InMemoryStore],
  exports: [ArtistsService]
})
export class ArtistModule {}
