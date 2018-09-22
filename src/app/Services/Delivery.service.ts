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
    const httpOptions = {
      headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
        .append('Authorization', AppConfig.settings.apiServer.AuthorizationToken)
        .append('Accept-Language', 'En')
    };
    return this.http.post(AppConfig.settings.apiServer.host + 'DeliveryFee/Edit_DeliveryFee.php', this.getFormUrlEncoded(request), httpOptions);
  }

  getDeliveryFee() {
    const httpOptions = {
      headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
        .append('Authorization', AppConfig.settings.apiServer.AuthorizationToken)
        .append('Accept-Language', 'En')
    };
    return this.http.get(AppConfig.settings.apiServer.host + 'DeliveryFee/DeliveryFee.php', httpOptions);
  }
}
