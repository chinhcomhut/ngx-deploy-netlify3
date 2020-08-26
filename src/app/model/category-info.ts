import {SongInfo} from './song-info';
import {PlaylistInfo} from './playlist-info';

export class CategoryInfo {
    id: number;
    nameCategory: string;
    avatarCategory: string;
    songList: SongInfo[] = [];
    createBy: string;
    playlists: PlaylistInfo[] = [];
}
