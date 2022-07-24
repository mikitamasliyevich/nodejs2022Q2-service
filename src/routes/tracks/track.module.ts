import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/tracks.entity';
import { TrackController } from './tracks.controller';
import { TracksService } from './tracks.service';


@Module({
  controllers: [TrackController],
  providers: [TracksService],
  imports: [TypeOrmModule.forFeature([Track])],
  exports: [TracksService]
})
export class TrackModule {}
