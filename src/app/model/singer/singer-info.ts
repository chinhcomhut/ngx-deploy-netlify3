import {SongInfo} from '../song-info';
import {PlaylistInfo} from '../playlist-info';

export class SingerInfo {
    id: number;
    nameSinger: string;
    avatarSinger: string;
    birthday: any;
    information: string;
    gender: string;
    songList: SongInfo[] = [];
    playlists: PlaylistInfo[] = [];
    createBy: string;
}
