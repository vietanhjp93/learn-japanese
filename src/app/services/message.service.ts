import { Injectable } from '@angular/core';
import { News, LocalData } from '../models/newsModel';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  
  constructor(
    private localStorage: LocalStorageService
  ) { }

  public messages: string[] = [];
  public news: News;
  public newsList: News[];
  public newsListSubject: BehaviorSubject<News[]> = new BehaviorSubject<News[]>(this.newsList);
  public newsListSubject$ : Observable<News[]> = this.newsListSubject.asObservable();
  public localData: LocalData;
  public localList: LocalData[] = this.localStorage.getNews();;

  add(message: string){
    this.messages.push(message);
  }

  setNews(news: News) {
    this.news = news;
  }

  setLocalData(value: LocalData) {
    this.localData = value;
  }

  getLocalData(): LocalData {
    return this.localData;
  }

  setLocalList(value: LocalData[]) {
    this.localList = value;
  }

  getLocalList(): LocalData[] {
    return this.localList;
  }

  setNewList(value: News[]) {
    this.newsListSubject.next(value);
  }

  getNewsList(): News[] {
    return this.newsList;
  }


  clear() {
    this.messages = [];
  }

  pop() {
    this.messages.pop();
  }

}
