import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class TermsService extends BaseService  {

constructor(private http: HttpClient) {
  super();
}
getTerms() {
  return this.http.get(AppConfig.settings.apiServer.host + 'Terms_Conditions/Terms_Conditions.php', this.httpOptions);
 }
 UpdateTerms(request) {
  // tslint:disable-next-line:max-line-length
  return this.http.post(AppConfig.settings.apiServer.host + 'Terms_Conditions/Edit_Terms_Conditions.php', this.getFormUrlEncoded(request), this.httpOptions);
 }
}
