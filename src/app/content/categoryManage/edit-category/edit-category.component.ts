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
  id: number;
  category: CategoryInfo;
  data1: any = {
    message: 'nocategory'
  };
  errorMessage = 'Please fill of the change name genre in form below!';
  data2: any = {
    message: 'yes'
  };
  data3: any = {
    message: 'noavatar'
  };
  changeAvatar = false;
  changeNameGenre = false;

  constructor(private categoryService: CategoryService,
              private routes: ActivatedRoute,
              private route: Router) {
  }

  ngOnInit(): void {
    this.id = this.routes.snapshot.params['id'];
    console.log('id', this.id);
    this.categoryService.getCategoryById(this.id).subscribe(data => {
      this.category = data;
    }, error => console.log(error));
    // this.routes.paramMap.subscribe(paramMap => {
    //   const id = +paramMap.get('id');
    //   this.categoryService.getCategoryById(id).subscribe(data => {
    //     this.category = data;
    //     console.log('playlist', data);
    //   });
    // });

  }

  updateCategory() {
    this.categoryService.updateCategory(this.id, this.category).subscribe(data => {
      if (JSON.stringify(data) == JSON.stringify(this.data1)) {
        console.log('th1', data);
        this.errorMessage = 'The Category already exists! Please try again!';
      }
      if (JSON.stringify(data) == JSON.stringify(this.data3)) {
        this.errorMessage = 'The Avatar is the same as the old one! Please again!';
      }
      if (JSON.stringify(data) == JSON.stringify(this.data2)) {
        this.changeAvatar = true;
        this.changeNameGenre = true;
        alert('Update successful categories');
        // this.errorMessage='success!!'
        this.route.navigate(['/pageCategory']);
      }
    }, error => {
      this.errorMessage = error.error.message;
    });
  }

  onAvatar($event) {
    this.changeAvatar = true;
    this.category.avatarCategory = $event;
  }
  deleteCategory(id: number){
    this.categoryService.deleteCategory(id).subscribe(data=>{
      console.log(data)
      alert('Ban da xoa thanh cong!')
      window.location.reload();
    })
  }
}
