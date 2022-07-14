import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ArtistModule } from './routes/artists/artist.module';
import { UsersModule } from './routes/users/user.module';


@Module({
  imports: [ConfigModule.forRoot(), UsersModule, ArtistModule],
})
export class AppModule {}
