import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, ReplaySubject } from 'rxjs';
import { Http } from './http.service';
import { News } from '../models/newsModel';

@Injectable({
    providedIn: 'root'
})
export class NewsService {
    
    private newsSource = new ReplaySubject<News>(1);
    currentNews = this.newsSource.asObservable();

    constructor(private _http: Http) {}
    courses$: Observable<News[]>;
        public getNewsData(){
            let url = 'https://storage.googleapis.com/download/storage/v1/b/news-list-folder/o/translatedNews.json?alt=media';
            // let url = "https://storage.cloud.google.com/news-list-folder/news.json?authuser=0";
            return this._http.getNewsData(url);
        }

    updateNewsInformation(data:News) {
        this.newsSource.next(data);
    }
}
