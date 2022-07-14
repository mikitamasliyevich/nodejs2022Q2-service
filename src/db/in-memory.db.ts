import { Injectable } from '@nestjs/common';
import { Artist } from 'src/routes/artists/entities/artists.entity';
import { User } from 'src/routes/users/entities/user.entity';

@Injectable()
export class InMemoryStore {
   users: User[] = []
   artists: Artist[] = []
}
