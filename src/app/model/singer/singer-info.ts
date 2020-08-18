import {SongInfo} from '../song-info';

export class SingerInfo {
    id: number;
    nameSinger: string;
    avatarSinger: string;
    birthday: any;
    information: string;
    gender: string;
    songList: SongInfo[] = [];
}
