import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { AppConfig } from '../app.config';
import { BaseService } from './base.service';

@Injectable()
export class SellerService extends BaseService {

constructor(private http: HttpClient) {
  super();
}

getSellers() {
<<<<<<< HEAD
  const httpOptions = {
    headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', AppConfig.settings.apiServer.AuthorizationToken)
      .append('Accept-Language', 'En')
  };
  return this.http.get(AppConfig.settings.apiServer.host + 'Seller/Sellers.php', httpOptions);
=======
 return this.http.get(AppConfig.settings.apiServer.host + 'Seller/Sellers.php', this.httpOptions);
>>>>>>> 32af0dd976d0dc3dcb1a0d9f7ab956d61a4c9ecc
}
deletSellers(request) {
  const httpOptions = {
    headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
    .append('Authorization', AppConfig.settings.apiServer.AuthorizationToken)
    .append('Accept-Language', 'En')
  };
 return this.http.post(AppConfig.settings.apiServer.host + 'Seller/Delete_Seller.php', this.getFormUrlEncoded(request), httpOptions);
}
getSellerDetails(request) {
  const httpOptions = {
    headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
    .append('Authorization', AppConfig.settings.apiServer.AuthorizationToken)
    .append('Accept-Language', 'En')
  };
 return this.http.post(AppConfig.settings.apiServer.host + 'Seller/SellerDetails.php', this.getFormUrlEncoded(request), httpOptions);
}
addSellers(request) {
  const httpOptions = {
    headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
    .append('Authorization', AppConfig.settings.apiServer.AuthorizationToken)
    .append('Accept-Language', 'En')
  };
 return this.http.post(AppConfig.settings.apiServer.host + 'Seller/Add_Seller.php', this.getFormUrlEncoded(request), httpOptions);
}
updateSellers(request) {
  const httpOptions = {
    headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
    .append('Authorization', AppConfig.settings.apiServer.AuthorizationToken)
    .append('Accept-Language', 'En')
  };
 return this.http.post(AppConfig.settings.apiServer.host + 'Seller/Edit_Seller.php', this.getFormUrlEncoded(request), httpOptions);
}
}
