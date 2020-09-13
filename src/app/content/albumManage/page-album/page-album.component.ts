import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BandInfo} from '../../../model/band-info';
import {AlbumInfo} from '../../../model/album-info';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {AlbumService} from '../../../service/album.service';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-page-album',
  templateUrl: './page-album.component.html',
  styleUrls: ['./page-album.component.css']
})
export class PageAlbumComponent implements OnInit{

  totalElements: number = 0;
  albums: AlbumInfo[];
  loading: boolean;
  searchText;
  admin: any = ["ADMIN"]
  isCheckAdmin = false;
  data1: any = {
    message: "yes"
  }

  constructor(private albumService: AlbumService,
              private tokenService: TokenStorageService) { }

  ngOnInit(): void {

    this.getListResquest({page:'', size:''})
    if(JSON.stringify(this.tokenService.getAuthorities())==JSON.stringify(this.admin)){
      this.isCheckAdmin = true;
    }
  }
  deleteAlbum(id: number){
    this.albumService.deleteAlbum(id).subscribe(data=>{
      if(JSON.stringify(data)==JSON.stringify(this.data1)){
        alert('delete successful Album')
        window.location.reload()
      }
    })
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
