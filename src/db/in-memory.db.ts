import { Injectable } from '@nestjs/common';
import { Album } from 'src/routes/albums/entities/albums.entity';
import { Artist } from 'src/routes/artists/entities/artists.entity';
import { Track } from 'src/routes/tracks/entities/tracks.entity';
import { User } from 'src/routes/users/entities/user.entity';

@Injectable()
export class InMemoryStore {
   users: User[] = []
   artists: Artist[] = []
   albums: Album[] = []
   tracks: Track[] = []
   private static instance
   constructor() {
      if(!InMemoryStore.instance) {
         InMemoryStore.instance = this
      }
    
      return InMemoryStore.instance
}
}
