import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SettingPage } from '../setting/setting';
import { AboutPage } from '../about/about';
import { SettingsService } from '../../services/settings-service';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  settings = {};
  
  mainHome = " ";
  mainSetting = " ";
  mainAbout = " ";

  tab1Root: any = HomePage;
  tab2Root: any = SettingPage;
  tab3Root: any = AboutPage;

  constructor(public navCtrl: NavController, public settingService: SettingsService) {
    
      this.settingService.getAll().then(settings => {
          this.settings = settings;
          this.mainHome = settings["mainHome"];
          this.mainSetting = settings["mainSetting"];
          this.mainAbout = settings["mainAbout"];
      })
  }

  ionViewWillEnter() { 

  }
}
