import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../app.config';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }
  getCategories() {
    return this.http.get(
      AppConfig.settings.apiServer.host + 'Category/MainCategories.php',
      this.httpOptions
    );
  }

  deleteCategory(request: any) {
    return this.http.post(
      AppConfig.settings.apiServer.host + 'Category/DeleteCategory.php',
      this.getFormUrlEncoded(request),
      this.httpOptions
    );
  }

  addCategory(request: any) {
    return this.http.post(
      AppConfig.settings.apiServer.host + 'Category/AddNewCategory.php',
      this.getFormUrlEncodedwithfile(request),
      this.httpOptions
    );
  }

  updateCategory(request: any) {
    return this.http.post(
      AppConfig.settings.apiServer.host + 'Category/EditCategory.php',
      this.getFormUrlEncoded(request),
      this.httpOptions
    );
  }
}
