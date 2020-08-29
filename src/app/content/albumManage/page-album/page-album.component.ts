import { Component, OnInit } from '@angular/core';
import {BandInfo} from '../../../model/band-info';
import {AlbumInfo} from '../../../model/album-info';
import {PageEvent} from '@angular/material/paginator';
import {AlbumService} from '../../../service/album.service';

@Component({
  selector: 'app-page-album',
  templateUrl: './page-album.component.html',
  styleUrls: ['./page-album.component.css']
})
export class PageAlbumComponent implements OnInit {
  totalElements: number = 0;
  albums: AlbumInfo[];
  loading: boolean;
  searchText;
  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
    this.getListResquest({page:'', size:''})
  }
  private getListResquest(request) {
    this.loading = true;
    this.albumService.getPageAlbum(request)
      .subscribe(data => {
        this.albums = data['content'];
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
