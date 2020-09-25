import {Component, OnInit} from '@angular/core';
import {SongInfo} from '../../../model/song-info';
import {SongService} from '../../../service/song.service';
import {PageEvent} from '@angular/material/paginator';
import {TokenStorageService} from '../../../auth/token-storage.service';

@Component({
  selector: 'app-page-song',
  templateUrl: './page-song.component.html',
  styleUrls: ['./page-song.component.css']
})
export class PageSongComponent implements OnInit {
  totalElements: number = 0;
  loading: boolean;
  searchText;
  isCheck = false;
  admin: any = ['ADMIN'];
  songs: SongInfo[];
  data1: any = {
    message: "yes"
  };

  constructor(private songService: SongService,
              private tokenService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.getListResquest({page: 0, size: 15}); //Chinh size se hien thi size luc khoi dong trang//
    if (JSON.stringify(this.tokenService.getAuthorities()) == JSON.stringify(this.admin)) {
      this.isCheck = true;
    }
  }

  deleteSong(id: number) {
    this.songService.deleteSong(id).subscribe(data => {
      if (JSON.stringify(data) == JSON.stringify(this.data1)) {
        alert('Delete Successful Song!');
      }
      // this.songService.updateSong(this.song.id, this.song).subscribe(()=>{
      // alert('delete successful Song!')
      //   window.location.reload()
      // })
      window.location.reload();
    }, error => {
      alert('Can phai xoa o cho khac truoc');
    });
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
