export class SingerListRespone {
    content: Singer[];
    totalElements: number;
}
export interface Singer {
    id: number;
    nameSinger: string;
    birthday: any;
    information: string;
    avatarSinger: string;
    gender: string;
}
