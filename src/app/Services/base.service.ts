import { Injectable } from '@angular/core';
import { HttpHeaders } from '../../../node_modules/@angular/common/http';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  httpOptions: {};
constructor() {
  this.httpOptions = {
    headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
    .append('Authorization', AppConfig.settings.apiServer.AuthorizationToken)
    .append('Accept-Language', 'En')
  };
 }

getFormUrlEncoded(toConvert) {
  const formBody = [];
  // tslint:disable-next-line:forin
  for (const property in toConvert) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(toConvert[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  return formBody.join('&');
}
}
