import { IsUUID,  } from 'class-validator';

export class Album  { 
    @IsUUID()
    id: string;
    name: string;
    year: number;
    artistId: string | null;
  }