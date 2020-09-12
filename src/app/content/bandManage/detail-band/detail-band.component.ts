import { Component, OnInit } from '@angular/core';
import {CategoryInfo} from '../../../model/category-info';
import {PlaylistInfo} from '../../../model/playlist-info';
import {SongInfo} from '../../../model/song-info';
import {BandInfo} from '../../../model/band-info';
import {BandService} from '../../../service/band.service';
import {SongService} from '../../../service/song.service';
import {PlaylistService} from '../../../service/playlist.service';
import {ActivatedRoute} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-detail-band',
  templateUrl: './detail-band.component.html',
  styleUrls: ['./detail-band.component.css']
})
export class DetailBandComponent implements OnInit {
  band: BandInfo = new BandInfo()
  playLists: PlaylistInfo[];
  songs: SongInfo[];
  totalElements: number = 0;
  loading: boolean;
  searchSong;
  searchText;
  constructor(private bandService: BandService,
              private songService: SongService,
              private playListService: PlaylistService,
              private routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.routes.paramMap.subscribe(bandId=>{
      const id = +bandId.get('id');
      this.bandService.getBandById(id).subscribe(result=>{
        this.band = result;
        console.log('bandid',result.id)
        this.getListResquest({page:'',size:''})
      })
    })
  }
  getListResquest(request) {
    this.loading = true;
    console.log('loading', this.loading)
    this.songService.getPageSongByBand(this.band.id,request)
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
    // this.getPagePlayListResquest(request);
  }
}
