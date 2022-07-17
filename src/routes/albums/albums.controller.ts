import { Controller, Get, Post, Body, HttpCode, Param, ParseUUIDPipe, Delete, Put } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { Album } from './entities/albums.entity';


@Controller('album')
export class AlbumController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  async findAll(): Promise<Album[]> {
    return this.albumsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.albumsService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.albumsService.remove(id);
  }
  
  @Put(':id')
  @HttpCode(200)
  async update(
    @Body() updateAlbumDto: UpdateAlbumDto,
    @Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.albumsService.update(id, updateAlbumDto);
  }

}
