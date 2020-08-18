import { Component, OnInit } from '@angular/core';
import {SingerService} from '../../../service/singer.service';
import {ActivatedRoute} from '@angular/router';
import {SongService} from '../../../service/song.service';
import {SingerInfo} from '../../../model/singer/singer-info';
import {SongInfo} from '../../../model/song-info';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-addsong-to-singer',
  templateUrl: './addsong-to-singer.component.html',
  styleUrls: ['./addsong-to-singer.component.css']
})
export class AddsongToSingerComponent implements OnInit {
  singer: SingerInfo = new SingerInfo()
  songs: SongInfo[];
  loading = false;
  totalElements: number = 0;
  searchText;
  isCheck = false;
  errorMessage = ''
  constructor(private singerService: SingerService,
              private routes: ActivatedRoute,
              private songService: SongService) { }

  ngOnInit(): void {
    this.routes.paramMap.subscribe(singerId=>{
      const id = +singerId.get('id');
      this.singerService.getSingerById(id).subscribe(result=>{
        this.singer = result;
      })
    })
    this.getListResquest({page: '', size: ''});
  }
  addSongtoCategory(song: SongInfo) {
    console.log('leng', this.singer.songList.length)
    this.isCheck = false;
    if (this.singer.songList.length == 0) {
      this.isCheck = false;
    } else {
      for (let i = 0; i < this.singer.songList.length; i++) {
        console.log('song.id', song.id)
        console.log('songlist.id', this.singer.songList[i].id)
        if (song.id != this.singer.songList[i].id) {
          continue;
        } else {
          this.isCheck = true;
          break;
        }
      }
    }
    if (this.isCheck) {
      // alert('The Song already exists in your play list')
      this.errorMessage = 'The Song already exists in Singer!'
    } else {
      this.singer.songList.push(song);
      this.errorMessage = 'add successful Song!'
      alert('add song success!')
    }
    // console.log('song',song)
    // this.category.songList.push(song);

    this.singerService.updateSinger(this.singer).subscribe(next => {
      console.log('next', next);
      // alert('co vao day khong')
      // this.router.navigate([url]);
      // alert('add song success!')
    });
  }
  private getListResquest(request) {
    this.loading = true;
    this.songService.getPageSong(request)
      .subscribe(data => {
        this.songs = data['content'];
        console.log('category', data);
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
