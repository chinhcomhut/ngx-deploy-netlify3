import {Component, OnInit} from '@angular/core';
import {BandService} from '../../../service/band.service';
import {SongService} from '../../../service/song.service';
import {ActivatedRoute} from '@angular/router';
import {BandInfo} from '../../../model/band-info';
import {PageEvent} from '@angular/material/paginator';
import {SongInfo} from '../../../model/song-info';

@Component({
  selector: 'app-add-song-to-band',
  templateUrl: './add-song-to-band.component.html',
  styleUrls: ['./add-song-to-band.component.css']
})
export class AddSongToBandComponent implements OnInit {
  band: BandInfo;
  loading = false;
  totalElements: number = 0;
  songs: SongInfo[];
  searchText;
  errorMessage = '';
  isCheck = false;
  constructor(private bandService: BandService,
              private songService: SongService,
              private routes: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.routes.paramMap.subscribe(bandId => {
      const id = +bandId.get('id');
      this.bandService.getBandById(id).subscribe(result => {
        this.band = result;
        console.log('result',result)
        this.getListResquest({page:'', size:''}, this.band.id)
      });
    });

  }
  addSongtoCategory(song: SongInfo) {
    console.log('leng', this.band.songList.length)
    this.isCheck = false;
    if (this.band.songList.length == 0) {
      this.isCheck = false;
    } else {
      for (let i = 0; i < this.band.songList.length; i++) {
        console.log('song.id', song.id)
        console.log('songlist.id', this.band.songList[i].id)
        if (song.id != this.band.songList[i].id) {
          continue;
        } else {
          this.isCheck = true;
          break;
        }
      }
    }
    if (this.isCheck) {
      // alert('The Song already exists in your play list')
      this.errorMessage = 'The Song already exists in Music Genre!'
    } else {
      this.band.songList.push(song);
      this.errorMessage = 'add successful Song!'
      alert('add song success!')
    }
    // console.log('song',song)
    // this.category.songList.push(song);

    this.bandService.updateBand(this.band).subscribe(next => {
      console.log('next', next);
      // alert('co vao day khong')
      // this.router.navigate([url]);
      // alert('add song success!')
    });
  }
  private getListResquest(request, id: number) {
    this.loading = true;
    console.log('idband',this.band.id)
    id = this.band.id;
    this.songService.getPageSongByBand(request, id)
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
    this.getListResquest(request, this.band.id);
  }

}
