import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { AppConfig } from '../app.config';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getSupCategories(request) {
    const httpOptions = {
      headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', AppConfig.settings.apiServer.AuthorizationToken)
      .append('Accept-Language', 'En')
    };
   return this.http.post(AppConfig.settings.apiServer.host + 'Category/SubCategories.php', this.getFormUrlEncoded(request), httpOptions);
  }

  deleteSupCategory(request: any) {
    return this.http.post(AppConfig.settings.apiServer.host + 'Category/DeleteSubCategory.php', this.getFormUrlEncoded(request), this.httpOptions);
  }

  addSupCategory(request: any) {
    const httpOptions = {
      headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
        .append('Authorization', AppConfig.settings.apiServer.AuthorizationToken)
        .append('Accept-Language', 'En')
    };
    return this.http.post(AppConfig.settings.apiServer.host + 'Category/AddNewSubCategory.php', this.getFormUrlEncoded(request), httpOptions);
  }

  updateSupCategory(request: any) {
    const httpOptions = {
      headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
        .append('Authorization', AppConfig.settings.apiServer.AuthorizationToken)
        .append('Accept-Language', 'En')
    };
    return this.http.post(AppConfig.settings.apiServer.host + 'Category/EditSubCategory.php', this.getFormUrlEncoded(request), httpOptions);
  }
}
