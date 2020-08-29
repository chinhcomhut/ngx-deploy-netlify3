import {Component, OnInit} from '@angular/core';
import {SongService} from '../../../service/song.service';
import {SongInfo} from '../../../model/song-info';
import {BandInfo} from '../../../model/band-info';
import {BandService} from '../../../service/band.service';

@Component({
  selector: 'app-create-song-for-band',
  templateUrl: './create-song-for-band.component.html',
  styleUrls: ['./create-song-for-band.component.css']
})
export class CreateSongForBandComponent implements OnInit {
  errorMessage = 'Complete the form below!';
  song: SongInfo = new SongInfo();
  bands: BandInfo[] = [];
  addFileMp3 = false;
  addAvatar = false;
  selectBand = this.bands[0];
  data1: any = {
    message: "noname"
  }
  data2: any = {
    message: "noavatar"
  }
  data3: any = {
    message: "nolyric"
  }
  data4: any = {
    message: "nomp3url"
  }
  data8: any = {
    message: "nosong"
  }
  data6: any = {
    message: "noband"
  }
  data7: any = {
    message: "yes"
  }

  constructor(private songService: SongService,
              private bandService: BandService) {
  }

  ngOnInit(): void {
    this.bandService.getListBand().subscribe(listBand => {
      this.bands = listBand;
    });
  }

  createSongForBand() {
    console.log('song', this.song);
    this.songService.createSongForBrand(this.song).subscribe(data => {
      console.log('data', data);
      if (JSON.stringify(data) == JSON.stringify(this.data1)) {
        this.errorMessage = 'The name Song is required! Please fill in form!';
      }
      if (JSON.stringify(data) == JSON.stringify(this.data8)) {
        this.errorMessage = 'The song already exists, you can change the name song or change band!';
      }
      if (JSON.stringify(data) == JSON.stringify(this.data2)) {
        this.errorMessage = 'Please upload avatar!';
      }
      if (JSON.stringify(data) == JSON.stringify(this.data3)) {
        this.errorMessage = 'The lyric is required! Please fill in form!';
      }
      if (JSON.stringify(data) == JSON.stringify(this.data4)) {
        this.errorMessage = 'Please upload file Mp3!';
      }
      if (JSON.stringify(data) == JSON.stringify(this.data6)) {
        this.errorMessage = 'Please choose one band';
      }
      if (JSON.stringify(data) == JSON.stringify(this.data7)) {
        this.errorMessage = 'Create successful song!!';
        alert(this.errorMessage);
      }

    });
  }

  onAvatar($event) {
    this.addAvatar = true;
    this.song.avatarSong = $event;
  }

  onChange($event) {
    this.addFileMp3 = true;
    this.song.mp3Url = $event;
  }

}
