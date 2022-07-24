import { Controller, Get, Post, Body, HttpCode, Param, ParseUUIDPipe, Delete, Put } from '@nestjs/common';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { Track } from './entities/tracks.entity';
import { TracksService } from './tracks.service';



@Controller('track')
export class TrackController {
  constructor(private tracksService: TracksService) {}

  @Get()
  async findAll(): Promise<Track[]> {
    return this.tracksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.tracksService.findOne(id);
  }
  
  @Post()
  @HttpCode(201)
  async create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.tracksService.remove(id);
  }

  @Put(':id')
  @HttpCode(200)
  async update(
    @Body() updatetrackDto: UpdateTrackDto,
    @Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.tracksService.update(id, updatetrackDto);
  }
}
