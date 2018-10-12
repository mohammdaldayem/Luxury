import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { AppConfig } from '../app.config';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(private http: HttpClient, private cookieService: CookieService, private route: Router) {
    super();
  }

  logIn(request) {
    return this.http.post(AppConfig.settings.apiServer.host + 'Admin/Login.php', this.getFormUrlEncoded(request), this.httpOptions);
  }

  isUserLogin() {
    var adminInfo = this.cookieService.get('adminInfo');
    return adminInfo == null ? false : true;
  }

  getUserName() {
    return this.cookieService.get('adminInfo');
  }

  logOut() {
    this.cookieService.removeAll();
    this.route.navigate(['/Auth']);
  }
}
