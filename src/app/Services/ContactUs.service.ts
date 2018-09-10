import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AppConfig } from '../app.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService extends BaseService  {

constructor(private http: HttpClient) {
  super();
}
getAllMessages(request) {
  return this.http.post(AppConfig.settings.apiServer.host + 'ContactUs/All_Messages.php', this.getFormUrlEncoded(request)
 , this.httpOptions);
 }
 deletMessage(request) {
   // tslint:disable-next-line:max-line-length
   return this.http.post(AppConfig.settings.apiServer.host + 'ContactUs/Delete_Message.php', this.getFormUrlEncoded(request), this.httpOptions);
 }

}
