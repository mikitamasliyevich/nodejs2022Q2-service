import { Controller, Get, Post, Body, HttpCode, Param, ParseUUIDPipe, Delete, Put } from '@nestjs/common';
import { HTTP_CODES } from 'src/utils';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { TracksService } from './tracks.service';



@Controller('track')
export class TrackController {
  constructor(private tracksService: TracksService) {}

  @Get()
   findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
   findOne(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.tracksService.findOne(id);
  }
  
  @Post()
  @HttpCode(HTTP_CODES.SUCCESS)
   create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Delete(':id')
  @HttpCode(HTTP_CODES.DELETED)
   remove(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.tracksService.remove(id);
  }

  @Put(':id')
  @HttpCode(HTTP_CODES.UPDATED)
  update(
    @Body() updatetrackDto: UpdateTrackDto,
    @Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.tracksService.update(id, updatetrackDto);
  }
}
