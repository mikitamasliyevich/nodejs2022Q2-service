import { Module } from '@nestjs/common';
import { InMemoryStore } from 'src/db/in-memory.db';
import { TrackController } from './tracks.controller';
import { TracksService } from './tracks.service';


@Module({
  controllers: [TrackController],
  providers: [TracksService, InMemoryStore],
  exports: [TracksService]
})
export class TrackModule {}
