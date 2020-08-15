import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MessageService } from "../../services/message.service";
import { BehaviorSubject, combineLatest } from 'rxjs';
import { onsNotification } from "ngx-onsenui";
import { TranslationServiceClient } from "@google-cloud/translate";
import { OAuth2Client } from 'google-auth-library';
import { environment } from 'src/environments/environment';
import { google } from "googleapis";
import { GoogleService, GoogleObj } from '../../services/google.services';



@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  providers: [GoogleService]
})
export class HeroesComponent implements OnInit {



  @ViewChild('video') videoplayer: ElementRef;
  bar = document.getElementById('prog');

  isPause: Boolean = true;
  public videoSource: SourceBuffer;
  currentTextTrack: any = '';
  currentCues: Array<string> = [];
  public currentCue: string = '';
  currentLanguage = 'ja';

  targetTextTrack: any = '';
  targetCues: Array<string> = [];
  targetCue: string = '';
  targetLanguage = 'vi';
 
  notUpdateCue:Boolean = false;
  cueMaxIndex = 0;
  $event = BehaviorSubject;

  public selection = "";
  public target = "en";

  vidProps(event){
    this.$event = event;
    let textTracks = this.videoplayer.nativeElement.textTracks;
    console.log(textTracks);
    for (let index = 0; index < textTracks.length; index++) {
      textTracks[index].mode = 'hidden';
      if (this.currentLanguage === textTracks[index].language) {
        this.currentTextTrack = textTracks[index];
      }
      if (this.targetLanguage === textTracks[index].language) {
        this.targetTextTrack = textTracks[index];
      }
    }

    this.videoplayer.nativeElement.onplaying = () => {
      
    }
    
    this.currentTextTrack.oncuechange = () => {
      if (this.currentTextTrack.activeCues[0] && !this.notUpdateCue) {
        this.isPause = false;
        this.currentCue = this.currentTextTrack.activeCues[0].text;
        this.targetCue = this.targetTextTrack.activeCues[0].text;
        document.getElementById('playpause').innerHTML = '||';
        // document.getElementById('currentCueId').innerHTML = this.currentCue;
        // document.getElementById('targetCueId').innerHTML = this.targetCue;

      } else {
        this.notUpdateCue = false;
      }
    };
  }
  prevCue() {
    let cueIndex = this.currentCues.findIndex(res => res === this.currentCue);
    if (cueIndex === 0){
      this.videoplayer.nativeElement.currentTime = this.targetTextTrack.cues[0].startTime;
    } else {
      this.notUpdateCue = true;
      this.videoplayer.nativeElement.currentTime = this.targetTextTrack.cues[cueIndex - 1].startTime;
    }
  }

  playPause() {
    this.toggleVideo();
  }

  nextCue() {
    let cueIndex = this.currentCues.findIndex(res => res === this.currentCue);
    if (cueIndex < this.cueMaxIndex){
      this.videoplayer.nativeElement.currentTime = this.targetTextTrack.cues[cueIndex + 1].startTime;
    } else {
      this.notUpdateCue = true;
      this.videoplayer.nativeElement.currentTime = this.targetTextTrack.cues[this.cueMaxIndex].startTime;
    }
  }

  toggleVideo() {
    console.log(`## duration ${this.videoplayer.nativeElement.currentTime}`);
    if (this.isPause) {
      this.isPause = false;
      this.videoplayer.nativeElement.play();
      document.getElementById('playpause').innerHTML = '||';
    } else {
      this.isPause = true;
      this.videoplayer.nativeElement.pause();
      document.getElementById('playpause').innerHTML = '▶';
    }
  }

  replay() {
    this.videoplayer.nativeElement.currentTime = 0;
  }
  
  public googleObj: GoogleObj = new GoogleObj();

  constructor(
    private messageService: MessageService,
    private google: GoogleService
  ) {}
  
  ngAfterViewInit() {
    if (!this.currentTextTrack.cues) return;
    setTimeout(() => {
      this.currentCues = [];
      this.targetCues = [];
      this.cueMaxIndex = this.currentTextTrack.cues.length - 1;
      for (let index = 0; index < this.currentTextTrack.cues.length; index++) {
        this.currentCues.push(this.currentTextTrack.cues[index].text);
        this.targetCues.push(this.targetTextTrack.cues[index].text);
      }
      console.log(this.targetCues);
      console.log(`get cues done!`);
    }, 3000);
  }

  ngAfterViewChecked() {
  }

  onClick() {
    
  }
  ngOnInit(): void {
    // this.videoSource = this.google.download('https://storage.googleapis.com/video-test-1/testvideo1.mp4');
    document.addEventListener("selectionchange",event=>{
      this.selection = document.getSelection ? document.getSelection().toString() : null;
      if (!this.selection) return;
      this.target = "en";
      console.log(this.selection);
      // this.translateText();
      this.googleObj.q = this.selection;
      this.googleObj.source = 'ja'
      this.google.translate(this.googleObj).subscribe(
      (res: any) => {
        if (!res) return;
        let result = res.data.translations[0].translatedText;
        onsNotification.toast(result, {timeout: 2000, animation: "fade"});
      },
      err => {
        console.log(err);
      }
    );
      // if (this.selection === "18") {
      //   onsNotification.toast('matched', {timeout: 2000, animation: "fade"});
      // } else {
      //   onsNotification.toast('not match', {timeout: 2000, animation: "fade"});
      // }
    })
    
  }

  currentCueSelected() {
    console.log(`me kiep haha`);
  }
}
