import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';
import { MessageService } from 'src/app/services/message.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AwsService } from '../../services/aws.service';
import { News } from 'src/app/models/newsModel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private newsService: NewsService,
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private aws: AwsService
    ) { }

    
  newsList: News[] = this.messageService.getNewsList();

  ngOnInit(): void {
  }

  async getNews(res) {
    await this.aws.getNews(res).then((response) => {
      if (response.length === 1 && (response[0] === null)) {
        return
      }
      this.messageService.setNewList(response);
      this.newsList = response;
      this.setStateFlag();
      console.log(this.messageService.newsList)
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
}
