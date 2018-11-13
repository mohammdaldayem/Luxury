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
 return this.http.get(AppConfig.settings.apiServer.host + 'Seller/Sellers.php', this.EnArhttpOptions);
}
deletSellers(request) {
 return this.http.post(AppConfig.settings.apiServer.host + 'Seller/Delete_Seller.php',
  this.getFormUrlEncoded(request), this.EnArhttpOptions);
}
getSellerDetails(request) {
 return this.http.post(AppConfig.settings.apiServer.host + 'Seller/SellerDetails.php', this.getFormUrlEncoded(request),
  this.EnArhttpOptions);
}
addSellers(request) {
 return this.http.post(AppConfig.settings.apiServer.host + 'Seller/Add_Seller.php', this.getFormUrlEncoded(request), this.EnArhttpOptions);
}
updateSellers(request) {
 return this.http.post(AppConfig.settings.apiServer.host + 'Seller/Edit_Seller.php', this.getFormUrlEncoded(request), this.EnArhttpOptions);
}
}
