import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Job } from '../models/job';

@Injectable()
export class JobsService {

  private JOBS_URL = 'https://red-wdp-api.herokuapp.com/api/mars/jobs';

  constructor(private http: Http) { }

  getData () {
    return this.http.get(this.JOBS_URL).map(this.extractJobs);
  }

  extractJobs (response: Response) {
    const jobs = response.json();
    return jobs;
  }

}
