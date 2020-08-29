import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoryInfo} from '../model/category-info';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  //API LoCal//
  // private List_Category_Pagination = environment.URL_local + 'category/pagination';
  // private API_Category = environment.URL_local + 'category';
  // private API_Category_Update = environment.URL_local+'update-category';
  // private API_Category_By_User = environment.URL_local+'category-by-user';

  //API Sever//
  private API_Category = environment.URL_server+'category';
  private API_Category_By_User = environment.URL_server+'category-by-user';
  private API_Category_Update = environment.URL_server+'update-category';
  constructor(private http: HttpClient) {
  }

  getPageCategory(request) {
    const params = request;
    return this.http.get(this.API_Category, {params});
  }
  getPageCategoryByUser(request){
    const params = request;
    return this.http.get(this.API_Category_By_User, {params})
  }

  getListCategory(): Observable<CategoryInfo[]> {
    return this.http.get<CategoryInfo[]>(this.API_Category);
  }

  createCategory(category: Object): Observable<Object> {
    return this.http.post(this.API_Category, category);
  }

  getCategoryById(id: number): Observable<CategoryInfo> {
    return this.http.get<CategoryInfo>(`${this.API_Category}/${id}`);
  }

  updateCategory(category: CategoryInfo): Observable<CategoryInfo> {
    return this.http.put<CategoryInfo>(this.API_Category_Update, category);
  }
  updateCategoryById(id: number, category: CategoryInfo): Observable<CategoryInfo>{
    return this.http.put<CategoryInfo>(`${this.API_Category}/${id}`, category)
  }
  deleteCategory(id: number): Observable<CategoryInfo> {
    return this.http.delete<CategoryInfo>(`${this.API_Category}/${id}`);
  }
}
