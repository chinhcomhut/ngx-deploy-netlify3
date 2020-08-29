import {SongInfo} from './song-info';
import {PlaylistInfo} from './playlist-info';

export class BandInfo{
  id: number;
  nameBand: string;
  avatarBand: string;
  songList: SongInfo[] = [];
  playlists: PlaylistInfo[] = [];
}
