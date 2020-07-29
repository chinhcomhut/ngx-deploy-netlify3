import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private List_Category_Pagination = environment.URL_local+'category/pagination';
  constructor(private http: HttpClient) { }
  getListCategory(request){
    const params = request;
    return  this.http.get(this.List_Category_Pagination,{params});
  }
}
