import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InMemoryStore } from 'src/db/in-memory.db';
import { Favorites } from './entities/favourite.entity';


@Injectable()
export class FavoritesService {
    constructor(
        private inMemoryStore: InMemoryStore
      ) {}

  findAll(): Favorites {
    return this.inMemoryStore.favorites;
 }

 addToFavourite(id: string, endpoint) {
    const findItem = this.inMemoryStore[endpoint]?.find((elem) => elem?.id === id);
    if(findItem) {
        const favMemory = this.inMemoryStore?.favorites[endpoint]
        const findInMemory = this.inMemoryStore?.favorites[endpoint]?.find((elem) => elem.id === id);
        !findInMemory && favMemory.push(findItem)
        return favMemory
    } else {
        throw new UnprocessableEntityException()
    }
  }

  removeFromFavourite(id: string, store) {
    const findItem = this.inMemoryStore.favorites[store].findIndex((item) => item.id === id);
    if (findItem === -1) return null;
    this.inMemoryStore.favorites[store].splice(findItem, 1);
    return this.inMemoryStore.favorites[store];
    }
}

