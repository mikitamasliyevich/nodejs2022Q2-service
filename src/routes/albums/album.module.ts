import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackModule } from '../tracks/track.module';
import { AlbumController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { Album } from './entities/albums.entity';


@Module({
  controllers: [AlbumController],
  providers: [ AlbumsService],
  imports: [
    forwardRef(() => TrackModule),
    TypeOrmModule.forFeature([Album])
  ],
  exports: [AlbumsService]
})
export class AlbumModule {}
