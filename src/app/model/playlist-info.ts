import {SongInfo} from "./song-info";
import {Song} from '../content/playlistManage/detail-playlist/detail-playlist.component';

export class PlaylistInfo{
    id: number;
    namePlayList: string;
    avatarPlayList: string;
    createBy: string;
    songList: SongInfo[];
    nameSinger: string;
    nameAlbum: string;
    nameBand: string;
    nameCategory: string;
}
