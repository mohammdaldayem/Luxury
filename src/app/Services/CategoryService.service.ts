import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs/observable/forkJoin';
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
    const httpOptions = {
      headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
        .append('Authorization', AppConfig.settings.apiServer.AuthorizationToken)
        .append('Accept-Language', 'En')
    };
    return this.http.get(AppConfig.settings.apiServer.host + 'Category/MainCategories.php', httpOptions);
  }

  deleteCategory(request: any) {
    return this.http.post(AppConfig.settings.apiServer.host + 'Category/DeleteCategory.php', this.getFormUrlEncoded(request), this.httpOptions);
  }

  addCategory(request: any) {
    const httpOptions = {
      headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
        .append('Authorization', AppConfig.settings.apiServer.AuthorizationToken)
        .append('Accept-Language', 'En')
    };
    return this.http.post(AppConfig.settings.apiServer.host + 'Category/AddNewCategory.php', this.getFormUrlEncoded(request), httpOptions);
  }

  updateCategory(request: any) {
    const httpOptions = {
      headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
        .append('Authorization', AppConfig.settings.apiServer.AuthorizationToken)
        .append('Accept-Language', 'En')
    };
    return this.http.post(AppConfig.settings.apiServer.host + 'Category/EditCategory.php', this.getFormUrlEncoded(request), httpOptions);
  }
}
