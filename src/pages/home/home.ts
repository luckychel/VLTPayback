import { Component } from '@angular/core';
import { NavController, Platform, AlertController,LoadingController } from 'ionic-angular';

import { SettingsService } from '../../services/settings-service';

import { WwandwPage } from '../../pages/wwandw/wwandw';
import { AirPage } from '../../pages/air/air';
import { TechPage } from '../../pages/tech/tech';
import { ForcePage } from '../../pages/force/force';
import { VavPage } from '../../pages/vav/vav';
import { ParkPage } from '../../pages/park/park';
import { ScrewPage } from '../../pages/screw/screw';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  //settings: any[] = [];
  settings = {};
  initHide = true;
  oldValue = "";

  constructor(public navCtrl: NavController, 
      public platform: Platform, 
      public alertCtrl: AlertController,
      public loadingCtrl: LoadingController,
      public settingService: SettingsService) {
   
  }

   ionViewWillEnter() { 
     this.initHide = true;
      /*let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();*/
        return this.settingService.getAll().then(settings => {
          this.settings = settings;
          this.initHide = false;
           //loading.dismiss();
        })
    }

  /*test(){
      this.initHide = !this.initHide;
    }*/

  foo(ev, key, act)
  {
      if (act === 1)
      {
        this.oldValue = this.settings[key];
        this.settings[key] = this.settings[key + "_selected"];
      }
      else
      {
        this.settings[key] = this.oldValue;
      }
  }

    clickItem(v) {

      switch (v)
      {
        case 1: {
         this.navCtrl.push(WwandwPage);
         break;
        }
        case 2: {
        
         this.navCtrl.push(AirPage);
           break;
        }

        case 3: {
         this.navCtrl.push(TechPage);

          break;
        }

        case 4: {
         this.navCtrl.push(ForcePage);
          
          break;
        }

        case 5: {
         this.navCtrl.push(VavPage);
          break;
        }
        
        case 6: {
         this.navCtrl.push(ParkPage);
         break;
        }

        case 7: {
         this.navCtrl.push(ScrewPage);
          
          break;
        }
       
        default: { 
            break; 
        } 
      }

    }
}


