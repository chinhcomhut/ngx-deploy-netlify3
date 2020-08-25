import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {CategoryInfo} from '../../../model/category-info';
import {CategoryService} from '../../../service/category.service';

@Component({
  selector: 'app-category-by-user',
  templateUrl: './category-by-user.component.html',
  styleUrls: ['./category-by-user.component.css']
})
export class CategoryByUserComponent implements OnInit {
  totalElements: number = 0;
  category: CategoryInfo[];
  loading: boolean;
  searchText;
  data1: any = {
    message: "yes"
  }
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getListResquest({page: '', size: ''});
  }
  deleteCategory(id: number){
    this.categoryService.deleteCategory(id).subscribe(data=>{
      if(JSON.stringify(data)==JSON.stringify(this.data1)){
        alert('delete successful category!')
        window.location.reload();
      }
    }, error => {
      alert('Can phai xoa cac bai hat thuoc the loai truoc!')
    })
  }
  private getListResquest(request) {
    this.loading = true;
    this.categoryService.getPageCategoryByUser(request)
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
