import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";
import { STORAGE_KEY } from "../common/const/localStorageKey";
import { News } from '../models/newsModel';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService
    ) { }

    public setFuriganaDisplay(flag: boolean) {
      this.storage.set(STORAGE_KEY.IS_DISPLAY_FURIGANA, flag);
    }

    public getFuriganaDisplay() : boolean {
      let result = this.storage.get(STORAGE_KEY.IS_DISPLAY_FURIGANA);
      return result === true;
    }

    public setTranslatedContentDisplay(flag: boolean) {
      this.storage.set(STORAGE_KEY.IS_DISPLAY_TRANSLATED_CONTENT, flag);
    }

    public getTranslatedContentDisplay() : boolean {
      let result = this.storage.get(STORAGE_KEY.IS_DISPLAY_TRANSLATED_CONTENT);
      return result === true;
    }

    public async setNews(res) {
      this.storage.set(STORAGE_KEY.NEWS_LOCAL, res);
    }

    public getNews() {
      let result = this.storage.get(STORAGE_KEY.NEWS_LOCAL);
      return result ? result : [];
    }

    public setLastModified(res) {
      this.storage.set(STORAGE_KEY.LastModified, res);
    }

    public getLastModified() {
      return this.storage.get(STORAGE_KEY.LastModified);
    }

    public setDataFirstTimeLaunchApp(res: boolean) {
      this.storage.set(STORAGE_KEY.SETUP_FIRST_TIME, res);
    }

    public getDataFirstTimeLaunchApp() : boolean {
      let result = this.storage.get(STORAGE_KEY.SETUP_FIRST_TIME);
      return result === true;
    }



    public setData(res) {
      this.storage.set("duma", res);
    }

    public getData() {
      return this.storage.get("duma");
    }


}
