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
    
   return this.http.post(AppConfig.settings.apiServer.host + 'Category/SubCategories.php', this.getFormUrlEncoded(request), this.httpOptions);
  }

  deleteSupCategory(request: any) {
    return this.http.post(AppConfig.settings.apiServer.host + 'Category/DeleteSubCategory.php', this.getFormUrlEncoded(request), this.httpOptions);
  }

  addSupCategory(request: any) {
    
    return this.http.post(AppConfig.settings.apiServer.host + 'Category/AddNewSubCategory.php', this.getFormUrlEncoded(request), this.httpOptions);
  }

  updateSupCategory(request: any) {
   
    return this.http.post(AppConfig.settings.apiServer.host + 'Category/EditSubCategory.php', this.getFormUrlEncoded(request), this.httpOptions);
  }
}
