import { Component } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { sideInAnimation, slider } from './common/tools/animations';
import { trigger, transition, style, query, group, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    // trigger('slideInOut', [
    //   transition('* => *, :enter', [
    //     query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
    //     query(':enter', style({ transform: 'translateX(-100vw)' }), { optional: true }),
    //     query(':leave', style({ transform: 'translateX(0vw)' }), { optional: true }),

    //     group([
    //       query(':leave', [
    //         animate('500ms ease-in-out', style({
    //           transform: 'translateX(100vw)'
    //         }))
    //       ], { optional: true }),
    //       query(':enter', [
    //         animate('500ms ease-in-out', style({
    //           transform: 'translateX(0)'
    //         }))
    //       ], { optional: true })
    //     ])
    //   ])
    // ])
    slider
  ]
})
export class AppComponent {
  
  constructor(
    private localStorage: LocalStorageService
  ) {
  }
  triggerAnimation(outlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
}
  async ngOnInit () {
    let flag = this.localStorage.getDataFirstTimeLaunchApp();
    if (!flag) {
      this.localStorage.setFuriganaDisplay(false);
      this.localStorage.setTranslatedContentDisplay(false);
      this.localStorage.setDataFirstTimeLaunchApp(true);
    }
    // Set a same-site cookie for first-party contexts
    document.cookie = 'cookie1=value1; SameSite=Lax';
    // Set a cross-site cookie for third-party contexts
    document.cookie = 'cookie2=value2; SameSite=None; Secure';
  }
  
}
