import { BrowserModule } from '@angular/platform-browser';
import { NgModule, EventEmitter } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './views/heroes/heroes.component';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from './views/hero-detail/hero-detail.component';
import { MessagesComponent } from './views/messages/messages.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OnsenModule } from "ngx-onsenui";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Http } from './services/http.service';
import { MainPipeModule } from "./common/main-pipe/main-pipe.module";
import { FooterComponent } from './views/footer/footer.component';
import { HeaderComponent } from './views/header/header.component';
import { StorageServiceModule } from "ngx-webstorage-service";

// var pStart = {x: 0, y:0};
// var pStop = {x:0, y:0};

// function swipeStart(e) {
//     if (typeof e['targetTouches'] !== "undefined"){
//         var touch = e.targetTouches[0];
//         pStart.x = touch.screenX;
//         pStart.y = touch.screenY;
//     } else {
//         pStart.x = e.screenX;
//         pStart.y = e.screenY;
//     }
// }

// function swipeEnd(e){
//     if (typeof e['changedTouches'] !== "undefined"){
//         var touch = e.changedTouches[0];
//         pStop.x = touch.screenX;
//         pStop.y = touch.screenY;
//     } else {
//         pStop.x = e.screenX;
//         pStop.y = e.screenY;
//     }

//     swipeCheck();
// }

// function swipeCheck(){
//     var changeY = pStart.y - pStop.y;
//     var changeX = pStart.x - pStop.x;
//     if (isPullDown(changeY, changeX) ) {
//       this.open.emit(null);
//         alert('Swipe Down!');
//     }
// }

// function isPullDown(dY, dX) {
//     // methods of checking slope, length, direction of line created by swipe action 
//     return dY < 0 && (
//         (Math.abs(dX) <= 100 && Math.abs(dY) >= 100)
//         || (Math.abs(dX)/Math.abs(dY) <= 0.3 && dY >= 60)
//     );
// }

// document.addEventListener('touchstart', function(e){ swipeStart(e); }, false);
// document.addEventListener('touchend', function(e){ swipeEnd(e); }, false);

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    OnsenModule,
    MainPipeModule,
    StorageServiceModule
  ],
  providers: [Http],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  bootstrap: [
    AppComponent,
  ],
  exports:[]
})
export class AppModule { }
