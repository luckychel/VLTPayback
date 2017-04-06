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

  Motor = {};
  Operation = {};
  Commertial = {};

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
          return Promise.all([this.settingService.getWWWSettingsData(lang)
            .then(settings => {
              this.settings = settings;
            })])
        })
        .then(()=>{
          return Promise.all([this.settingService.getWWWData()
          .then((res)=>{
            for(var i = 0; i < res.length; i++)
            {
              if (res[i].key.startsWith("Motor"))
              {
                this.Motor[res[i].key.replace("Motor.", "")] = res[i].value;
              } else if (res[i].key.startsWith("Operation"))
              {
                this.Operation[res[i].key.replace("Operation.", "")] = res[i].value;
              } else if (res[i].key.startsWith("Commertial"))
              {
                this.Commertial[res[i].key.replace("Commertial.", "")] = res[i].value;
              }
            }
          })]);
        })
        .then(()=>{
          return Promise.all([this.settingService.getDutyCycleData(this.form).then(data => {
            this.dutyCycleData = data;
          })])
        });
    }

  getSettingParamValue(key, param){
    if (this.settings[key] !== undefined)
    {
      return this.settings[key][param];
    }
  }

 toggleDetails(data, propName) {
    if (data.showDetails == "1") {
        
        data.showDetails = "0";
        data.icon = 'ios-arrow-down-outline';
       
    } else {
        if (propName === "Motor") 
        {
          this.Operation["showDetails"] = "0";
          this.Operation["icon"] = 'ios-arrow-down-outline';

          this.Commertial["showDetails"] = "0";
          this.Commertial["icon"] = 'ios-arrow-down-outline';

          this.settingService.updateVLTWWWData({"key":"Operation.showDetails", "value": this.Operation["showDetails"]});
          this.settingService.updateVLTWWWData({"key":"Operation.icon", "value": this.Operation["icon"]});
          this.settingService.updateVLTWWWData({"key":"Commertial.showDetails", "value": this.Commertial["showDetails"]});
          this.settingService.updateVLTWWWData({"key":"Commertial.icon", "value": this.Commertial["icon"]});
           
        }
        if (propName === "Operation") 
        {
           this.Motor["showDetails"] = "0";
           this.Motor["icon"] = 'ios-arrow-down-outline';
           this.Commertial["showDetails"] = "0";
           this.Commertial["icon"] = 'ios-arrow-down-outline';

          this.settingService.updateVLTWWWData({"key":"Motor.showDetails", "value": this.Motor["showDetails"]});
          this.settingService.updateVLTWWWData({"key":"Motor.icon", "value": this.Motor["icon"]});
          this.settingService.updateVLTWWWData({"key":"Commertial.showDetails", "value": this.Commertial["showDetails"]});
          this.settingService.updateVLTWWWData({"key":"Commertial.icon", "value": this.Commertial["icon"]});

        }
        if (propName === "Commertial") 
        {
           this.Motor["showDetails"] = "0";
           this.Motor["icon"] = 'ios-arrow-down-outline';
           this.Operation["showDetails"] = "0";
           this.Operation["icon"] = 'ios-arrow-down-outline';

          this.settingService.updateVLTWWWData({"key":"Motor.showDetails", "value": this.Motor["showDetails"]});
          this.settingService.updateVLTWWWData({"key":"Motor.icon", "value": this.Motor["icon"]});
          this.settingService.updateVLTWWWData({"key":"Operation.showDetails", "value": this.Operation["showDetails"]});
          this.settingService.updateVLTWWWData({"key":"Operation.icon", "value": this.Operation["icon"]});
        }

        data.showDetails = "1";
        data.icon = 'ios-arrow-up-outline';
    }

    this.settingService.updateVLTWWWData({"key":propName + ".showDetails", "value": data.showDetails});
    this.settingService.updateVLTWWWData({"key":propName + ".icon", "value": data.icon});
    
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
  
  check() {
    let resultOk = true;
    let field = "";

    let tmpTime = 0;
    for(var i = 0; i < this.dutyCycleData.length; i++)
    {
      tmpTime += parseFloat(this.dutyCycleData[i].time);
    }

    if (this.Motor["Eff"] == "" || (this.Motor["Eff"] != "" &&  parseFloat(this.Motor["Eff"]) == 0)) {
        field = "\"" + this.getSettingParamValue('MotorEff', 'txt') + "\"";
    }
    else if (this.Motor["Pow"] == "" || (this.Motor["Pow"] != "" &&  parseFloat(this.Motor["Pow"]) == 0)) {
        field = "\"" + this.getSettingParamValue('MotorPow', 'txt') + "\"";
    }
    else if (this.Motor["Aver"] == "" || (this.Motor["Aver"] != "" &&  parseFloat(this.Motor["Aver"]) == 0)) {
        field = "\"" + this.getSettingParamValue('MotorAver', 'txt') + "\"";
    }
    else if (this.dutyCycleData.length == 0) 
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
    else if (this.dutyCycleData.length > 0 && tmpTime < 100)
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
    else if (this.Operation["PumpEff"] == "" || (this.Operation["PumpEff"] != "" &&  parseFloat(this.Operation["PumpEff"]) == 0)) {
        field = "\"" + this.getSettingParamValue('PumpEff', 'txt') + "\"";
    }
    else if (this.Operation["NeedPress"] == "" || (this.Operation["NeedPress"] != "" &&  parseFloat(this.Operation["NeedPress"]) == 0)) {
        field = "\"" + this.getSettingParamValue('NeedPress', 'txt') + "\"";
    }
    else if (this.Operation["PressBefore"] == "" || (this.Operation["PressBefore"] != "" &&  parseFloat(this.Operation["ressBefore"]) == 0)) {
        field = "\"" + this.getSettingParamValue('PressBefore', 'txt') + "\"";
    }
    else if (this.Operation["NominalFlow"] == "" || (this.Operation["NominalFlow"] != "" &&  parseFloat(this.Operation["NominalFlow"]) == 0)) {
        field = "\"" + this.getSettingParamValue('NominalFlow', 'txt') + "\"";
    }
    else if (this.Operation["MaxPress"] == "" || (this.Operation["MaxPress"] != "" &&  parseFloat(this.Operation["MaxPress"]) == 0)) {
        field = "\"" + this.getSettingParamValue('MaxPress', 'txt') + "\"";
    }
    else if (this.Operation["MinFlow"] == "" || (this.Operation["MinFlow"] != "" &&  parseFloat(this.Operation["MinFlow"]) == 0)) {
        field = "\"" + this.getSettingParamValue('MinFlow', 'txt') + "\"";
    }
    else if (this.Operation["MinPress"] == "" || (this.Operation["MinPress"] != "" &&  parseFloat(this.Operation["MinPress"]) == 0)) {
        field = "\"" + this.getSettingParamValue('MinPress', 'txt') + "\"";
    }
    else if (this.Operation["MaxFlow"] == "" || (this.Operation["MaxFlow"] != "" &&  parseFloat(this.Operation["MaxFlow"]) == 0)) {
        field = "\"" + this.getSettingParamValue('MaxFlow', 'txt') + "\"";
    } 
    else if (this.Commertial["EnergPrice"] == "" || (this.Commertial["EnergPrice"] != "" &&  parseFloat(this.Commertial["EnergPrice"]) == 0)) {
        field = "\"" + this.getSettingParamValue('EnergPrice', 'txt') + "\"";
    }

    let titleText = "", subtitleText = "", okText = "";
    if (field != "")
    {
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
      resultOk = false;
    }

    if (!resultOk)
    {
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
    }

      Promise.all([this.settingService.updateVLTWWWData({'key': 'Motor.Eff', 'value': this.Motor["Eff"]}),
                this.settingService.updateVLTWWWData({'key': 'Motor.Pow', 'value': this.Motor["Pow"]}),
                this.settingService.updateVLTWWWData({'key': 'Motor.Aver', 'value': this.Motor["Aver"]}),
                this.settingService.updateVLTWWWData({'key': 'Operation.PumpEff', 'value': this.Operation["PumpEff"]}),
                this.settingService.updateVLTWWWData({'key': 'Operation.NeedPress', 'value': this.Operation["NeedPress"]}),
                this.settingService.updateVLTWWWData({'key': 'Operation.PressBefore', 'value': this.Operation["PressBefore"]}),
                this.settingService.updateVLTWWWData({'key': 'Operation.NominalFlow', 'value': this.Operation["NominalFlow"]}),
                this.settingService.updateVLTWWWData({'key': 'Operation.MaxPress', 'value': this.Operation["MaxPress"]}),
                this.settingService.updateVLTWWWData({'key': 'Operation.MinFlow', 'value': this.Operation["MinFlow"]}),
                this.settingService.updateVLTWWWData({'key': 'Operation.MinPress', 'value': this.Operation["MinPress"]}),
                this.settingService.updateVLTWWWData({'key': 'Operation.MaxFlow', 'value': this.Operation["MaxFlow"]}),
                this.settingService.updateVLTWWWData({'key': 'Commertial.EnergPrice', 'value': this.Commertial["EnergPrice"]})]);
          
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
