import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController} from 'ionic-angular';
import { SettingsService } from '../../services/settings-service';

@Component({
  selector: 'page-dutycycle',
  templateUrl: 'dutycycle.html'
})
export class DutycyclePage {
  
  lang = "";
  form = "";
  settings: any = {};
  dutyCycleData: any[] = [];
  initHide = true;
  time = "";
  perfomance = 10;
  day = 10;
  night = 10;
  season = 0;
  seasons: any[] = [];
  isDutyAdding = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public settingService: SettingsService, public alertCtrl: AlertController) {
     
     this.lang = this.navParams.get("lang");
     this.form = this.navParams.get("form");
     
     this.reloadDuty();
    
  }

  reloadDuty(){
    this.initHide = true;
    
    if (this.form === "air")
    {
      this.seasons = [];
      this.seasons.push({"id" : 0, "text": this.lang === "en" ? "Winter" : "Зима"});
      this.seasons.push({"id" : 1, "text": this.lang === "en" ? "Spring" : "Весна"});
      this.seasons.push({"id" : 2, "text": this.lang === "en" ? "Summer" : "Лето"});
      this.seasons.push({"id" : 3, "text": this.lang === "en" ? "Autumn" : "Осень"});
    } 

    this.settingService.getDutyCycleSettingsData(this.lang)
    .then(settings => {
        this.settings = settings;
      })
    .then(()=>{
      this.settingService.getDutyCycleData(this.form).then(data => {
               
        this.dutyCycleData = data;
        this.initHide = false;
       
      })
    });
  }

  deleteRow(id) {
    let titleText = "", questionText = "", okText = "", cancelText = "";
    if (this.lang == "en")
    {
      titleText = "Comfirm"; questionText = "Do you want to delete row?"; okText = "OK"; cancelText = "Cancel";
    }
    else {
      titleText = "Подтверждение"; questionText = "Вы хотите удалить строку?"; okText = "OK"; cancelText = "Отмена";
    }

    let alert = this.alertCtrl.create({
      title: titleText,
      message: questionText,
      buttons: [
        {
          text: okText,
          handler: () => {
            this.settingService.deleteDutyCycleData({'id' : id})
              .then(settings => {
                   this.settingService.updateDutyNum(this.form)
                    .then(()=>{
                        this.reloadDuty();
                    });
                })
          }
        },
        {
          text: cancelText,
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }

  addRow(){
    this.isDutyAdding = !this.isDutyAdding;

    if (this.form == "air") {
      this.time = "25";
      this.season = 0;
    } 
   
  }
  cancelRow(){

    this.isDutyAdding = !this.isDutyAdding;
  }

  saveRow(){

    let titleText = "", subtitleText = "", okText = "";//, cancelText = "";
    if (this.lang == "en")
    {
      titleText = "Error"; subtitleText = "Fill required field \"Time\""; okText = "OK";
    }
    else {
      titleText = "Ошибка"; subtitleText = "Заполните обязательное поле \"Время\""; okText = "OK";
    }

    var tmpTime = 0;
    for(var i = 0; i < this.dutyCycleData.length; i++) {
      tmpTime += parseFloat(this.dutyCycleData[i].time);
    }

    if (this.time != "") 
      tmpTime += parseFloat(this.time.toString());
    
    if (tmpTime > 100)
    {
      if (this.lang == "en")
      {
        titleText = "Error"; subtitleText = "The sum of column \"Time\" should be no more than 100. Current sum is " + tmpTime.toString() + "."; okText = "OK";
      }
      else {
        titleText = "Ошибка"; subtitleText = "Сумма по колонке \"Время\" должно быть не больше 100. Текущая сумма равна " + tmpTime.toString() + "."; okText = "OK";
      }
    }

    if (this.time == "" || tmpTime > 100)
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
      return;
    }

    this.settingService.insertDutyCycleData({'num' : 1, 'time': this.time, 'perfomance': this.perfomance, 'day': this.day, 'night': this.night, 'form': this.form  })
       .then(settings => {
            this.settingService.updateDutyNum(this.form)
            .then(()=>{
                this.reloadDuty();
                this.isDutyAdding = !this.isDutyAdding;
                if (this.form == "air") 
                  this.time = "25"; 
                else 
                  this.time = "";
                this.perfomance = 10;
                this.day = 10;
                this.night = 10;
            });
        })
  }

  close() {
  
   //let data = { 'foo': 'bar' };
   this.viewCtrl.dismiss();

  }

  getSeason(duty){
    return this.seasons[duty.perfomance].text;
  }

/*  getSeasSelected(seas){
    debugger
    return seas.id == 0;
  }*/
}
