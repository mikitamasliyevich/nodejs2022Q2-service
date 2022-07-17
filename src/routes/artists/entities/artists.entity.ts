import { IsUUID,  } from 'class-validator';

export class Artist { 
    @IsUUID()
    id: string;
    name: string;
    grammy: boolean;
  }