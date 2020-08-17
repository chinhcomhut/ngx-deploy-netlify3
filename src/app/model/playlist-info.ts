import {SongInfo} from "./song-info";

export class PlaylistInfo{
    id: number;
    namePlayList: string;
    avatarPlayList: string;
    songList: SongInfo[]=[];
}
