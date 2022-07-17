import { Controller, Get, Post, Body, HttpCode, Param, ParseUUIDPipe, Delete } from '@nestjs/common';
import { Favorites } from './entities/favourite.entity';
import { FavoritesService } from './favorite.service';



@Controller('favs')
export class FavoriteController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  async findAll(): Promise<Favorites> {
    return this.favoritesService.findAll();
  }

  @Post('/artist/:id')
  @HttpCode(201)
  async createArtist(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.favoritesService.addToFavourite(id, 'artists');
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  async removeArtist(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.favoritesService.removeFromFavourite(id, 'artists');
  }

  @Post('/track/:id')
  @HttpCode(201)
  async createTrack(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.favoritesService.addToFavourite(id, 'tracks');
  }

  @Delete('/track/:id')
  @HttpCode(204)
  async removeTrack(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.favoritesService.removeFromFavourite(id, 'tracks');
  }

  @Post('/album/:id')
  @HttpCode(201)
  async createAlbum(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.favoritesService.addToFavourite(id, 'albums');
  }

  @Delete('/album/:id')
  @HttpCode(204)
  async removeAlbum(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.favoritesService.removeFromFavourite(id, 'albums');
  }
}
