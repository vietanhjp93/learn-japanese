import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
import * as PullToRefresh from 'pulltorefreshjs';
import { News, LocalData } from 'src/app/models/newsModel';
import { LocalStorageService } from '../../services/local-storage.service';
import { AwsService } from '../../services/aws.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  newsList: News[] = this.messageService.getNewsList();
  subscription: Subscription;

  constructor(
    private router: Router,
    private newsService: NewsService,
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private aws: AwsService
  ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async ngOnInit() {
    this.subscription = this.messageService.newsListSubject$.subscribe( (res) => {
      this.newsList = res;
      console.log(this.newsList)

    })
    if (!this.newsList) {
      await this.getNewsFromCloud();
      console.log(this.newsList)
    }
    
    let pull:any = PullToRefresh.init({
      mainElement: '#mainView',
      triggerElement: '#mainView',
      shouldPullToRefresh: function(){
        return !this.mainElement.scrollTop;
      }
    });

  }

  async getNewsFromCloud(source: string = 'hot') {
    console.log(source);
    // USE FOR AWS S3
    await this.aws.getNews(source).then((response) => {
      if (response.length === 1 && (response[0] === null)) {
        return
      }
      this.newsList = response;
      this.messageService.setNewList(response);
      this.setStateFlag();
    });
  }

  setStateFlag() {
    for (let news of this.newsList) {
      news.likeState = false;
      news.readState = false;
      news.timeReading = 0;
    }
    if (!this.messageService.localList || this.messageService.localList[0] === null) {
      return;
    }
    for (let index = 0; index < this.newsList.length; index++) {
      let indexInLocal = this.messageService.localList.findIndex(res => res.url === this.newsList[index].url);
      if (indexInLocal !== -1) {
        this.newsList[index].likeState = this.messageService.localList[indexInLocal].likeState;
        this.newsList[index].readState = this.messageService.localList[indexInLocal].readState;
        this.newsList[index].timeReading = this.messageService.localList[indexInLocal].timeReading;
      }
    }
  }

  tappedNews(news : News) {
    if (news.readState === false) {
      news.readState = true;
      let localData : LocalData = {
        likeState : false,
        readState : true,
        timeReading : 0,
        url : news.url
      }
      this.messageService.localList.push(localData);
      this.localStorage.setNews(this.messageService.localList);
    }
    this.messageService.setNews(news);
    this.localStorage.setData(news);
    this.router.navigate(['/detail']);
  }
}
