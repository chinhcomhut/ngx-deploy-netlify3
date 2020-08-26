import {SongInfo} from "./song-info";

export class PlaylistInfo{
    id: number;
    namePlayList: string;
    avatarPlayList: string;
    createBy: string;
    songList: SongInfo[]=[];
    nameSinger: string;
}
