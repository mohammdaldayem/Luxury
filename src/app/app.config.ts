import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from '../environments/environment';
import { IAppConfig } from './models/app-config.model';

@Injectable()
export class AppConfig {

    static settings: IAppConfig;

    constructor(private http: Http) {}

    load() {
        const jsonFile = '../assets/config/config.dev.json';
        // if (environment.production) {
        //     let jsonFile = 'assets/config/config.deploy.json';
        // } else {
        //     lnet jsonFile = 'assets/config/config.dev.json';
        // }
        return new Promise<void>((resolve, reject) => {
            this.http.get(jsonFile).toPromise().then((response: Response) => {
               AppConfig.settings = <IAppConfig>response.json();
               resolve();
            }).catch((response: any) => {
               reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
            });
        });
    }
}
