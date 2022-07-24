import { Controller, Get, Post, Body, HttpCode, Param, ParseUUIDPipe, Delete, Put } from '@nestjs/common';
import { HTTP_CODES } from 'src/utils';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';


@Controller('artist')
export class ArtistController {
  constructor(private artistsService: ArtistsService) {}

  @Post()
  @HttpCode(HTTP_CODES.SUCCESS)
   create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
   findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
   findOne(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.artistsService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HTTP_CODES.DELETED)
   remove(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.artistsService.remove(id);
  }

  @Put(':id')
  @HttpCode(HTTP_CODES.UPDATED)
   update(
    @Body() updateArtistDto: UpdateArtistDto,
    @Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.artistsService.update(id, updateArtistDto);
  }
}
