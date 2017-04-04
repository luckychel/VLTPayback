import { Component } from '@angular/core';
import { NavController, NavParams, /*PopoverController,*/ ModalController, AlertController } from 'ionic-angular';
import { SettingsService } from '../../services/settings-service';

import { DutycyclePage } from '../dutycycle/dutycycle';

@Component({
  selector: 'page-wwandw',
  templateUrl: 'wwandw.html'
})

export class WwandwPage {

  //data: Array<{title: string, icon: string, showDetails: boolean}> = [];
  settings = {};
  lang = " ";
  form = "www";
  dutyCycleData: any[] = [];

  Motor = {
    Eff: "",
    Pow: "",
    Aver: "",
    icon: "ios-arrow-down-outline",
    showDetails: false
  };
  Operation = {
    PumpEff: "",
    NeedPress: "",
    PressBefore: "",
    NominalFlow: "",
    MaxPress: "",
    MinFlow: "",
    MinPress: "",
    MaxFlow: "",
    icon: "ios-arrow-down-outline",
    showDetails: false
  };
 Commertial = {
    EnergPrice: "",
    CoursePrice: "68",
    icon: "ios-arrow-down-outline",
    showDetails: false
  };

  constructor(public navCtrl: NavController, 
            public navParams: NavParams, 
            public settingService: SettingsService, 
         /*   public popoverCtrl: PopoverController,*/
            public modalCtrl: ModalController,
             public alertCtrl: AlertController
            ) {

  }

/*  ionViewDidLoad() {
    console.log('ionViewDidLoad WwandwPage');
  }
*/

  ionViewWillEnter() { 
      return this.settingService.getLang()
        .then(lang => {
          this.lang = lang;
          return lang;
        }).then((lang) => {
          this.settingService.getWWWData(lang)
          .then(settings => {
            this.settings = settings;
          })
        }).then(()=>{
          this.settingService.getDutyCycleData(this.form).then(data => {
            this.dutyCycleData = data;
          })
        });
    }

  getSettingParamValue(key, param){
    if (this.settings[key] !== undefined)
    {
      return this.settings[key][param];
    }
  }

 toggleDetails(data, propName) {
    if (data.showDetails) {
        data.showDetails = false;
        data.icon = 'ios-arrow-down-outline';
    } else {
        if (propName === "Motor") 
        {
           this.Operation.showDetails = false;
           this.Operation.icon = 'ios-arrow-down-outline';
           this.Commertial.showDetails = false;
           this.Commertial.icon = 'ios-arrow-down-outline';
        }
        if (propName === "Operation") 
        {
           this.Motor.showDetails = false;
           this.Motor.icon = 'ios-arrow-down-outline';
           this.Commertial.showDetails = false;
           this.Commertial.icon = 'ios-arrow-down-outline';
        }
        if (propName === "Commertial") 
        {
           this.Motor.showDetails = false;
           this.Motor.icon = 'ios-arrow-down-outline';
           this.Operation.showDetails = false;
           this.Operation.icon = 'ios-arrow-down-outline';
        }
        data.showDetails = true;
        data.icon = 'ios-arrow-up-outline';
    }
    
  }
  
  showDuty(myEvent){
    /*let profileModal = this.popoverCtrl.create(DutycyclePage, {lang: this.lang})
    profileModal.onDidDismiss(data => {
     console.log(data);
    });

    let ev = {
      target : {
        getBoundingClientRect : () => {
          return {
            top: '70',
            left: '10'
          };
        }
      }
    };
	  profileModal.present({
      ev
    });*/

  let profileModal = this.modalCtrl.create(DutycyclePage, {lang: this.lang, form: this.form});
    profileModal.onDidDismiss(data => {
      this.settingService.getDutyCycleData(this.form).then(data => {
        this.dutyCycleData = data;
      })
    });
    profileModal.present();

  }
  
  check(){
    let resultOk = true;
    let field = "";
    if (this.Motor.Eff == "" || (this.Motor.Eff != "" &&  parseFloat(this.Motor.Eff) == 0)) {
        field = "\"" + this.getSettingParamValue('MotorEff', 'txt') + "\"";
    }
    else if (this.Motor.Pow == "" || (this.Motor.Pow != "" &&  parseFloat(this.Motor.Pow) == 0)) {
        field = "\"" + this.getSettingParamValue('MotorPow', 'txt') + "\"";
    }
    else if (this.Motor.Aver == "" || (this.Motor.Aver != "" &&  parseFloat(this.Motor.Aver) == 0)) {
        field = "\"" + this.getSettingParamValue('MotorAver', 'txt') + "\"";
    }
    else if (this.Commertial.EnergPrice == "" || (this.Commertial.EnergPrice != "" &&  parseFloat(this.Commertial.EnergPrice) == 0)) {
        field = "\"" + this.getSettingParamValue('EnergPrice', 'txt') + "\"";
    }
    else if (this.dutyCycleData.length == 0 || this.dutyCycleData.length > 0) 
    {
      if (this.dutyCycleData.length == 0)
      {
        if (this.lang == "en")
        {
          field = "\"Duty Cycle\". No data in table";
        }
        else
        {
          field = "\"Профиль нагрузки\". Нет данных в таблице";
        }
      }
      else
      {
        let tmpTime = 0;
        for(var i = 0; i < this.dutyCycleData.length; i++)
        {
          tmpTime += parseFloat(this.dutyCycleData[i].time);
        }

        if (tmpTime < 100) 
        {
          if (this.lang == "en")
          {
            field = "\"Duty Cycle\". The sum of the rows for column \"Time\" must be equal to 100";
          }
          else
          {
            field = "\"Профиль нагрузки\". Сумма по полю \"Время\" должна быть равна 100";
          }
        }
      }
    }
    else if (this.Operation.PumpEff == "" || (this.Operation.PumpEff != "" &&  parseFloat(this.Operation.PumpEff) == 0)) {
        field = "\"" + this.getSettingParamValue('PumpEff', 'txt') + "\"";
    }
    else if (this.Operation.NeedPress == "" || (this.Operation.NeedPress != "" &&  parseFloat(this.Operation.NeedPress) == 0)) {
        field = "\"" + this.getSettingParamValue('NeedPress', 'txt') + "\"";
    }
    else if (this.Operation.PressBefore == "" || (this.Operation.PressBefore != "" &&  parseFloat(this.Operation.PressBefore) == 0)) {
        field = "\"" + this.getSettingParamValue('PressBefore', 'txt') + "\"";
    }
    else if (this.Operation.NominalFlow == "" || (this.Operation.NominalFlow != "" &&  parseFloat(this.Operation.NominalFlow) == 0)) {
        field = "\"" + this.getSettingParamValue('NominalFlow', 'txt') + "\"";
    }
    else if (this.Operation.MaxPress == "" || (this.Operation.MaxPress != "" &&  parseFloat(this.Operation.MaxPress) == 0)) {
        field = "\"" + this.getSettingParamValue('MaxPress', 'txt') + "\"";
    }
    else if (this.Operation.MinFlow == "" || (this.Operation.MinFlow != "" &&  parseFloat(this.Operation.MinFlow) == 0)) {
        field = "\"" + this.getSettingParamValue('MinFlow', 'txt') + "\"";
    }
    else if (this.Operation.MinPress == "" || (this.Operation.MinPress != "" &&  parseFloat(this.Operation.MinPress) == 0)) {
        field = "\"" + this.getSettingParamValue('MinPress', 'txt') + "\"";
    }
    else if (this.Operation.MaxFlow == "" || (this.Operation.MaxFlow != "" &&  parseFloat(this.Operation.MaxFlow) == 0)) {
        field = "\"" + this.getSettingParamValue('MaxFlow', 'txt') + "\"";
    }
   
    if (field != "")
    {
      let titleText = "", subtitleText = "", okText = "";

      if (this.lang == "en")
      {
        titleText = "Error"; 
        subtitleText = "Fill required field " + field; 
        okText = "OK";
      }
      else {
        titleText = "Ошибка"; 
        subtitleText = "Заполните обязательное поле " + field;
        okText = "OK";
      }

      let alert = this.alertCtrl.create({
        title: titleText,
        subTitle: subtitleText,
        buttons: [{
          text: okText,
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        }]
      });
      alert.present();
      resultOk = false;
    }
    return resultOk;
  }

  calc()
  {
    let txt = "";
    if (this.check())
    {
      txt = "OK";
    }
    else
    {
      txt = "Cancel";
    }

    let alert = this.alertCtrl.create({
        title: "Расчёт",
        subTitle: txt,
        buttons: [{
          text: "OK",
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
      alert.present();
  }

}
