import { Component } from '@angular/core';
import { NavController, NavParams, /*PopoverController,*/ ModalController, AlertController } from 'ionic-angular';
import { SettingsService } from '../../services/settings-service';

import { DutycyclePage } from '../dutycycle/dutycycle';
import { ResultPage } from '../result/result';


@Component({
  selector: 'page-calculate',
  templateUrl: 'calculate.html'
})

export class CalculatePage {

  //data: Array<{title: string, icon: string, showDetails: boolean}> = [];
  settings: {} = {};
  lang: string = " ";
  form: string = "";

  constantData: any[] = [];
  dutyCycleData: any[] = [];

  Motor: {} = {};
  Operation: {} = {};
  Commertial: {} = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public settingService: SettingsService,
         /*   public popoverCtrl: PopoverController,*/ public modalCtrl: ModalController, public alertCtrl: AlertController) {
    this.form = navParams.get("form");

    /*           let dt = new Date();
               console.log('form constructor ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds() + '.' + dt.getMilliseconds());
               console.log('form: ' +  this.form)*/
  }

  /*  ionViewDidLoad() {
      let dt = new Date();
      console.log('ionViewDidLoad ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds() + '.' + dt.getMilliseconds());
      console.log('form: ' +  this.form)
    }
  
   ionViewWillEnter() {
      let dt = new Date();
      console.log('ionViewWillEnter ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds() + '.' + dt.getMilliseconds());
      console.log('form: ' +  this.form)
    }
  */

  ionViewDidEnter() {
    /* let dt = new Date();
    console.log('ionViewDidEnter ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds() + '.' + dt.getMilliseconds());
    console.log('form: ' +  this.form)*/

    return this.settingService.getLang()
      .then(lang => {
        this.lang = lang;
        return lang;
      }).then((lang) => {
        return Promise.all([
          this.settingService.getCalculateSettingsData(lang, this.form)
            .then(settings => {
              this.settings = settings;
            })
        ])
      })
      .then(() => {
        return Promise.all([
          this.settingService.getCalculateData(this.form)
            .then((res) => {
              for (var i = 0; i < res.length; i++) {
                if (res[i].key.startsWith("Motor")) {
                  this.Motor[res[i].key.replace("Motor.", "")] = res[i].value;
                }
                else if (res[i].key.startsWith("Operation")) {
                  this.Operation[res[i].key.replace("Operation.", "")] = res[i].value;
                }
                else if (res[i].key.startsWith("Commertial")) {
                  this.Commertial[res[i].key.replace("Commertial.", "")] = res[i].value;
                }
              }
            })
        ]);
      })
      .then(() => {
        return Promise.all([this.settingService.getDutyCycleData(this.form).then(data => {
          this.dutyCycleData = data;
        })])
      })
      .then(() => {
        return Promise.all([this.settingService.getConstantData().then(data => {
          this.constantData = data;
        })])
      });
  }

  getSettingParamValue(key, param) {
    if (this.settings[key] !== undefined) {
      return this.settings[key][param];
    }
  }

  getConstantParamValue(key, param) {
    for (var i = 0; i < this.constantData.length; i++) {
      if (this.constantData[i][0] == key) {
        return this.constantData[i][2];
      }
    }
  }

  toggleDetails(data, propName) {

    if (data.showDetails == "1") {

      data.showDetails = "0";
      data.icon = 'ios-arrow-down-outline';

    } else {
      if (propName === "Motor") {
        this.Operation["showDetails"] = "0";
        this.Operation["icon"] = 'ios-arrow-down-outline';

        this.Commertial["showDetails"] = "0";
        this.Commertial["icon"] = 'ios-arrow-down-outline';

        this.settingService.updateCalculateData({ "key": "Operation.showDetails", "value": this.Operation["showDetails"], "form": this.form });
        this.settingService.updateCalculateData({ "key": "Operation.icon", "value": this.Operation["icon"], "form": this.form });
        this.settingService.updateCalculateData({ "key": "Commertial.showDetails", "value": this.Commertial["showDetails"], "form": this.form });
        this.settingService.updateCalculateData({ "key": "Commertial.icon", "value": this.Commertial["icon"], "form": this.form });

      }
      if (propName === "Operation") {
        this.Motor["showDetails"] = "0";
        this.Motor["icon"] = 'ios-arrow-down-outline';
        this.Commertial["showDetails"] = "0";
        this.Commertial["icon"] = 'ios-arrow-down-outline';

        this.settingService.updateCalculateData({ "key": "Motor.showDetails", "value": this.Motor["showDetails"], "form": this.form });
        this.settingService.updateCalculateData({ "key": "Motor.icon", "value": this.Motor["icon"], "form": this.form });
        this.settingService.updateCalculateData({ "key": "Commertial.showDetails", "value": this.Commertial["showDetails"], "form": this.form });
        this.settingService.updateCalculateData({ "key": "Commertial.icon", "value": this.Commertial["icon"], "form": this.form });

      }
      if (propName === "Commertial") {
        this.Motor["showDetails"] = "0";
        this.Motor["icon"] = 'ios-arrow-down-outline';
        this.Operation["showDetails"] = "0";
        this.Operation["icon"] = 'ios-arrow-down-outline';

        this.settingService.updateCalculateData({ "key": "Motor.showDetails", "value": this.Motor["showDetails"], "form": this.form });
        this.settingService.updateCalculateData({ "key": "Motor.icon", "value": this.Motor["icon"], "form": this.form });
        this.settingService.updateCalculateData({ "key": "Operation.showDetails", "value": this.Operation["showDetails"], "form": this.form });
        this.settingService.updateCalculateData({ "key": "Operation.icon", "value": this.Operation["icon"], "form": this.form });
      }

      data.showDetails = "1";
      data.icon = 'ios-arrow-up-outline';
    }

    this.settingService.updateCalculateData({ "key": propName + ".showDetails", "value": data.showDetails, "form": this.form });
    this.settingService.updateCalculateData({ "key": propName + ".icon", "value": data.icon, "form": this.form });

  }

  showDuty(myEvent) {
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

    let profileModal = this.modalCtrl.create(DutycyclePage, { lang: this.lang, form: this.form, formName: this.getSettingParamValue('titleCalculate', 'txt') });
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
    for (var i = 0; i < this.dutyCycleData.length; i++) {
      tmpTime += parseFloat(this.dutyCycleData[i].time);
    }

    //********************Двигатель/Характеристики********************
    if (this.Motor["Eff"] == "" || (this.Motor["Eff"] != "" && parseFloat(this.Motor["Eff"]) == 0)) {
      field = "\"" + this.getSettingParamValue('MotorEff', 'txt') + "\"";
    }
    else if (this.Motor["Pow"] == "" || (this.Motor["Pow"] != "" && parseFloat(this.Motor["Pow"]) == 0)) {
      field = "\"" + this.getSettingParamValue('MotorPow', 'txt') + "\"";
    }
    else if (this.Motor["Aver"] == "" || (this.Motor["Aver"] != "" && parseFloat(this.Motor["Aver"]) == 0)) {
      field = "\"" + this.getSettingParamValue('MotorAver', 'txt') + "\"";
    }
    else if (this.dutyCycleData.length == 0) {
      if (this.lang == "en") {
        field = "\"Duty Cycle\". No data in table";
      }
      else {
        field = "\"Профиль нагрузки\". Нет данных в таблице";
      }
    }
    else if (this.dutyCycleData.length > 0 && tmpTime < 100) {
      if (this.lang == "en") {
        field = "\"Duty Cycle\". The sum of the rows for column \"Time\" must be equal to 100";
      }
      else {
        field = "\"Профиль нагрузки\". Сумма по полю \"Время\" должна быть равна 100";
      }
    }

    //********************Оперативные данные**************************
    //www, tech
    else if ((this.form == "www" || this.form == "tech") && this.Operation["PumpEff"] == "" || (this.Operation["PumpEff"] != "" && parseFloat(this.Operation["PumpEff"]) == 0)) {
      field = "\"" + this.getSettingParamValue('PumpEff', 'txt') + "\"";
    }
    else if ((this.form == "www" || this.form == "tech") && this.Operation["NeedPress"] == "" || (this.Operation["NeedPress"] != "" && parseFloat(this.Operation["NeedPress"]) == 0)) {
      field = "\"" + this.getSettingParamValue('NeedPress', 'txt') + "\"";
    }
    else if ((this.form == "www" || this.form == "tech") && this.Operation["PressBefore"] == "" || (this.Operation["PressBefore"] != "" && parseFloat(this.Operation["PressBefore"]) == 0)) {
      field = "\"" + this.getSettingParamValue('PressBefore', 'txt') + "\"";
    }
    else if ((this.form == "www" || this.form == "tech") && this.Operation["NominalFlow"] == "" || (this.Operation["NominalFlow"] != "" && parseFloat(this.Operation["NominalFlow"]) == 0)) {
      field = "\"" + this.getSettingParamValue('NominalFlow', 'txt') + "\"";
    }
    else if ((this.form == "www" || this.form == "tech") && this.Operation["MaxPress"] == "" || (this.Operation["MaxPress"] != "" && parseFloat(this.Operation["MaxPress"]) == 0)) {
      field = "\"" + this.getSettingParamValue('MaxPress', 'txt') + "\"";
    }
    else if ((this.form == "www" || this.form == "tech") && this.Operation["MinFlow"] == "" || (this.Operation["MinFlow"] != "" && parseFloat(this.Operation["MinFlow"]) == 0)) {
      field = "\"" + this.getSettingParamValue('MinFlow', 'txt') + "\"";
    }
    else if ((this.form == "www" || this.form == "tech") && this.Operation["MinPress"] == "" || (this.Operation["MinPress"] != "" && parseFloat(this.Operation["MinPress"]) == 0)) {
      field = "\"" + this.getSettingParamValue('MinPress', 'txt') + "\"";
    }
    else if ((this.form == "www" || this.form == "tech") && this.Operation["MaxFlow"] == "" || (this.Operation["MaxFlow"] != "" && parseFloat(this.Operation["MaxFlow"]) == 0)) {
      field = "\"" + this.getSettingParamValue('MaxFlow', 'txt') + "\"";
    }
    //air
    else if (this.form == "air" && this.Operation["NumOfMotors"] == "" || (this.Operation["NumOfMotors"] != "" && parseFloat(this.Operation["NumOfMotors"]) == 0)) {
      field = "\"" + this.getSettingParamValue('NumOfMotors', 'txt') + "\"";
    }
    else if (this.form == "air" && this.Operation["NumOfMotorsWinterDay"] == "" || (this.Operation["NumOfMotorsWinterDay"] != "" && parseFloat(this.Operation["NumOfMotorsWinterDay"]) == 0)) {
      field = "\"" + this.getSettingParamValue('NumOfMotorsWinterDay', 'txt') + "\"";
    }
    else if (this.form == "air" && this.Operation["NumOfMotorsWinterNight"] == "" || (this.Operation["NumOfMotorsWinterNight"] != "" && parseFloat(this.Operation["NumOfMotorsWinterNight"]) == 0)) {
      field = "\"" + this.getSettingParamValue('NumOfMotorsWinterNight', 'txt') + "\"";
    }
    else if (this.form == "air" && this.Operation["NumOfMotorsSummerDay"] == "" || (this.Operation["NumOfMotorsSummerDay"] != "" && parseFloat(this.Operation["NumOfMotorsSummerDay"]) == 0)) {
      field = "\"" + this.getSettingParamValue('NumOfMotorsSummerDay', 'txt') + "\"";
    }
    else if (this.form == "air" && this.Operation["NumOfMotorsSummerNight"] == "" || (this.Operation["NumOfMotorsSummerNight"] != "" && parseFloat(this.Operation["NumOfMotorsSummerNight"]) == 0)) {
      field = "\"" + this.getSettingParamValue('NumOfMotorsSummerNight', 'txt') + "\"";
    }
    else if (this.form == "air" && this.Operation["NumOfMotorsSpringAutumnDay"] == "" || (this.Operation["NumOfMotorsSpringAutumnDay"] != "" && parseFloat(this.Operation["NumOfMotorsSpringAutumnDay"]) == 0)) {
      field = "\"" + this.getSettingParamValue('NumOfMotorsSpringAutumnDay', 'txt') + "\"";
    }
    else if (this.form == "air" && this.Operation["NumOfMotorsSpringAutumnNight"] == "" || (this.Operation["NumOfMotorsSpringAutumnNight"] != "" && parseFloat(this.Operation["NumOfMotorsSpringAutumnNight"]) == 0)) {
      field = "\"" + this.getSettingParamValue('NumOfMotorsSpringAutumnNight', 'txt') + "\"";
    }
    //tech
    else if (this.form == "tech" && this.Operation["DensinyPump"] == "" || (this.Operation["DensinyPump"] != "" && parseFloat(this.Operation["DensinyPump"]) == 0)) {
      field = "\"" + this.getSettingParamValue('DensinyPump', 'txt') + "\"";
    }

    //*********************Коммерческие данные***********************
    else if (this.Commertial["EnergPrice"] == "" || (this.Commertial["EnergPrice"] != "" && parseFloat(this.Commertial["EnergPrice"]) == 0)) {
      field = "\"" + this.getSettingParamValue('EnergPrice', 'txt') + "\"";
    }
    else if (this.lang === "ru" && (this.Commertial["CoursePrice"] == "" || (this.Commertial["CoursePrice"] != "" && parseFloat(this.Commertial["CoursePrice"]) == 0))) {
      field = "\"" + this.getSettingParamValue('CoursePrice', 'txt') + "\"";
    }
    else if (this.lang === "ru" && (this.Commertial["Discount"] == "" || (this.Commertial["Discount"] != "" && parseFloat(this.Commertial["Discount"]) == 0))) {
      field = "\"" + this.getSettingParamValue('Discount', 'txt') + "\"";
    }
    /*else if (this.Commertial["AccessEquipPrice"] == "" || (this.Commertial["AccessEquipPrice"] != "" &&  parseFloat(this.Commertial["AccessEquipPrice"]) == 0)) {
        field = "\"" + this.getSettingParamValue('AccessEquipPrice', 'txt') + "\"";
    }
    else if (this.Commertial["InstallPrice"] == "" || (this.Commertial["InstallPrice"] != "" &&  parseFloat(this.Commertial["InstallPrice"]) == 0)) {
        field = "\"" + this.getSettingParamValue('InstallPrice', 'txt') + "\"";
    }*/

    let titleText = "", subtitleText = "", okText = "";
    if (field != "") {
      if (this.lang == "en") {
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

    if (!resultOk) {
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

    Promise.all([this.settingService.updateCalculateData({ 'key': 'Motor.Eff', 'value': this.Motor["Eff"], form: this.form }),
    this.settingService.updateCalculateData({ 'key': 'Motor.Pow', 'value': this.Motor["Pow"], form: this.form }),
    this.settingService.updateCalculateData({ 'key': 'Motor.Aver', 'value': this.Motor["Aver"], form: this.form }),

    //www, tech
    this.form == "www" || this.form == "tech" ? this.settingService.updateCalculateData({ 'key': 'Operation.PumpEff', 'value': this.Operation["PumpEff"], form: this.form }) : [],
    this.form == "www" || this.form == "tech" ? this.settingService.updateCalculateData({ 'key': 'Operation.NeedPress', 'value': this.Operation["NeedPress"], form: this.form }) : [],
    this.form == "www" || this.form == "tech" ? this.settingService.updateCalculateData({ 'key': 'Operation.PressBefore', 'value': this.Operation["PressBefore"], form: this.form }) : [],
    this.form == "www" || this.form == "tech" ? this.settingService.updateCalculateData({ 'key': 'Operation.NominalFlow', 'value': this.Operation["NominalFlow"], form: this.form }) : [],
    this.form == "www" || this.form == "tech" ? this.settingService.updateCalculateData({ 'key': 'Operation.MaxPress', 'value': this.Operation["MaxPress"], form: this.form }) : [],
    this.form == "www" || this.form == "tech" ? this.settingService.updateCalculateData({ 'key': 'Operation.MinFlow', 'value': this.Operation["MinFlow"], form: this.form }) : [],
    this.form == "www" || this.form == "tech" ? this.settingService.updateCalculateData({ 'key': 'Operation.MinPress', 'value': this.Operation["MinPress"], form: this.form }) : [],
    this.form == "www" || this.form == "tech" ? this.settingService.updateCalculateData({ 'key': 'Operation.MaxFlow', 'value': this.Operation["MaxFlow"], form: this.form }) : [],

    //air
    this.form == "air" ? this.settingService.updateCalculateData({ 'key': 'Operation.NumOfMotors', 'value': this.Operation["NumOfMotors"], form: this.form }) : [],
    this.form == "air" ? this.settingService.updateCalculateData({ 'key': 'Operation.NumOfMotorsWinterDay', 'value': this.Operation["NumOfMotorsWinterDay"], form: this.form }) : [],
    this.form == "air" ? this.settingService.updateCalculateData({ 'key': 'Operation.NumOfMotorsWinterNight', 'value': this.Operation["NumOfMotorsWinterNight"], form: this.form }) : [],
    this.form == "air" ? this.settingService.updateCalculateData({ 'key': 'Operation.NumOfMotorsSummerDay', 'value': this.Operation["NumOfMotorsSummerDay"], form: this.form }) : [],
    this.form == "air" ? this.settingService.updateCalculateData({ 'key': 'Operation.NumOfMotorsSummerNight', 'value': this.Operation["NumOfMotorsSummerNight"], form: this.form }) : [],
    this.form == "air" ? this.settingService.updateCalculateData({ 'key': 'Operation.NumOfMotorsSpringAutumnDay', 'value': this.Operation["NumOfMotorsSpringAutumnDay"], form: this.form }) : [],
    this.form == "air" ? this.settingService.updateCalculateData({ 'key': 'Operation.NumOfMotorsSpringAutumnNight', 'value': this.Operation["NumOfMotorsSpringAutumnNight"], form: this.form }) : [],

    //tech
    this.form == "tech" ? this.settingService.updateCalculateData({ 'key': 'Operation.DensinyPump', 'value': this.Operation["DensinyPump"], form: this.form }) : [],

    this.settingService.updateCalculateData({ 'key': 'Commertial.EnergPrice', 'value': this.Commertial["EnergPrice"], form: "" }),
    this.settingService.updateCalculateData({ 'key': 'Commertial.CoursePrice', 'value': this.Commertial["CoursePrice"], form: "" }),
    this.settingService.updateCalculateData({ 'key': 'Commertial.Discount', 'value': this.Commertial["Discount"], form: "" })
              /*this.settingService.updateCalculateData({'key': 'Commertial.AccessEquipPrice', 'value': this.Commertial["AccessEquipPrice"], form: this.form}),
                this.settingService.updateCalculateData({'key': 'Commertial.InstallPrice', 'value': this.Commertial["InstallPrice"], form: this.form})*/ ]);

    return resultOk;
  }

  calc() {
    let txt = "", isErr = false;
    if (this.check()) {
      try {
        //данные из датской VLTPayback iOs7
        //let Cpch = [549.299, 566.5, 607.6, 663.6084, 760.8404, 917.627, 1020.936, 1087.783, 1254.293, 1405.002, 1795.146, 2050.38, 2577.863, 3017.838, 3541.676, 4335.332, 5302.79, 6352.896, 7215.83, 8488.354, 9780.324, 11750.49, 14459.61, 17177.25, 21769.03, 25638.76, 30251.1, 34214.54, 42917.01, 54914.45, 61645.5, 70148.15, 81485.36, 92999.73, 115634.0];
        //let CpchPower = [0.37, 0.55, 0.75, 1.1, 1.5, 2.2, 3, 4, 5.5, 7.5, 11, 15, 18, 22, 30, 37, 45, 55, 75, 90, 110, 132, 160, 200, 250, 315, 355, 400, 450, 500, 560, 630, 710, 800, 1000];

        let CpchPower = [1.1, 1.5, 2.2, 3, 4, 5.5, 7.5, 11, 15, 18, 22, 30, 37, 45, 55, 75, 90, 110, 132, 160, 200, 250];
        let Cpch = [519, 608, 754, 849, 912, 1065, 1204, 1566, 1802, 2291, 2699, 3153, 3881, 4768, 5832.74, 6521.86, 7688.88, 8006.3, 9667.74, 11802.36, 14091, 18062];

        let screwData = [
            {perf: 10, value: {kstand: 0.5, kspch :0.27}},
            {perf: 20, value: {kstand: 0.55, kspch :0.32}},
            {perf: 30, value: {kstand: 0.6, kspch :0.4}},
            {perf: 40, value: {kstand: 0.65, kspch :0.47}},
            {perf: 50, value: {kstand: 0.73, kspch :0.55}},
            {perf: 60, value: {kstand: 0.8, kspch :0.62}},
            {perf: 70, value: {kstand: 0.85, kspch :0.72}},
            {perf: 80, value: {kstand: 0.92, kspch :0.82}},
            {perf: 90, value: {kstand: 0.97, kspch :0.92}},
            {perf: 100, value: {kstand: 1, kspch :1.02}},
        ];
debugger
        //********************Константы//*********************************
        let kpdPCH = 0.0, nalog = 0.0,/*, discount = 0.0*/ stoim = 0.0, lifetime = 0.0;
        kpdPCH = parseFloat(this.getConstantParamValue("kpd", "value")); //КПД частотного преобразователя
        nalog = parseFloat(this.getConstantParamValue("tax", "value")) / 100.0; //Налог на прибыль
        //discount = parseFloat(this.getConstantParamValue("discount", "value")) / 100.0;
        stoim = parseFloat(this.getConstantParamValue("electricity", "value")) / 100.0; //Темпы роста цена на электроэнергию
        lifetime = parseFloat(this.getConstantParamValue("lifetime", "value")); //Срок службы преобразователя, лет

        //********************Двигатель/Характеристики********************
        let kpdDvig = 0.0, moshDvig = 0.0, srDvig = 0.0;
        kpdDvig = parseFloat(this.Motor["Eff"]); //КПД двигателя
        moshDvig = parseFloat(this.Motor["Pow"]); //Мощность двигателя
        srDvig = parseFloat(this.Motor["Aver"]); //Среднее кол-во часов работы

        //********************Оперативные данные**************************
        //www
        let H1 = 0.0, Q1 = 0.0, H2 = 0.0, Q2 = 0.0;
        let sf = 0.0, nf = 0.0, A = 0.0, B = 0.0, C = 0.0, H = 0.0;
        let kpdN = 0.0, needP = 0.0, pBefore = 0.0, Qnom = 0.0;
        if (this.form == "www" || this.form == "tech") {
          H1 = parseFloat(this.Operation["MaxPress"]); //Макс. давление, м
          Q1 = parseFloat(this.Operation["MinFlow"]); //Мин. подача, м
          H2 = parseFloat(this.Operation["MinPress"]); //Мин. давление, м
          Q2 = parseFloat(this.Operation["MaxFlow"]); //Макс. подача, м3/ч

          sf = (H1 - H2) / (Math.pow(Q2, 2) - Math.pow(Q1, 2));
          nf = H1 + sf * Math.pow(Q1, 2);
          C = nf;
          A = (H1 - H2 * (Q1 / Q2) + nf * (Q1 / Q2) - nf) / (Math.pow(Q1, 2) - Q1 * Q2);
          B = (H1 - nf - A * Math.pow(Q1, 2)) / Q1;

          kpdN = parseFloat(this.Operation["PumpEff"]);//КПД насоса
          needP = parseFloat(this.Operation["NeedPress"]);//Требуемый напор
          pBefore = parseFloat(this.Operation["PressBefore"]);//Напор перед насосом
          Qnom = parseFloat(this.Operation["NominalFlow"]);//Номинальное значение подачи
        }

        //air
        let numMot = 0.0, numMotWinDay = 0.0, numMotWinNig = 0.0, numMotSumDay = 0.0, numMotSumNig = 0.0, numMotSprAutDay = 0.0, numMotSprAutNig = 0.0;
        if (this.form == "air") {
          numMot = parseFloat(this.Operation["NumOfMotors"]);
          numMotWinDay = parseFloat(this.Operation["NumOfMotorsWinterDay"]);
          numMotWinNig = parseFloat(this.Operation["NumOfMotorsWinterNight"]);
          numMotSumDay = parseFloat(this.Operation["NumOfMotorsSummerDay"]);
          numMotSumNig = parseFloat(this.Operation["NumOfMotorsSummerNight"]);
          numMotSprAutDay = parseFloat(this.Operation["NumOfMotorsSpringAutumnDay"]);
          numMotSprAutNig = parseFloat(this.Operation["NumOfMotorsSpringAutumnNight"]);
        }

        //tech
        let denPump = 0.0;
        if (this.form == "tech") {
          denPump = parseFloat(this.Operation["DensinyPump"]);
        }
        
        //*********************Коммерческие данные***********************
        let /*priceEquip = 0.0, priceInstall = 0.0,*/ priceV = 0.0, euroPr = 0.0, discount = 0.0;
        /*priceEquip = parseFloat(this.Commertial["AccessEquipPrice"]);//Стоимость оборудования
        priceInstall = parseFloat(this.Commertial["InstallPrice"]);//Стоимость монтажа*/
        priceV = parseFloat(this.Commertial["EnergPrice"]);//Цена э/э за кВтч с НДС, руб.
        euroPr = parseFloat(this.Commertial["CoursePrice"]);//Курс евро, руб (Стоимость 1 евро в рублях)
        discount = parseFloat(this.Commertial["Discount"]) / 100;//Ставка дисконта, %

        //**************************Расчёт********************************
        let sum1 = 0.0, sum2 = 0.0;
        let kpnNasos = [], pZadv = [], pPCh = [];

        //www
        if (this.form == "www") {
          for (var i = 0; i < this.dutyCycleData.length; i++) {
            let time = parseFloat(this.dutyCycleData[i].time);
            let perf = parseFloat(this.dutyCycleData[i].perfomance);

            H = A * Math.pow(Qnom * (perf / 100), 2) + B * Math.pow(Qnom * (perf / 100), 2) + C;
            kpnNasos[i] = kpdN / 100.0 * (1.0 - Math.pow(1 - (perf / 100), 2.3));
            pZadv[i] = 9.81 / 3600 * perf * Qnom * H / kpdDvig / kpnNasos[i];
            kpnNasos[i] = kpdN / 100.0 * 0.1 * (perf / 100) + 0.9 * kpdN / 100.0;
            pPCh[i] = 9.81 / 3600 * perf * Qnom * (needP - pBefore) / kpdDvig / kpnNasos[i] / kpdPCH;
            sum1 += (time / 100) * pZadv[i];
            sum2 += (time / 100) * pPCh[i];
          }
        }

        //air
        if (this.form == "air" && this.dutyCycleData.length == 4) {
          for (var i = 0; i < this.dutyCycleData.length; i++) {
            let nDay = 0.0, nNight = 0.0;
            let day = parseFloat(this.dutyCycleData[i].day);
            let night = parseFloat(this.dutyCycleData[i].night);

            //зима
            if (this.dutyCycleData[i].perfomance === "0") {
              nDay = numMotWinDay;
              nNight = numMotWinNig;
            }
            //весна/осень
            if (this.dutyCycleData[i].perfomance === "1" || this.dutyCycleData[i].perfomance === "3") {
              nDay = numMotSprAutDay;
              nNight = numMotSprAutNig;
            }
            //лето
            if (this.dutyCycleData[i].perfomance === "2") {
              nDay = numMotSumDay;
              nNight = numMotSumNig;
            }

            sum1 += moshDvig * (0.1739 * Math.pow(day / 100.0, 3) - 0.7773 * Math.pow(day / 100.0, 2) + 1.2306 * day / 100.0 + 0.3725) / kpdDvig * nDay;
            sum1 += moshDvig * (0.1739 * Math.pow(night / 100.0, 3) - 0.7773 * Math.pow(night / 100.0, 2) + 1.2306 * night / 100.0 + 0.3725) / kpdDvig * nNight;

            let kPoterDay = 0.0, kPoterNight = 0.0;
            let numTmpDay = day / 100.0;
            if (numTmpDay < 0.85)
              kPoterDay = 0.95 * (1.0 - Math.pow((1 - numTmpDay), 2.3));
            else
              kPoterDay = 1;

            let numTmpNight = night / 100.0;
            if (numTmpNight < 0.85)
              kPoterNight = 0.95 * (1.0 - Math.pow((1 - numTmpNight), 2.3));
            else
              kPoterNight = 1;

            sum2 += Math.pow(numTmpDay, 3) * moshDvig / kpdPCH / kpdDvig / 1.2 / kPoterDay;
            sum2 += Math.pow(numTmpNight, 3) * moshDvig / kpdPCH / kpdDvig / 1.2 / kPoterNight;
          }

          sum1 /= 8.0;
          sum2 = (sum2 * numMot) / 8.0;
        }

        //tech
        if (this.form == "tech") {
          for (var i = 0; i < this.dutyCycleData.length; i++) {
            let time = parseFloat(this.dutyCycleData[i].time);
            let perf = parseFloat(this.dutyCycleData[i].perfomance);

            H = A * Math.pow(Qnom * (perf / 100), 2) + B * Math.pow(Qnom * (perf / 100), 2) + C;
            kpnNasos[i] = kpdN / 100.0 * (1.0 - Math.pow(1 - (perf / 100), 2.3));
            pZadv[i] = 9.81 / 3600 * perf * Qnom * H / kpdDvig / kpnNasos[i] * denPump / 1000;
            kpnNasos[i] = kpdN / 100.0 * 0.1 * (perf / 100) + 0.9 * kpdN / 100.0;  
            pPCh[i] = 9.81 / 3600 * perf * Qnom * (needP - pBefore) / kpdDvig / kpnNasos[i] / kpdPCH;
            sum1 += (time / 100) * pZadv[i];
            sum2 += (time / 100) * pPCh[i];
           
          }
        }

        //force
        if (this.form == "force") {
          let a1 = 0.9;
          sum1 = (moshDvig * (0.1739 * Math.pow(a1, 3) - 0.7773 * Math.pow(a1, 2) + 1.2306*a1 +0.3725))/kpdDvig;

          let kPoter = 0.0;
          for (var i = 0; i < this.dutyCycleData.length; i++) {
            let time = parseFloat(this.dutyCycleData[i].time);
            let perf = parseFloat(this.dutyCycleData[i].perfomance);
            
            let numTmp = perf / 100;
            if (numTmp < 0.85)
              kPoter = 0.95 * (1 - Math.pow((1-numTmp),2.3));
            else
              kPoter = 1;

            pPCh[i] =Math.pow(numTmp,3)*sum1/kpdPCH/1.2/kPoter;
            sum2 += pPCh[i] * (time / 100);
          }
        }

        //vav
        if (this.form == "vav") {
          sum1 = moshDvig/kpdDvig;
          for (var i = 0; i < this.dutyCycleData.length; i++) {
            let time = parseFloat(this.dutyCycleData[i].time);
            let perf = parseFloat(this.dutyCycleData[i].perfomance);
            
            let numTmp = perf / 100;
  
            pPCh[i] = Math.pow(numTmp,3)*sum1/kpdPCH;
            sum2 += pPCh[i] * (time / 100);
          }
        }

        //park
        if (this.form == "park") {
          sum1 = moshDvig/kpdDvig;
          for (var i = 0; i < this.dutyCycleData.length; i++) {
            let time = parseFloat(this.dutyCycleData[i].time);
            let perf = parseFloat(this.dutyCycleData[i].perfomance);
            
            let numTmp = perf / 100;
  
            pPCh[i] = Math.pow(numTmp,3)*sum1/kpdPCH;
            sum2 += pPCh[i] * (time / 100);
          }
        }

        //screw
        if (this.form == "screw") {
         
          for (var i = 0; i < this.dutyCycleData.length; i++) {
            let time = parseFloat(this.dutyCycleData[i].time);
            let perf = parseFloat(this.dutyCycleData[i].perfomance);
         
            pPCh[i] = screwData[((perf-10)/10)].value.kstand * moshDvig;
            sum1 +=  pPCh[i] * (time / 100);
            pPCh[i] = screwData[((perf-10)/10)].value.kspch * moshDvig;
            sum2 += pPCh[i] * (time / 100);
          }
        }

        let e = 0.0, epch = 0.0, econ = 0.0, econev = 0.0, econpr = 0.0, invest = 0.0, cpchPrice = 0.0;
        e = srDvig * sum1;
        epch = srDvig * sum2;
        econ = e - epch;

        econev = priceV * econ;
        econpr = (1 - epch / e) * 100;

        let cpch = 0;
        for (var i = 0; i < CpchPower.length; i++) {
          if (moshDvig <= CpchPower[i]) {
            cpch = Cpch[i];
            break;
          }
        }

        if (this.lang === "en") {
          //invest = cpch * (100 + priceEquip) * (100 + priceInstall) / 10000;
          invest = (cpch + (cpch * 0.20));
          cpchPrice = cpch;
        }
        else {
          //invest = cpch * (100 + priceEquip) * (100 + priceInstall) * euroPr / 10000;
          invest = (cpch + (cpch * 0.20)) * euroPr;
          cpchPrice = cpch * euroPr;
        }

        let NPV = {};
        NPV[0] = -invest;

        let kd = [(1.0 + discount), Math.pow(1 + discount, 2), Math.pow(1 + discount, 3), Math.pow(1 + discount, 4), Math.pow(1 + discount, 5), Math.pow(1 + discount, 6), Math.pow(1 + discount, 7), Math.pow(1 + discount, 8), Math.pow(1 + discount, 9), Math.pow(1 + discount, 10)];
        let sd = [1, (1.0 + stoim), Math.pow(1 + stoim, 2), Math.pow(1 + stoim, 3), Math.pow(1 + stoim, 4), Math.pow(1 + stoim, 5), Math.pow(1 + stoim, 6), Math.pow(1 + stoim, 7), Math.pow(1 + stoim, 8), Math.pow(1 + stoim, 9)];

        let econEffect = 0.0, amort = 0.0, dopPrib1 = 0.0, dopPribNalog1 = 0.0, moneyStream = 0.0, diskontMoneyStream = 0.0;
        let srok = -1.0, srokOkup = 0;
        let prev = 0, next = -invest;

        amort = invest / 10;
        
        for (var i = 0; i < lifetime; i++) {
          prev = next;
          econEffect = sd[i] * econev;

          dopPrib1 = econEffect - amort;
          dopPribNalog1 = dopPrib1 * nalog;
          moneyStream = dopPribNalog1 + amort;

          diskontMoneyStream = moneyStream / kd[i];
          next = NPV[i] + diskontMoneyStream;
          NPV[i + 1] = next;
          if (next > 0 && srok < 0.0) {
            if (prev > 0)
              srok = i;
            srok = i - prev / (next - prev);
            srokOkup = srok;
          }
          if (i == lifetime - 1 && srok < 0) {
            srok = lifetime;
            srokOkup = srok;
          }
        }

        if (NPV[lifetime] <= 0 || isNaN(NPV[lifetime])) {
          NPV[lifetime] = NaN;
          srok = NaN;

          isErr = true;
          if (this.lang === "en")
            txt = "Incorrect data! Please try again!";
          else
            txt = "Введены некорректные данные! Пожалуйста, попробуйте ещё раз!";
        }

        let ROI = 0.0;
        if (!isErr) {
          ROI = NPV[lifetime] / invest * 100;
        }

        if (!isErr) {
          /* if (this.lang === "en")
             txt = "The calculation completed successfully!";
           else
           {
             txt = "Расчёт завершен успешно!";
           }*/

          let profileModal = this.modalCtrl.create(ResultPage,
            {
              lang: this.lang,
              form: this.form,
              formName: this.getSettingParamValue('titleCalculate', 'txt'),
              results: {
                econom: econpr,
                npv: NPV[lifetime],
                roi: ROI,
                paybackPeriod: srokOkup,
                dutycycle: this.dutyCycleData,
                invest: invest,
                pchPrice: cpchPrice
              }
            });
          profileModal.present();
          return;
        }
      }
      catch (ex) {
        isErr = true;
        txt = ex.message;
      }
    }

    if (txt != "" || isErr) {
      let alert = this.alertCtrl.create({
        title: !isErr ? (this.lang === "en" ? "Information" : "Информация") : (this.lang === "en" ? "Error" : "Ошибка"),
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


}
