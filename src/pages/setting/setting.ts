import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { SettingsService } from '../../services/settings-service';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'  
})
export class SettingPage {
  
  lang = "";
  settings: any = {};
  constantData: any[] = [];

 constructor(public navCtrl: NavController, 
      public platform: Platform, 
      public alertCtrl: AlertController,
      public settingService: SettingsService) {

      this.settingService.getLang()
        .then(lang => {
          this.lang = lang;
        })
        .then(() => {
          this.settingService.getAll().then(settings => {
            this.settings = settings;
          })
        })
      .then(()=>{
        this.settingService.getConstantData().then(data => {
          this.constantData = data;
        })
      });
  }

  langChange(){
      let tabs = this.navCtrl.parent;
      this.settingService.update({'key': 'lang', 'value': this.lang}).then(()=> { 
         return  this.settingService.getAll().then(settings => {
          this.settings = settings;
          tabs._tabs[0].tabTitle = settings["mainHome"];
          tabs._tabs[1].tabTitle = settings["mainSetting"];
          tabs._tabs[2].tabTitle = settings["mainAbout"];
        })
      }).then(()=>{
        this.settingService.getConstantData().then(data => {
          this.constantData = data;
        })
      })

  }
  
  notifyChange(){
  }
}
