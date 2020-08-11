import {Component, OnInit} from '@angular/core';
import {CategoryInfo} from '../../../model/category-info';
import {CategoryService} from '../../../service/category.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  category: CategoryInfo = new CategoryInfo();
  errorMessage = 'Enter music genres in the form below!';
  data1: any = {
    message: 'nocategory'
  };
  data2: any = {
    message: 'yes'
  };
  data3: any = {
    message: 'noavatar'
  };
 addAvatar = false;
  constructor(private categoryService: CategoryService,
              private route: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.categoryService.createCategory(this.category).subscribe(data => {
      if (JSON.stringify(data) == JSON.stringify(this.data1)) {
        this.errorMessage = 'Category already exists! Please try again!';
      }
      if (JSON.stringify(data) == JSON.stringify(this.data3)) {
        this.errorMessage = 'Please upload avatar!';
      }
      if (JSON.stringify(data) == JSON.stringify(this.data2)) {
        // this.errorMessage = 'Create successful Categories!';
        alert('Create successful Categories!');
        this.route.navigate(['/pageCategory'])
      }
    }, error => {
      this.errorMessage = error.error.message;
    });
  }

  onAvatar($event) {
    this.addAvatar = true;
    this.category.avatarCategory = $event;
  }
}
