import {Component, OnInit} from '@angular/core';
import {AlbumService} from '../../../service/album.service';
import {AlbumInfo} from '../../../model/album-info';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.css']
})
export class CreateAlbumComponent implements OnInit {
  errorMessage = 'Complete the form below!';
  album: AlbumInfo = new AlbumInfo();
  addAvatar = false;
  data1: any = {
    message: "noname"
  };
  data2: any = {
    message: "noavatar"
  };
  data3: any = {
    message: "noalbum"
  };
  data4: any = {
    message: "yes"
  };

  constructor(private albumService: AlbumService) {
  }

  ngOnInit(): void {
  }

  createAlbum() {
    console.log('album', this.album)
    this.albumService.createAlbum(this.album).subscribe(data => {
      console.log('data',data)
      if (JSON.stringify(data) == JSON.stringify(this.data1)){
        this.errorMessage = 'The name Album is required! Please try again!';
      }
      if (JSON.stringify(data) == JSON.stringify(this.data2)) {
        this.errorMessage = 'Please upload avatar!';
      }
      if (JSON.stringify(data) == JSON.stringify(this.data3)) {
        this.errorMessage = 'The Album already exists! Please try again!';
      }
      if (JSON.stringify(data) == JSON.stringify(this.data4)) {
        this.errorMessage = 'Create successful album!';
        alert(this.errorMessage);
      }
    }, error => {
      alert('Create failed, please login before create!');
    });
  }

  onAvatar($event) {
    this.addAvatar = true;
    this.album.avatarAlbum = $event;
  }
}
