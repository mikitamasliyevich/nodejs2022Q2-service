import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { InMemoryStore } from 'src/db/in-memory.db';

@Injectable()
export class ArtistsService {
  constructor(private inMemoryStore: InMemoryStore) {}


}

