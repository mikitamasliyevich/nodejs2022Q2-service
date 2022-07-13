import { Controller, Get, Post, Body } from '@nestjs/common';
import { ArtistsService } from './artists.service';


@Controller('user')
export class ArtistController {
  constructor(private artistsService: ArtistsService) {}

}
