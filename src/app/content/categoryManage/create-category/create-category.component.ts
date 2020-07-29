import { Component, OnInit } from '@angular/core';
import {CategoryInfo} from "../../../model/category-info";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  category: CategoryInfo = new CategoryInfo();
  summited = false;
  constructor() { }

  ngOnInit(): void {
  }

}
