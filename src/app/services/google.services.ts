import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable()
export class GoogleService {

  
  url = 'https://translation.googleapis.com/language/translate/v2?key=';

  constructor(private _http: HttpClient) {}

  translate(obj: GoogleObj) {
    return this._http.post(this.url + process.env.TRANSLATE_KEY
       ? process.env.TRANSLATE_KEY : environment.apiKey
       , obj);
  }
  download(url) {
    return this._http.get(url, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      },
      observe: 'response',
      responseType: 'text'
      });
  }

}


export class GoogleObj {
  q: string;
  source: string = 'en';
  target: string = 'vi';
  readonly format: string = 'text';

  constructor() {}
}
