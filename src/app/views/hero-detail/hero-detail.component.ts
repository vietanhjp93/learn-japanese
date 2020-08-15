import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { xml2json } from "xml2json";
import { onsNotification } from "ngx-onsenui";
import { GoogleService, GoogleObj } from '../../services/google.services';
import { MessageService } from '../../services/message.service';
import { SafePipe } from "../../common/main-pipe/safe.pipe";
import { News } from 'src/app/models/newsModel';
import { LocalStorageService } from '../../services/local-storage.service';
import { LocalData } from '../../models/newsModel';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
  providers: [GoogleService]
})
export class HeroDetailComponent implements OnInit, OnDestroy {

  public googleObj: GoogleObj = new GoogleObj();
  news: News = this.messageService.news ? this.messageService.news : this.localStorage.getData();
  startTime;
  endTime;
  private target = '';
  public displayContent;
  public displayTitle = '';
  public translatedContentDisplayFlag = this.localStorage.getTranslatedContentDisplay();
  public furiganaDisplayFlag = this.localStorage.getFuriganaDisplay();

  constructor(
    private router: ActivatedRoute,
    private location: Location,
    private google: GoogleService,
    private messageService: MessageService,
    private localStorage: LocalStorageService
  ) {
  }

  ngOnDestroy(): void {
    this.endTime = Math.round(new Date().getTime() / 1000);
    this.news.timeReading = this.news.timeReading + this.endTime - this.startTime;
    let index = this.messageService.localList.findIndex(res => res.url === this.news.url);
    this.messageService.localList[index].timeReading = this.news.timeReading;
    this.localStorage.setNews(this.messageService.localList);
    document.removeEventListener("selectionchange", this.translateText);
  }

  async ngOnInit() {
    document.addEventListener("selectionchange", this.translateText);
    this.startTime = Math.round(new Date().getTime() / 1000);
  }
  
  likeContentUpdate(){
    this.news.likeState = !this.news.likeState;
    let index = this.messageService.localList.findIndex(res => res.url === this.news.url);
    this.messageService.localList[index].likeState = this.news.likeState;
    this.localStorage.setNews(this.messageService.localList);
  }

  clickOnContent(content) {
    let index = this.news.newContent.findIndex(res => res === content);
    if (index !== -1) {
      onsNotification.toast(this.news.newContentVi[index], {timeout: 2000, animation: "fade", duration: 0.2, delay: 0.4, timing: 'ease-in'});
    }
    console.log(index);
  }

  setDisplaySubtitles() {
    let flag = this.localStorage.getFuriganaDisplay();
    let furigana = document.getElementsByTagName("rt");
    console.log("aaa" + furigana.length);
    for (var i = 0, max = furigana.length; i < max; i++) {
      console.log(furigana[i].style.display);
      furigana[i].style.display = flag ? 'block' : 'none';
      console.log(furigana[i].style.display);
    }
    this.localStorage.setFuriganaDisplay(!flag);
  }

  changeDisplaySubtitles() {
    let flag = this.localStorage.getFuriganaDisplay();
    this.furiganaDisplayFlag = !flag;
  }

  changeDisplayTranslate() {
    // let flag = this.localStorage.getTranslatedContentDisplay();
    // let translateId = document.getElementsByTagName('span');
    // for (var i = 0, max = translateId.length; i < max; i++) {
    //   translateId[i].style.display = flag ? 'none' : 'block';
    // }
    // this.localStorage.setTranslatedContentDisplay(!flag);
    let flag = this.localStorage.getTranslatedContentDisplay();
    this.translatedContentDisplayFlag = !flag;
    this.localStorage.setTranslatedContentDisplay(!flag);
  }

  onClickBack() {
    this.location.back();
  }

  private translateText = () => {
    let selection = document.getSelection ? document.getSelection().toString() : null;
    if (!selection) return;
    this.target = "en";
    console.log(selection);
    // this.translateText();
    this.googleObj.q = selection;
    this.googleObj.source = 'ja'
    this.google.translate(this.googleObj).subscribe(
    (res: any) => {
      if (!res) return;
      let result = res.data.translations[0].translatedText;
      if (!result) return;
      onsNotification.toast(result, {timeout: 2000, animation: "fade"});
    },
    err => {
      console.log(err);
    }
  );
  }
}
