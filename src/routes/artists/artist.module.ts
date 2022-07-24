import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from '../albums/album.module';
import { TrackModule } from '../tracks/track.module';
import { ArtistController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { Artist } from './entities/artists.entity';

@Module({
  controllers: [ArtistController],
  providers: [ArtistsService],
  imports: [
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
    TypeOrmModule.forFeature([Artist])
  ],
  exports: [ArtistsService]
})
export class ArtistModule {}
