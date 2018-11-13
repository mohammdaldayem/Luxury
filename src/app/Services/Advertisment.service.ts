import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AppConfig } from '../app.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdvertismentService extends BaseService {

constructor(private http: HttpClient) {
  super();
}
getAllAdvertisments() {
  return this.http.get(AppConfig.settings.apiServer.host + 'Advertisment/Advertisments.php', this.EnArhttpOptions);
 }
 deletAdvertisment(request) {
  // tslint:disable-next-line:max-line-length
  return this.http.post(AppConfig.settings.apiServer.host + 'Advertisment/Delete_Advertisment.php', this.getFormUrlEncoded(request), this.EnArhttpOptions);
 }
 getAdvertismentDetails(request) {
  // tslint:disable-next-line:max-line-length
  return this.http.post(AppConfig.settings.apiServer.host + 'Advertisment/AdvertismentDetails.php', this.getFormUrlEncoded(request), this.EnArhttpOptions);
 }
 addAdvertisment(request) {
  // tslint:disable-next-line:max-line-length
  return this.http.post(AppConfig.settings.apiServer.host + 'Advertisment/Add_Advertisment.php', this.getFormUrlEncoded(request), this.EnArhttpOptions);
 }
 updateAdvertisment(request) {
  // tslint:disable-next-line:max-line-length
  return this.http.post(AppConfig.settings.apiServer.host + 'Advertisment/Edit_Advertisment.php', this.getFormUrlEncoded(request), this.EnArhttpOptions);
 }
}
