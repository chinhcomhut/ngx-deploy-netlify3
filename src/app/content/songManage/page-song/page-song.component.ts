import { Component, OnInit } from '@angular/core';
import {SongInfo} from '../../../model/song-info';
import {SongService} from '../../../service/song.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-page-song',
  templateUrl: './page-song.component.html',
  styleUrls: ['./page-song.component.css']
})
export class PageSongComponent implements OnInit {
  totalElements: number = 0;
  loading: boolean;
  searchText;

  songs: SongInfo[];
  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.getListResquest({page: '', size: ''});
  }
  private getListResquest(request) {
    this.loading = true;
    this.songService.getPageSong(request)
      .subscribe(data => {
        this.songs = data['content'];
        console.log('songList', data);
        this.totalElements = data['totalElements'];
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }

  nextPage(event: PageEvent) {
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getListResquest(request);
  }
}
