import {Component, OnInit} from '@angular/core';
import {CategoryInfo} from '../../../model/category-info';
import {BandInfo} from '../../../model/band-info';
import {BandService} from '../../../service/band.service';
import {PageEvent} from '@angular/material/paginator';
import {TokenStorageService} from '../../../auth/token-storage.service';

@Component({
  selector: 'app-page-band',
  templateUrl: './page-band.component.html',
  styleUrls: ['./page-band.component.css']
})
export class PageBandComponent implements OnInit {
  totalElements: number = 0;
  bands: BandInfo[];
  loading: boolean;
  searchText;
  isCheckAdmin = false;
  admin: any = ['ADMIN'];
  data1: any = {
    message: "yes"
  }
  constructor(private bandService: BandService,
              private tokenService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.getListResquest({page: '', size: ''});
    if (JSON.stringify(this.tokenService.getAuthorities()) == JSON.stringify(this.admin)) {
      this.isCheckAdmin = true;
    }
  }

  private getListResquest(request) {
    this.loading = true;
    this.bandService.getPageBand(request)
      .subscribe(data => {
        this.bands = data['content'];
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
  deleteBand(id: number){
    this.bandService.deleteBand(id).subscribe(data=>{
      if(JSON.stringify(data)==JSON.stringify(this.data1)){
        alert('Delete successful Band!')
        window.location.reload();
      }
    }, error => {
      alert('Please login before delete!')
    })
  }
}
