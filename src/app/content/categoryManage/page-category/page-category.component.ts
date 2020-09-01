import {Component, OnInit} from '@angular/core';
import {CategoryInfo} from '../../../model/category-info';
import {CategoryService} from '../../../service/category.service';
import {PageEvent} from '@angular/material/paginator';
import {TokenStorageService} from '../../../auth/token-storage.service';

@Component({
  selector: 'app-page-category',
  templateUrl: './page-category.component.html',
  styleUrls: ['./page-category.component.css']
})
export class PageCategoryComponent implements OnInit {
  totalElements: number = 0;
  category: CategoryInfo[];
  loading: boolean;
  searchText;
  isCheckAmin = false;
  isCheckUser = false;
  admin: any = ["ADMIN"]
  user: any = ["USER"]
  data1: any = {
    message: "yes"
  }
  constructor(private categoryService: CategoryService,
              private tokenService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.getListResquest({page: '', size: ''});
    if(JSON.stringify(this.tokenService.getAuthorities())==JSON.stringify(this.admin)){
      this.isCheckAmin = true;
    }
    if(JSON.stringify(this.tokenService.getAuthorities())==JSON.stringify(this.user)){
      this.isCheckUser = true;
    }
  }
deleteCategory(id: number){
    this.categoryService.deleteCategory(id).subscribe(data=>{
      if(JSON.stringify(data)==JSON.stringify(this.data1)){
        alert('delete Successful Category!')
        window.location.reload();
      }
    }, error => {
      alert('Phai xoa o cho khac roi')
    })
}
  private getListResquest(request) {
    this.loading = true;
    this.categoryService.getPageCategory(request)
      .subscribe(data => {
        this.category = data['content'];
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
