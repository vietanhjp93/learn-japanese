import { Component } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(
    private localStorage: LocalStorageService
  ) {
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
