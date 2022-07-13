import { Injectable } from '@nestjs/common';
import { User } from 'src/resources/users/interfaces/user.interface';

@Injectable()
export class InMemoryStore {
   users: User[] = []
}
