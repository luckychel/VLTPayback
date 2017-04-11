import { Component } from '@angular/core';
import { NavController, NavParams, /*PopoverController,*/ ModalController, AlertController } from 'ionic-angular';
import { SettingsService } from '../../services/settings-service';

import { DutycyclePage } from '../dutycycle/dutycycle';
import { ResultPage } from '../result/result';

@Component({
  selector: 'page-wwandw',
  templateUrl: 'wwandw.html'
})

export class WwandwPage {

  //data: Array<{title: string, icon: string, showDetails: boolean}> = [];
  settings = {};
  lang = " ";
  form = "www";
  constantData: any[] = [];
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
        })
       .then(()=>{
          return Promise.all([this.settingService.getConstantData().then(data => {
            this.constantData = data;
           })])
        });
    }

  getSettingParamValue(key, param){
    if (this.settings[key] !== undefined)
    {
      return this.settings[key][param];
    }
  }
  getConstantParamValue(key, param){
    
    for(var i = 0; i < this.constantData.length; i++)
    {
        if (this.constantData[i][0] == key)
        {
            return this.constantData[i][2];
        }
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
    else if (this.lang === "ru" && (this.Commertial["CoursePrice"] == "" || (this.Commertial["CoursePrice"] != "" &&  parseFloat(this.Commertial["CoursePrice"]) == 0))) {
        field = "\"" + this.getSettingParamValue('CoursePrice', 'txt') + "\"";
    }
/*    else if (this.Commertial["AccessEquipPrice"] == "" || (this.Commertial["AccessEquipPrice"] != "" &&  parseFloat(this.Commertial["AccessEquipPrice"]) == 0)) {
        field = "\"" + this.getSettingParamValue('AccessEquipPrice', 'txt') + "\"";
    }
    else if (this.Commertial["InstallPrice"] == "" || (this.Commertial["InstallPrice"] != "" &&  parseFloat(this.Commertial["InstallPrice"]) == 0)) {
        field = "\"" + this.getSettingParamValue('InstallPrice', 'txt') + "\"";
    }*/

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
                this.settingService.updateVLTWWWData({'key': 'Commertial.EnergPrice', 'value': this.Commertial["EnergPrice"]}),
                this.settingService.updateVLTWWWData({'key': 'Commertial.CoursePrice', 'value': this.Commertial["CoursePrice"]})
              /*this.settingService.updateVLTWWWData({'key': 'Commertial.AccessEquipPrice', 'value': this.Commertial["AccessEquipPrice"]}),
                this.settingService.updateVLTWWWData({'key': 'Commertial.InstallPrice', 'value': this.Commertial["InstallPrice"]})*/ ]);
          
      return resultOk;
  }

  calc()
  {
    let txt = "", isErr = false;
    if (this.check())
    {
      try {
        //данные из VLTPayback
        //let Cpch = [549.299, 566.5, 607.6, 663.6084, 760.8404, 917.627, 1020.936, 1087.783, 1254.293, 1405.002, 1795.146, 2050.38, 2577.863, 3017.838, 3541.676, 4335.332, 5302.79, 6352.896, 7215.83, 8488.354, 9780.324, 11750.49, 14459.61, 17177.25, 21769.03, 25638.76, 30251.1, 34214.54, 42917.01, 54914.45, 61645.5, 70148.15, 81485.36, 92999.73, 115634.0];
        //let CpchPower = [0.37, 0.55, 0.75, 1.1, 1.5, 2.2, 3, 4, 5.5, 7.5, 11, 15, 18, 22, 30, 37, 45, 55, 75, 90, 110, 132, 160, 200, 250, 315, 355, 400, 450, 500, 560, 630, 710, 800, 1000];
        
        let CpchPower = [1.1, 1.5, 2.2, 3, 4, 5.5, 7.5, 11, 15, 18, 22, 30, 37, 45, 55, 75, 90, 110, 132, 160, 200, 250]; 
        let Cpch = [519, 608, 754, 849, 912, 1065, 1204, 1566, 1802, 2291, 2699, 3153, 3881, 4768, 5832.74, 6521.86, 7688.88, 8006.3, 9667.74, 11802.36, 14091, 18062];

        let kpdPCH = 0.0, nalog = 0.0, discount = 0.0, stoim = 0.0, lifetime = 0.0;
        kpdPCH = parseFloat(this.getConstantParamValue("kpd","value"));
        nalog =  parseFloat(this.getConstantParamValue("tax","value")) / 100.0;
        discount = parseFloat(this.getConstantParamValue("discount","value")) / 100.0;
        stoim = parseFloat(this.getConstantParamValue("electricity","value")) / 100.0;
        lifetime = parseFloat(this.getConstantParamValue("lifetime","value"));

        let H1 = 0.0, Q1 = 0.0, H2 = 0.0, Q2 = 0.0;
        H1 = parseFloat(this.Operation["MaxPress"]);
        Q1 = parseFloat(this.Operation["MinFlow"]);
        H2 = parseFloat(this.Operation["MinPress"]);
        Q2 = parseFloat(this.Operation["MaxFlow"]);
      
        let sf = 0.0, nf = 0.0, A = 0.0, B = 0.0, C = 0.0, H = 0.0;
        sf = (H1 - H2)/(Math.pow(Q2,2) - Math.pow(Q1,2));
        nf = H1 + sf * Math.pow(Q1,2);
        C = nf;
        A = (H1 - H2*(Q1/Q2) + nf*(Q1/Q2)-nf)/(Math.pow(Q1,2) - Q1*Q2);
        B = (H1 - nf - A*Math.pow(Q1,2))/Q1;

        let kpdDvig = 0.0, moshDvig = 0.0, srDvig = 0.0;
        kpdDvig = parseFloat(this.Motor["Eff"]); //КПД двигателя
        moshDvig = parseFloat(this.Motor["Pow"]); //Мощность двигателя
        srDvig = parseFloat(this.Motor["Aver"]); //Среднее кол-во часов работы

        let kpdN = 0.0, needP = 0.0, pBefore = 0.0, Qnom = 0.0;
        kpdN = parseFloat(this.Operation["PumpEff"]);//КПД насоса
        needP = parseFloat(this.Operation["NeedPress"]);//Требуемый напор
        pBefore = parseFloat(this.Operation["PressBefore"]);//Напор на всасе
        Qnom = parseFloat(this.Operation["NominalFlow"]);//Номинальное значение подачи

        let /*priceEquip = 0.0, priceInstall = 0.0,*/ priceV = 0.0, euroPr = 0.0;
/*        priceEquip = parseFloat(this.Commertial["AccessEquipPrice"]);//Стоимость оборудования
        priceInstall = parseFloat(this.Commertial["InstallPrice"]);//Стоимость монтажа*/
        priceV = parseFloat(this.Commertial["EnergPrice"]);//Цена э/э
        euroPr = parseFloat(this.Commertial["CoursePrice"]);//Стоимость 1 евро в рублях
        
         let kpnNasos = [], pZadv = [], pPCh = [];
        let sum1 = 0.0, sum2 = 0.0;
        for(var i = 0; i < this.dutyCycleData.length; i++)
        {
          let time = parseFloat(this.dutyCycleData[i].time);
          let perf = parseFloat(this.dutyCycleData[i].perfomance);

          H = A*Math.pow(Qnom*(perf/100),2) + B*Math.pow(Qnom *(perf/100),2) + C;
          kpnNasos[i] = kpdN/100.0 * (1.0 - Math.pow(1 - (perf/100), 2.3));
          pZadv[i] = 9.81 / 3600 * perf * Qnom * H / kpdDvig / kpnNasos[i];
          kpnNasos[i] = kpdN/100.0 * 0.1 * (perf/100) + 0.9*kpdN/100.0;
          pPCh[i] = 9.81 / 3600 * perf * Qnom * (needP - pBefore) / kpdDvig / kpnNasos[i];
          sum1 += time /100 * pZadv[i];
          sum2 += time /100 * pPCh[i];
        }

        let e = 0.0, epch = 0.0, econ = 0.0, econev = 0.0, econpr = 0.0, invest = 0.0;
        e = srDvig * sum1;
        epch = srDvig * sum2;
        econ = e-epch;
        
        if (this.lang === "en") {
          //econev = priceV/100 * econ;
          econev = C * econ;
          econpr = (1-epch/e)*100;
        }
        else {
          //econev = priceV * econ;
          econev = (C * econ) * euroPr;
          econpr = (1-epch/e)*100 * euroPr;
        }

        let cpch = 0;
        for(var i = 0;i<CpchPower.length;i++){
            if(moshDvig <= CpchPower[i])
            { 
              cpch = Cpch[i];
              break;
            }
        }

       if (this.lang === "en") {
          //invest = cpch * (100 + priceEquip) * (100 + priceInstall) / 10000;
          invest = (cpch + (cpch * 0.20));
        }
        else {
          //invest = cpch * (100 + priceEquip) * (100 + priceInstall) * euroPr / 10000;
          invest = (cpch + (cpch * 0.20)) * euroPr;
        }

        let NPV = {};
        NPV[0] = -invest;

        let kd = [(1.0 + discount), Math.pow(1 + discount, 2), Math.pow(1 + discount, 3), Math.pow(1 + discount, 4), Math.pow(1 + discount, 5), Math.pow(1 + discount, 6), Math.pow(1 + discount, 7), Math.pow(1 + discount, 8), Math.pow(1 + discount, 9), Math.pow(1 + discount, 10)];
        let sd = [1, (1.0 + stoim), Math.pow(1 + stoim, 2), Math.pow(1 + stoim, 3), Math.pow(1 + stoim, 4), Math.pow(1 + stoim, 5), Math.pow(1 + stoim, 6), Math.pow(1 + stoim, 7), Math.pow(1 + stoim, 8), Math.pow(1 + stoim, 9)];
        let kstand = [0.5, 0.55, 0.6, 0.65, 0.73, 0.8, 0.85, 0.92, 0.97, 1]; 
        let kspch = [0.27, 0.32, 0.4, 0.47, 0.55, 0.62, 0.72, 0.82, 0.92, 1.02];
        
        let econEffect = 0.0, amort = 0.0, dopPrib1 = 0.0, dopPribNalog1 =0.0, moneyStream = 0.0, diskontMoneyStream = 0.0;
        let srok = -1.0, srokOkup = 0;
        let prev = 0, next = -invest;

        for(var i = 0;i<lifetime;i++){
          prev = next;
          econEffect = sd[i] * econev;

          amort = invest/10;
          dopPrib1 = econEffect - amort;
          dopPribNalog1 = dopPrib1 * nalog;
          moneyStream = dopPribNalog1 + amort;
          
          diskontMoneyStream = moneyStream/kd[i];
          next = NPV[i] + diskontMoneyStream;
          NPV[i + 1] = next;
          if(next > 0 && srok < 0.0){
            if(prev > 0)
                srok = i;
            srok = i - prev/(next - prev);
            srokOkup = srok;
          }
          if(i==lifetime-1 && srok < 0)
          {
              srok = lifetime;
              srokOkup = srok;
          }
        }


        if (NPV[lifetime] <= 0 || isNaN(NPV[lifetime]))
        {
            NPV[lifetime] = NaN;
            srok = NaN;

            isErr = true;
            if (this.lang === "en")
              txt = "Incorrect data! Please try again!";
            else
              txt = "Введены некорректные данные! Пожалуйста, попробуйте ещё раз!";
        }
        
        let ROI = 0.0;
        if (!isErr)
        {
           ROI = NPV[lifetime]/invest * 100;
        }

        if (!isErr) 
        {
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
            results: {
              econom: econpr,
              npv: NPV[lifetime],
              roi: ROI,
              paybackPeriod: srokOkup,
              dutycycle: this.dutyCycleData,
              invest: invest
            }
          });
          profileModal.present();
          return;
        }
      } 
      catch (ex){
          isErr = true;
          txt = ex.message;
      }
    }

    if (txt != "" || isErr)
    {
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
