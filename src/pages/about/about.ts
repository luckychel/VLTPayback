import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { SettingsService } from '../../services/settings-service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

 settings = {};
 lang = " ";

  constructor(public navCtrl: NavController, 
      public platform: Platform, 
      public alertCtrl: AlertController,
      public settingService: SettingsService) {

  }
  
  ionViewWillEnter() { 
      return this.settingService.getLang()
        .then(lang => {
          this.lang = lang;
        }).then(() => {
          this.settingService.getAll().then(settings => {
            this.settings = settings;
          })
        });
    }
}
