import {SongInfo} from './song-info';

export class CategoryInfo {
    id: number;
    nameCategory: string;
    avatarCategory: string;
    songList: SongInfo[] = [];
}
