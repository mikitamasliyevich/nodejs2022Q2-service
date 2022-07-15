import { IsUUID } from 'class-validator';

export class Track  { 
    @IsUUID()
    id: string;
    name: string;
    artistId: string | null;
    albumId: string | null;
    duration: number;
  }