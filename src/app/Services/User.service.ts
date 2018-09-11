import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  logIn(request) {
    const httpOptions = {
      headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
        .append('Authorization', AppConfig.settings.apiServer.AuthorizationToken)
        .append('Accept-Language', 'En')
    };
    return this.http.post(AppConfig.settings.apiServer.host + 'Admin/Login.php', this.getFormUrlEncoded(request), httpOptions);
  }
}
