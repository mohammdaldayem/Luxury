import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { AppConfig } from '../app.config';
import { BaseService } from './base.service';

@Injectable()
export class DashboardService extends BaseService {

constructor(private http: HttpClient) {
  super();
}

getFoods() {
  return this.http.get('/api/food');
}
getdashboarddata() {
  return  this.http.get(AppConfig.settings.apiServer.host + 'Reports/DashboardData.php', this.httpOptions);
}
getAllAndTodaycontactUsCountReq(request) {
  return forkJoin(
  this.http.post(AppConfig.settings.apiServer.host + 'ContactUs/All_Messages.php', this.getFormUrlEncoded(request)
  , this.httpOptions),
  this.http.post(AppConfig.settings.apiServer.host + 'ContactUs/Today_Messages.php', this.getFormUrlEncoded(request)
  , this.httpOptions)
  );
}
getAllAndTodayRequestsCount(request) {
  return forkJoin(
  this.http.post(AppConfig.settings.apiServer.host + 'Request/Requests_Pagenation.php', this.getFormUrlEncoded(request)
  , this.httpOptions),
  this.http.post(AppConfig.settings.apiServer.host + 'Request/RequestsToday_Pagenation.php', this.getFormUrlEncoded(request)
  , this.httpOptions)
  );
}

}
