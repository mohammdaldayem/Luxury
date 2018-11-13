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
   return this.http.post(AppConfig.settings.apiServer.host + 'Request/Requests_Pagenation.php', this.getFormUrlEncoded(request)
    , this.httpOptions);
  }
  getTodayRequests(request) {
    return this.http.post(AppConfig.settings.apiServer.host + 'Request/RequestsToday_Pagenation.php', this.getFormUrlEncoded(request)
     , this.httpOptions);
   }
  getRequestDetails(request) {
   return this.http.post(AppConfig.settings.apiServer.host + 'Request/RequestDetails.php', this.getFormUrlEncoded(request)
    , this.httpOptions);
  }
  changeRequestStatus(request) {
   return this.http.post(AppConfig.settings.apiServer.host + 'Request/UpdateRequestStatus.php', this.getFormUrlEncoded(request)
    , this.httpOptions);
  }


  deleteRequest(request: any) {
    return this.http.post(
      AppConfig.settings.apiServer.host + 'Request/Delete_Request.php',
      this.getFormUrlEncoded(request),
      this.httpOptions
    );
  }
}
