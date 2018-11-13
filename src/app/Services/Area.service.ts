import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class AreaService extends BaseService {

constructor(private http: HttpClient) {
  super();
}
getAreas() {
 return this.http.get(AppConfig.settings.apiServer.host + 'Area/Areas.php', this.EnArhttpOptions);
}
deletAreas(request) {
 return this.http.post(AppConfig.settings.apiServer.host + 'Area/Delete_Area.php', this.getFormUrlEncoded(request), this.EnArhttpOptions);
}
getAreaDetails(request) {
 return this.http.post(AppConfig.settings.apiServer.host + 'Area/AreaDetails.php', this.getFormUrlEncoded(request), this.EnArhttpOptions);
}
addAreas(request) {
 return this.http.post(AppConfig.settings.apiServer.host + 'Area/Add_Area.php', this.getFormUrlEncoded(request), this.EnArhttpOptions);
}
updateAreas(request) {
 return this.http.post(AppConfig.settings.apiServer.host + 'Area/Edit_Area.php', this.getFormUrlEncoded(request), this.EnArhttpOptions);
}
}
