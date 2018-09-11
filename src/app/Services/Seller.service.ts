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
 return this.http.get(AppConfig.settings.apiServer.host + 'Seller/Sellers.php', this.httpOptions);
}
deletSellers(request) {
 return this.http.post(AppConfig.settings.apiServer.host + 'Seller/Delete_Seller.php', this.getFormUrlEncoded(request), this.httpOptions);
}
getSellerDetails(request) {
 return this.http.post(AppConfig.settings.apiServer.host + 'Seller/SellerDetails.php', this.getFormUrlEncoded(request), this.httpOptions);
}
addSellers(request) {
 return this.http.post(AppConfig.settings.apiServer.host + 'Seller/Add_Seller.php', this.getFormUrlEncoded(request), this.httpOptions);
}
updateSellers(request) {
 return this.http.post(AppConfig.settings.apiServer.host + 'Seller/Edit_Seller.php', this.getFormUrlEncoded(request), this.httpOptions);
}
}
