import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AlbumModule } from './routes/albums/album.module';
import { ArtistModule } from './routes/artists/artist.module';
import { UsersModule } from './routes/users/user.module';


@Module({
  imports: [ConfigModule.forRoot(), UsersModule, ArtistModule, AlbumModule],
})
export class AppModule {}
