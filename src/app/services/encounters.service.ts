import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Encounter } from '../models/encounter';

@Injectable()
export class EncountersService {

  private ENCOUNTERS_URL = 'https://red-wdp-api.herokuapp.com/api/mars/encounters';

  constructor(private http: Http) { }

  extractEncounters (response: Response) {
    const encounters = response.json();
    return encounters;

  }

  getData() {
    return this.http.get(this.ENCOUNTERS_URL)
              .map(this.extractEncounters);
  }

}
