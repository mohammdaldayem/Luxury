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

 getFormUrlEncodedwithfile(toConvert) {
   const formData: FormData = new FormData();
   // tslint:disable-next-line:forin
   for (const property in toConvert) {
    let encodedValue = null;
     const encodedKey = property;
     if (toConvert[property] instanceof File) {
       encodedValue = toConvert[property];
     } else {
       encodedValue = toConvert[property];
     }
     formData.append(encodedKey, encodedValue);
   }
   return formData;
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
