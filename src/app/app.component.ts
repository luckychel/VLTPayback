import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { SettingsService } from '../services/settings-service';

declare var cordova: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = null;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, settingsService: SettingsService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      if (cordova.platformId == 'android') {
          statusBar.backgroundColorByHexString("#9c0303");
      } else {
          statusBar.backgroundColorByName("red");
      }

      settingsService.openDatabase()
        .then(()=>{
          this.rootPage = TabsPage;
        })
        .then(() => {
          splashScreen.hide();
        })

      
    });
  }
}
