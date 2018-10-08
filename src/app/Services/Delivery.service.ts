import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { AppConfig } from '../app.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  Add(request: any): Observable<object> {
    return this.http.post(AppConfig.settings.apiServer.host + 'DeliveryFee/Edit_DeliveryFee.php', this.getFormUrlEncoded(request), this.httpOptions);
  }

  getDeliveryFee() {
    
    return this.http.get(AppConfig.settings.apiServer.host + 'DeliveryFee/DeliveryFee.php', this.httpOptions);
  }
}
