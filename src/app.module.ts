import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AlbumModule } from './routes/albums/album.module';
import { ArtistModule } from './routes/artists/artist.module';
import { FavoriteModule } from './routes/favorites/favorite.module';
import { TrackModule } from './routes/tracks/track.module';
import { UsersModule } from './routes/users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import  configService  from './ormconfig';

@Module({
  imports: [
    UsersModule, 
    ArtistModule,
    AlbumModule, 
    TrackModule, 
    FavoriteModule,
    ConfigModule.forRoot({isGlobal: true, envFilePath: '../.env'}),
    TypeOrmModule.forRoot(configService)
  ],
})
export class AppModule {}
