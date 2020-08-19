import {Component, OnInit} from '@angular/core';
import {SingerInfo} from '../../../model/singer/singer-info';
import {ActivatedRoute, Router} from '@angular/router';
import {SingerService} from '../../../service/singer.service';
import {Observable} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';
import {SongService} from '../../../service/song.service';
import {SongInfo} from '../../../model/song-info';


@Component({
  selector: 'app-detail-singer',
  templateUrl: './detail-singer.component.html',
  styleUrls: ['./detail-singer.component.css']
})
export class DetailSingerComponent implements OnInit {
  singer: SingerInfo = new SingerInfo();
  songs: SongInfo[];
  totalElements: number = 0;
  loading: boolean;
  searchText;
  panelOpenState = false;
  constructor(private singerService: SingerService,
              private routes: ActivatedRoute,
              private songService: SongService
  ) {
  }

  ngOnInit() {
    this.routes.paramMap.subscribe(singerId=>{
      const id = +singerId.get('id');
      this.singerService.getSingerById(id).subscribe(result=>{
        this.singer = result;
      })
    })
    this.getListResquest({page: '', size: ''});
  }
  private getListResquest(request) {
    this.loading = true;
    this.songService.getPageSongBySinger(request)
      .subscribe(data => {
        this.songs = data['content'];
        console.log('listSong', data);
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
