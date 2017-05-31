import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Report } from '../models/report';

@Injectable()
export class ReportService {

  private REPORT_URL = 'https://red-wdp-api.herokuapp.com/api/mars/encounters';

  constructor(private http: Http) { }

  postData (encounter: Report) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });
    return this.http.post(this.REPORT_URL, { encounter }, options).map(this.extractData);
  }

  extractData (response: Response) {
    const report = response.json();
    return report;
  }
}
