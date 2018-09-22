import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { AppConfig } from '../app.config';
import { BaseService } from './base.service';

@Injectable()
export class RequestService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }
  getRequests(request) {
    const httpOptions = {
      headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', AppConfig.settings.apiServer.AuthorizationToken)
      .append('Accept-Language', 'En')
    };
   return this.http.post(AppConfig.settings.apiServer.host + 'Request/Requests_Pagenation.php', this.getFormUrlEncoded(request)
    , httpOptions);
  }
  getRequestDetails(request) {
    const httpOptions = {
      headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', AppConfig.settings.apiServer.AuthorizationToken)
      .append('Accept-Language', 'En')
    };
   return this.http.post(AppConfig.settings.apiServer.host + 'Request/RequestDetails.php', this.getFormUrlEncoded(request)
    , httpOptions);
  }
  changeRequestStatus(request) {
    const httpOptions = {
      headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', AppConfig.settings.apiServer.AuthorizationToken)
      .append('Accept-Language', 'En')
    };
   return this.http.post(AppConfig.settings.apiServer.host + 'Request/UpdateRequestStatus.php', this.getFormUrlEncoded(request)
    , httpOptions);
  }


  deleteRequest(request: any) {
    return this.http.post(
      AppConfig.settings.apiServer.host + '',
      this.getFormUrlEncoded(request),
      this.httpOptions
    );
  }
}
