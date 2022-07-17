import { Module } from '@nestjs/common';
import { InMemoryStore } from 'src/db/in-memory.db';
import { FavoriteController } from './favorite.controller';
import { FavoritesService } from './favorite.service';


@Module({
  controllers: [FavoriteController],
  providers: [FavoritesService, InMemoryStore],
})
export class FavoriteModule {}

