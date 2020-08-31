import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {CategoryTestInfo} from '../model/category-test-info';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryTestService {
  // private API_Category_Test = environment.URL_local+'categorytest';

  private API_Category_Test = environment.URL_server+'categorytest'
  constructor(private http: HttpClient) { }
  createCategoryTest(categoryTest: CategoryTestInfo): Observable<CategoryTestInfo>{
    return this.http.post<CategoryTestInfo>(this.API_Category_Test, categoryTest)
  }
  getPageCategoryTest(request){
    const params = request;
    return this.http.get(this.API_Category_Test, {params})
  }

}
