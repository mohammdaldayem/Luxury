import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AppConfig } from '../app.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContainerService extends BaseService {

constructor(private http: HttpClient) {
  super();
}
getAllContainers() {
  return this.http.get(AppConfig.settings.apiServer.host + 'ContainerInfo/Containers.php', this.httpOptions);
 }
}
