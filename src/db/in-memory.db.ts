import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryStore {
   favorites = {
      artists: [],
      albums: [],
      tracks: [],
   };
   private static instance
   constructor() {
      if(!InMemoryStore.instance) {
         InMemoryStore.instance = this
      }
    
      return InMemoryStore.instance
}
}
