import {Component, OnInit, ViewChild} from '@angular/core';
import {PlaylistInfo} from "../../../model/playlist-info";
import {Track} from "../../../../../projects/ngx-audio-player/src/lib/model/track.model";
import {PlaylistService} from "../../../service/playlist.service";
import {ActivatedRoute} from "@angular/router";
import {SongInfo} from "../../../model/song-info";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-detail-playlist',
  templateUrl: './detail-playlist.component.html',
  styleUrls: ['./detail-playlist.component.css']
})
export class DetailPlaylistComponent implements OnInit {
  playList: PlaylistInfo;
  playlist1: Track;
  playlist2: Track[] = [];
  msMapPlayList: Track[] = [];
  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msbapDisplayTitle = true;
  msaapDisplayVolumeControls = true;
  msbapDisplayVolumeControls = true;
  pageSizeOptions = [2, 4, 6];
  dataSource: any;
  displayedColumns: string[] = ['id','nameSong']
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private playListService: PlaylistService,
              private routes: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.routes.paramMap.subscribe(playListId=>{
      const id = +playListId.get('id');
      this.playListService.getPlayListById(id).subscribe(result=>{
        this.playList = result;
        this.convertSongToPlayList(result.songList)
        this.dataSource = new MatTableDataSource<any>(result.songList)
        this.dataSource.paginator = this.paginator;
      })
    })

  }
  convertSongToPlayList(songs: SongInfo[]) {
    for (const song of songs) {
      this.playlist1 = {
        title: song.nameSong,
        link: song.mp3Url
      };
      this.playlist2.push(this.playlist1);
    }
    this.msMapPlayList = this.playlist2;
  }

  changeMsbapDisplayTitle(event) {
    this.msbapDisplayTitle = event.checked;
  }

  changeMsbapDisplayVolumeControls(event) {
    this.msbapDisplayVolumeControls = event.checked;
  }

  changeMsaapDisplayTitle(event) {
    this.msaapDisplayTitle = event.checked;
  }

  changeMsaapDisplayPlayList(event) {
    this.msaapDisplayPlayList = event.checked;
  }

  changeMsaapDisplayVolumeControls(event) {
    this.msaapDisplayVolumeControls = event.checked;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };

}
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}
