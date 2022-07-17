import { Album } from 'src/routes/albums/entities/albums.entity';
import { Artist } from 'src/routes/artists/entities/artists.entity';
import { Track } from 'src/routes/tracks/entities/tracks.entity';

export class Favorites { 
    artists: Artist[];
    albums: Album[];
    tracks: Track[];
  }