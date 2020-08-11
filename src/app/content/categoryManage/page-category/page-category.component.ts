import {Component, OnInit} from '@angular/core';
import {CategoryInfo} from '../../../model/category-info';
import {CategoryService} from '../../../service/category.service';
import {PageEvent} from '@angular/material/paginator';

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

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.getListResquest({page: '', size: ''});
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

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(data => {
      console.log(data);
      window.location.reload();
    });
  }
}
