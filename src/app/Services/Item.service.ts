import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';
import { BaseService } from './base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ItemService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }
  getAllItems(request: any) {
   return this.http.post(AppConfig.settings.apiServer.host + 'Item/AllItems.php', this.getFormUrlEncoded(request)
  , this.httpOptions);
  }
  deletItem(request) {
    return this.http.post(AppConfig.settings.apiServer.host + 'Item/Delete_Item.php', this.getFormUrlEncoded(request), this.httpOptions);
  }


}
