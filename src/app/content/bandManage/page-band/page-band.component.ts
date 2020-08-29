import { Component, OnInit } from '@angular/core';
import {CategoryInfo} from '../../../model/category-info';
import {BandInfo} from '../../../model/band-info';
import {BandService} from '../../../service/band.service';
import {PageEvent} from '@angular/material/paginator';

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
  constructor(private bandService: BandService) { }

  ngOnInit(): void {
    this.getListResquest({page:'', size:''})
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
}
