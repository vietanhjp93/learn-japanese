import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { map } from 'rxjs/add/operator/map';
import { catchError } from 'rxjs/operators';
import { News } from '../models/newsModel';

@Injectable()
export class Http {
  constructor(private _http: HttpClient) {}

  post(url: string, obj: GoogleObj) {
    return this._http.post(url, obj)
    .subscribe((res) => {
      return res;
    }, err => {
      throw err;
    });
  }
  getNewsData(url: string) : Observable<News[]> {
    let params = new HttpParams();
    params = params.append('ifGenerationNotMatch', '0');
    params = params.append('alt', 'json');
    params = params.append('projection', 'full');
    
   return this._http.get<News[]>(url, {params});
  }
  // , {
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Methods': 'GET',
  //     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  //   },
  //   observe: 'response',
  //   responseType: 'json'
  //   }
}


export class GoogleObj {
  q: string;
  source: string = 'en';
  target: string = 'vi';
  readonly format: string = 'text';

  constructor() {}
}
