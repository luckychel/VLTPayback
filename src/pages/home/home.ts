import { Component } from '@angular/core';
import { NavController, Platform, AlertController,LoadingController } from 'ionic-angular';

import { SettingsService } from '../../services/settings-service';

import { CalculatePage } from '../../pages/calculate/calculate';



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
  
  ngAfterViewInit(){
  
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
         this.navCtrl.push(CalculatePage, {form: "www"});
         break;
        }
        case 2: {
        
         this.navCtrl.push(CalculatePage, {form: "air"});
           break;
        }

        case 3: {
          this.navCtrl.push(CalculatePage, {form: "tech"});

          break;
        }

        case 4: {
         this.navCtrl.push(CalculatePage, {form: "force"});
          
          break;
        }

        case 5: {
         this.navCtrl.push(CalculatePage, {form: "vav"});
          break;
        }
        
        case 6: {
         this.navCtrl.push(CalculatePage, {form: "park"});
         break;
        }

        case 7: {
         this.navCtrl.push(CalculatePage, {form: "screw"});
          
          break;
        }
       
        default: { 
            break; 
        } 
      }

    }
}


