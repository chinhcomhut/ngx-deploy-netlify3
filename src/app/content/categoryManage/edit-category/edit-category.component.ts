import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../service/category.service';
import {CategoryInfo} from '../../../model/category-info';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  category: CategoryInfo = new CategoryInfo();
  data1: any = {
    message: "noname"
  };
  errorMessage = '';
  data2: any = {
    message: "nocategory"
  };
  data3: any = {
    message: "yes"
  };
  addAvatar = false;
  constructor(private categoryService: CategoryService,
              private routes: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.routes.paramMap.subscribe(categoryId =>{
      const id = +categoryId.get('id');
      this.categoryService.getCategoryById(id).subscribe(result=>{
        this.category = result;
      })
    })
  }

  updateCategory() {
    this.categoryService.updateCategoryById(this.category.id, this.category).subscribe(data => {
      if (JSON.stringify(data) == JSON.stringify(this.data1)) {
        this.errorMessage = 'The name Music genre is required! Please fill in form!';
      }
      if (JSON.stringify(data) == JSON.stringify(this.data2)) {
        this.errorMessage = 'The name Music genre already exists! Please try again!';
      }
      if (JSON.stringify(data) == JSON.stringify(this.data3)) {
        alert('Update successful categories');
        window.location.reload();
      }
    }, error => {
      alert('Please login before update!')
    });
  }
  onAvatar($event) {
    this.addAvatar = true;
    this.category.avatarCategory = $event;
  }
}
