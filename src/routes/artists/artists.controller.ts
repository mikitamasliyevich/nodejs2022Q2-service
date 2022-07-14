import { Controller, Get, Post, Body, HttpCode, Param, ParseUUIDPipe, Delete, Put } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';
import { Artist } from './entities/artists.entity';


@Controller('artist')
export class ArtistController {
  constructor(private artistsService: ArtistsService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  async findAll(): Promise<Artist[]> {
    return this.artistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.artistsService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.artistsService.remove(id);
  }

  @Put(':id')
  @HttpCode(200)
  async update(
    @Body() updateArtistDto: UpdateArtistDto,
    @Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.artistsService.update(id, updateArtistDto);
  }
}
