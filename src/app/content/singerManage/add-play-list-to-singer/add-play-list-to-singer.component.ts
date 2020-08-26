import {Component, OnInit} from '@angular/core';
import {SingerService} from '../../../service/singer.service';
import {ActivatedRoute} from '@angular/router';
import {PlaylistService} from '../../../service/playlist.service';
import {SingerInfo} from '../../../model/singer/singer-info';
import {PageEvent} from '@angular/material/paginator';
import {PlaylistInfo} from '../../../model/playlist-info';

@Component({
  selector: 'app-add-play-list-to-singer',
  templateUrl: './add-play-list-to-singer.component.html',
  styleUrls: ['./add-play-list-to-singer.component.css']
})
export class AddPlayListToSingerComponent implements OnInit {
  singer: SingerInfo;
  playLists: PlaylistInfo[];
  isCheck = false;
  loading = false;
  totalElements: number = 0;
  searchText;
  errorMessage = '';

  constructor(private singerService: SingerService,
              private routes: ActivatedRoute,
              private playListService: PlaylistService) {
  }

  ngOnInit(): void {
    this.routes.paramMap.subscribe(singerId => {
      const id = +singerId.get('id');
      this.singerService.getSingerById(id).subscribe(result => {
        this.singer = result;
      });
    });
    this.getListResquest({page:'', size: ''})
  }

  addPlayListToCategory(playList: PlaylistInfo) {
    console.log('leng', this.singer.playlists.length);
    this.isCheck = false;
    if (this.singer.playlists.length == 0) {
      this.isCheck = false;
    } else {
      for (let i = 0; i < this.singer.playlists.length; i++) {
        console.log('playlist.id', playList.id);
        console.log('playlist.id', this.singer.playlists[i].id);
        if (playList.id != this.singer.playlists[i].id) {
          continue;
        } else {
          this.isCheck = true;
          break;
        }
      }
    }
    if (this.isCheck) {
      // alert('The Song already exists in your play list')
      this.errorMessage = 'The PlayList already exists in Music Genre!';
    } else {
      this.singer.playlists.push(playList);
      this.errorMessage = 'add successful Play List!';
      alert('add play list success!');
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
    this.playListService.getPagePlayList(request)
      .subscribe(data => {
        this.playLists = data['content'];
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
