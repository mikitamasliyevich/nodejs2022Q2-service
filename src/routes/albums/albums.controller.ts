import { Controller, Get, Post, Body, HttpCode, Param, ParseUUIDPipe, Delete, Put } from '@nestjs/common';
import { HTTP_CODES } from 'src/utils';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { Album } from './entities/albums.entity';


@Controller('album')
export class AlbumController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
   findAll(): Promise<Album[]> {
    return this.albumsService.findAll();
  }

  @Get(':id')
   findOne(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.albumsService.findOne(id);
  }

  @Post()
  @HttpCode(HTTP_CODES.SUCCESS)
   create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HTTP_CODES.DELETED)
   remove(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.albumsService.remove(id);
  }
  
  @Put(':id')
  @HttpCode(HTTP_CODES.UPDATED)
   update(
    @Body() updateAlbumDto: UpdateAlbumDto,
    @Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.albumsService.update(id, updateAlbumDto);
  }

}
