import {Injectable} from '@angular/core';
import { SQLite } from 'ionic-native';
 
@Injectable()
export class SettingsService {
 
   db: SQLite = null;

  constructor() {
    this.db = new SQLite();
  }

  openDatabase(){
    return this.db.openDatabase({
      name: 'VLT.db',
      location: 'default' // the location field is required
   }).then(() => {

        //comment before publication
        //return Promise.all([this.dropAllTables()]);

        /*this.deleteVLTSettingsData();
        this.deleteVLTConstantData();
        this.deleteVLTCalculateSettingsData();
        this.deleteVLTDutyCycleSettingsData();
        this.deleteVLTDutyCycleData();*/
      
   }).then(() => {

      let table = this.db.executeSql("CREATE TABLE IF NOT EXISTS VLTSettings(id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT, value TEXT, lang TEXT)", []);
      return Promise.all([table]);
      
    }).then(() => {

        return this.db.executeSql('SELECT * FROM VLTSettings', []);
      }
    ).then((res) => {

        if(res.rows.length == 0) {

            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['version', '1', '']);
           
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['lang', 'ru', '']);

            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['titleHome', 'Экономия с ЧРП', 'ru']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['titleHome', 'Danfoss Savings', 'en']);

            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['titleSetting', 'Настройки', 'ru']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['titleSetting', 'Settings', 'en']);

            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['titleAbout', 'О программе', 'ru']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['titleAbout', 'About', 'en']);

            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['www', 'Водоканал', 'ru']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['www', 'WW&W', 'en']);

            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['www_img', 'www_rus_normal.png', 'ru']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['www_img', 'www_eng_normal.png', 'en']);

            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['www_img_selected', 'www_rus_selected.png', 'ru']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['www_img_selected', 'www_eng_selected.png', 'en']);

            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['air', 'АВО', 'ru']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['air', 'Air-cooling fans', 'en']);

            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['air_img', 'air_rus_normal.png', 'ru']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['air_img', 'air_eng_normal.png', 'en']);

            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['air_img_selected', 'air_rus_selected.png', 'ru']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['air_img_selected', 'air_eng_selected.png', 'en']);

            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['tech', 'Технологический насос', 'ru']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['tech', 'Technology pump', 'en']);

            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['tech_img', 'tech_rus_normal.png', 'ru']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['tech_img', 'tech_eng_normal.png', 'en']);

            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['tech_img_selected', 'tech_rus_selected.png', 'ru']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['tech_img_selected', 'tech_eng_selected.png', 'en']);

            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['force', 'Тягодутьевые механизмы', 'ru']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['force', 'Force-draft machinery', 'en']);

            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['force_img', 'force_rus_normal.png', 'ru']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['force_img', 'force_eng_normal.png', 'en']);

            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['force_img_selected', 'force_rus_selected.png', 'ru']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['force_img_selected', 'force_eng_selected.png', 'en']);

            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['vav', 'Переменный расход воздуха', 'ru']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['vav', 'VAV ventilation', 'en']);

            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['vav_img', 'vav_rus_normal.png', 'ru']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['vav_img', 'vav_eng_normal.png', 'en']);

            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['vav_img_selected', 'vav_rus_selected.png', 'ru']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['vav_img_selected', 'vav_eng_selected.png', 'en']);

            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['park', 'Вентиляция парковки', 'ru']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['park', 'Parking ventilation', 'en']);

            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['park_img', 'park_rus_normal.png', 'ru']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['park_img', 'park_eng_normal.png', 'en']);

            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['park_img_selected', 'park_rus_selected.png', 'ru']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['park_img_selected', 'park_eng_selected.png', 'en']);

            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['screw', 'Винтовой компрессор', 'ru']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['screw', 'Screw compressor', 'en']);

            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['screw_img', 'screw_rus_normal.png', 'ru']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['screw_img', 'screw_eng_normal.png', 'en']);

            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['screw_img_selected', 'screw_rus_selected.png', 'ru']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['screw_img_selected', 'screw_eng_selected.png', 'en']);

            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['titleLang', 'Язык', 'ru']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['titleLang', 'Language', 'en']);

            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['titleLangRu', 'Русский', 'ru']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['titleLangRu', 'Russian', 'en']);

            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['titleLangEn', 'Английский', 'ru']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['titleLangEn', 'English', 'en']);

            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['titleNotify', 'Оповещения', 'ru']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['titleNotify', 'Notify', 'en']);

            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['mainHome', 'Главная', 'ru']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['mainHome', 'Main', 'en']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['mainSetting', 'Настройки', 'ru']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['mainSetting', 'Settings', 'en']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['mainAbout', 'О программе', 'ru']);
            this.db.executeSql("INSERT INTO VLTSettings (key, value, lang) VALUES (?, ?, ?)", ['mainAbout', 'About', 'en']);

            return Promise.all([]); /*[tab1, tab11, tab2, tab21, tab3, tab31, 
                                    i0,i1,i2,i21,i3,i31,i4,i41,
                                    i5,i51,i512,i513,i514,i515,
                                    i6,i61,i612,i613,i614,i615,
                                    i7,i71,i712,i713,i714,i715,
                                    i8,i81,i812,i813,i814,i815,
                                    i9,i91,i912,i913,i914,i915,
                                    i10,i101,i1012,i1013,i1014,i1015,
                                    i11,i111,i1112,i1113,i1114,i1115,
                                    i12,i121,i13,i131,i14,i141,i15,i151]*/
        }
      }
   ).then(() => {

      let table = this.db.executeSql("CREATE TABLE IF NOT EXISTS VLTConstant(id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT, txt TEXT, value TEXT, unit TEXT, lang TEXT)", []);
      return Promise.all([table]);

    }).then(() => {

        return this.db.executeSql('SELECT * FROM VLTConstant', []);
    }
  ).then((res)=>{
      if(res.rows.length == 0) {
            this.db.executeSql("INSERT INTO VLTConstant (key, txt, value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['tax', 'Налог на прибыль', '20', '%', 'ru']);
            this.db.executeSql("INSERT INTO VLTConstant (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['tax', 'Income tax', '20', '%', 'en']);
            this.db.executeSql("INSERT INTO VLTConstant (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['discount', 'Ставка дисконтирования', '10', '%', 'ru']);
            this.db.executeSql("INSERT INTO VLTConstant (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['discount', 'Discount rate', '10', '%', 'en']);
            this.db.executeSql("INSERT INTO VLTConstant (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['electricity', 'Темпы роста цен на электроэнергию', '15', '%', 'ru']);
            this.db.executeSql("INSERT INTO VLTConstant (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['electricity','The rate of growth in electricity prices', '15', '%', 'en']);
            this.db.executeSql("INSERT INTO VLTConstant (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['lifetime', 'Срок службы преобразователя частоты', '10', 'лет', 'ru']);
            this.db.executeSql("INSERT INTO VLTConstant (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['lifetime', 'The service life of the frequency Converter', '10', 'years', 'en']);
            this.db.executeSql("INSERT INTO VLTConstant (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['kpd', 'КПД частотного преобразователя Данфосс', '0.96', '', 'ru']);
            this.db.executeSql("INSERT INTO VLTConstant (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['kpd', 'Efficiency of frequency Converter Danfoss', '0.96', '', 'en']);
            this.db.executeSql("INSERT INTO VLTConstant (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['currence', 'Валюта', 'Евро', '', 'ru']);
            this.db.executeSql("INSERT INTO VLTConstant (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['currence', 'Сurrency', 'Euro', '', 'en']);
   /*         this.db.executeSql("INSERT INTO VLTConstant (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['course', 'Курс', '60', 'руб', 'ru']);
            this.db.executeSql("INSERT INTO VLTConstant (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['course', 'Rate', '60', 'rub', 'en']);*/
            return Promise.all([]);
        }
  }).then(() => {

      let table = this.db.executeSql("CREATE TABLE IF NOT EXISTS VLTCalculateSettings(id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT,  txt TEXT, value TEXT, unit TEXT, lang TEXT, form text)", []);
      return Promise.all([table]);

    }).then(() => {

        return this.db.executeSql('SELECT * FROM VLTCalculateSettings', []);
    }
  ).then((res)=>{
      if(res.rows.length == 0) {
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['titleCalculate', 'Водоканал','', '', 'ru', 'www']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['titleCalculate', 'WW&W', '', '', 'en', 'www']);
            
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['titleCalculate', 'ABO','', '', 'ru', 'air']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['titleCalculate', 'Air-cooling fans', '', '', 'en', 'air']);

            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['titleCalculate', 'Технологический насос','', '', 'ru', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['titleCalculate', 'Technology pump', '', '', 'en', 'tech']);

            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['titleCalculate', 'Тягодутьевые механизмы','', '', 'ru', 'force']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['titleCalculate', 'Force-draft machinery', '', '', 'en', 'force']);

            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['titleCalculate', 'Переменный расход воздуха','', '', 'ru', 'vav']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['titleCalculate', 'VAV ventilation', '', '', 'en', 'vav']);

            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['titleCalculate', 'Вентиляция парковки','', '', 'ru', 'park']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['titleCalculate', 'Parking ventilation', '', '', 'en', 'park']);

            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['titleCalculate', 'Винтовой компрессор','', '', 'ru', 'screw']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['titleCalculate', 'Screw compressor', '', '', 'en', 'screw']);

            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['headerCalculateInput', 'Параметры настройки','', '', 'ru', '']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['headerCalculateInput', 'Parameter settings', '', '', 'en', '']);

            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['headerCalculateResult', 'Результаты','', '', 'ru', '']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['headerCalculateResult', 'Results', '', '', 'en', '']);

            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['MotorTitle', 'Двигатель / Характеристики','', '', 'ru', '']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['MotorTitle', 'Motor / Drive Data', '', '', 'en', '']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['OperationTitle', 'Оперативные данные','', '', 'ru', '']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['OperationTitle', 'Operation', '', '', 'en', '']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['CommertialTitle', 'Коммерческие данные','', '', 'ru', '']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['CommertialTitle', 'Commertial', '', '', 'en', '']);

            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['MotorEff', 'КПД двигателя','', '', 'ru', '']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['MotorEff', 'Motor efficiency', '', '', 'en', '']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['MotorPow', 'Мощность двигателя','', '', 'ru', '']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['MotorPow', 'Motor power', '', '', 'en', '']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['MotorAver', 'Среднее кол-во часов работы','', '', 'ru', '']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['MotorAver', 'Average work time', '', '', 'en', '']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['EnergPrice', 'Цена электроэнерги за кВтч с НДС, руб.','', '', 'ru', '']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['EnergPrice', 'Energy price with VAT', '', '', 'en', '']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['CoursePrice', 'Курс евро, руб.','', '', 'ru', '']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['CoursePrice', 'Rate from 1 euro', '', '', 'en', '']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['AccessEquipPrice', 'Стоимость оборудования/аксессуаров','', '', 'ru', '']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['AccessEquipPrice', 'Accessories/Equipment price', '', '', 'en', '']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['InstallPrice', 'Цена наладки и монтажа','', '', 'ru', '']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['InstallPrice', 'Installation price', '', '', 'en', '']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['DutyCycle', 'Профиль нагрузки','', '', 'ru', '']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['DutyCycle', 'Duty cycle', '', '', 'en', '']);

            /*www*/
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['PumpEff', 'КПД насоса, %','', '', 'ru', 'www']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['PumpEff', 'Pump efficiency, %', '', '', 'en', 'www']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['NeedPress', 'Требуемый напор, м','', '', 'ru', 'www']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['NeedPress', 'Needed pressure, m', '', '', 'en', 'www']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['PressBefore', 'Напор перед насосом, м','', '', 'ru', 'www']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['PressBefore', 'Pressure before pump, m', '', '', 'en', 'www']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['NominalFlow', 'Номинальное значение подачи, м3/ч','', '', 'ru', 'www']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['NominalFlow', 'Nominal water flow, m3/h', '', '', 'en', 'www']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['MaxPress', 'Макс. давление, м','', '', 'ru', 'www']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['MaxPress', 'Max. pressure, m', '', '', 'en', 'www']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['MinFlow', 'Мин. подача, м3/ч','', '', 'ru', 'www']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['MinFlow', 'Min. flow, m3/h', '', '', 'en', 'www']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['MinPress', 'Мин. давление, м','', '', 'ru', 'www']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['MinPress', 'Min. pressure, m', '', '', 'en', 'www']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['MaxFlow', 'Макс. подача, м3/ч','', '', 'ru', 'www']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['MaxFlow', 'Max. flow, m3/h', '', '', 'en', 'www']);
 
            /*air*/
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['NumOfMotors', 'Кол-во работающих двигателей в секции','', '', 'ru', 'air']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['NumOfMotors', 'Total quatity of motors is a section', '', '', 'en', 'air']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['NumOfMotorsWinterDay', 'Кол-во раб. двигателей зимой днем','', '', 'ru', 'air']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['NumOfMotorsWinterDay', 'Total of working motors day winter', '', '', 'en', 'air']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['NumOfMotorsWinterNight', 'Кол-во раб. двигателей зимой ночью','', '', 'ru', 'air']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['NumOfMotorsWinterNight', 'Total of working motors night winter', '', '', 'en', 'air']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['NumOfMotorsSummerDay', 'Кол-во раб. двигателей летом днем','', '', 'ru', 'air']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['NumOfMotorsSummerDay', 'Total of working motors day summer', '', '', 'en', 'air']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['NumOfMotorsSummerNight', 'Кол-во раб. двигателей летом ночью','', '', 'ru', 'air']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['NumOfMotorsSummerNight', 'Total of working motors night summer', '', '', 'en', 'air']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['NumOfMotorsSpringAutumnDay', 'Кол-во раб. двиг. весна/осень днем','', '', 'ru', 'air']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['NumOfMotorsSpringAutumnDay', 'Total of work. mot. day spring/autumn', '', '', 'en', 'air']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['NumOfMotorsSpringAutumnNight', 'Кол-во раб. двиг. весна/осень ночью','', '', 'ru', 'air']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['NumOfMotorsSpringAutumnNight', 'Total of work. mot. night spring/autumn', '', '', 'en', 'air']);

            /*tech*/
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['PumpEff', 'КПД насоса, %','', '', 'ru', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['PumpEff', 'Pump efficiency, %', '', '', 'en', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['NeedPress', 'Требуемый напор, м','', '', 'ru', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['NeedPress', 'Needed pressure, m', '', '', 'en', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['PressBefore', 'Напор перед насосом, м','', '', 'ru', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['PressBefore', 'Pressure before pump, m', '', '', 'en', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['NominalFlow', 'Номинальное значение подачи, м3/ч','', '', 'ru', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['NominalFlow', 'Nominal water flow, m3/h', '', '', 'en', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['MaxPress', 'Макс. давление, м','', '', 'ru', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['MaxPress', 'Max. pressure, m', '', '', 'en', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['MinFlow', 'Мин. подача, м3/ч','', '', 'ru', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['MinFlow', 'Min. flow, m3/h', '', '', 'en', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['MinPress', 'Мин. давление, м','', '', 'ru', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['MinPress', 'Min. pressure, m', '', '', 'en', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['MaxFlow', 'Макс. подача, м3/ч','', '', 'ru', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['MaxFlow', 'Max. flow, m3/h', '', '', 'en', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt, value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['DensinyPump', 'Плотность жидкости, кг/м3','', '', 'ru', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateSettings (key, txt,  value, unit, lang, form) VALUES (?, ?, ?, ?, ?, ?)", ['DensinyPump', 'Fluid density, kg/m3', '', '', 'en', 'tech']);



            return Promise.all([]);
        }
    }).then(() => {

      let table = this.db.executeSql("CREATE TABLE IF NOT EXISTS VLTCalculateData(id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT, value TEXT, form TEXT)", []);
      return Promise.all([table]);

    }).then(() => {

        return this.db.executeSql('SELECT * FROM VLTCalculateData', []);
    }
  ).then((res)=>{

      if(res.rows.length == 0) {

            /*www*/
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.Eff', '84', 'www']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.Pow', '11', 'www']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.Aver', '8760', 'www']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.icon', 'ios-arrow-down-outline', 'www']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.showDetails', '0', 'www']);

            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.PumpEff', '60', 'www']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.NeedPress', '71', 'www']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.PressBefore', '37', 'www']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.NominalFlow', '45', 'www']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.MaxPress', '48', 'www']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.MinFlow', '30', 'www']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.MinPress', '45', 'www']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.MaxFlow', '45', 'www']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.icon', 'ios-arrow-down-outline', 'www']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.showDetails', '0', 'www']);

            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Commertial.icon', 'ios-arrow-down-outline', 'www']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Commertial.showDetails', '0', 'www']);

            /*air*/
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.Eff', '84', 'air']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.Pow', '11', 'air']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.Aver', '7800', 'air']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.icon', 'ios-arrow-down-outline', 'air']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.showDetails', '0', 'air']);

            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.NumOfMotors', '3', 'air']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.NumOfMotorsWinterDay', '2', 'air']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.NumOfMotorsWinterNight', '1', 'air']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.NumOfMotorsSummerDay', '3', 'air']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.NumOfMotorsSummerNight', '2', 'air']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.NumOfMotorsSpringAutumnDay', '2', 'air']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.NumOfMotorsSpringAutumnNight', '2', 'air']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.icon', 'ios-arrow-down-outline', 'air']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.showDetails', '0', 'air']);

            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Commertial.icon', 'ios-arrow-down-outline', 'air']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Commertial.showDetails', '0', 'air'])

            /*tech*/
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.Eff', '84', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.Pow', '11', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.Aver', '7800', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.icon', 'ios-arrow-down-outline', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.showDetails', '0', 'tech']);
            
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.PumpEff', '60', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.NeedPress', '71', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.PressBefore', '37', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.NominalFlow', '45', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.MaxPress', '48', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.MinFlow', '30', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.MinPress', '45', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.MaxFlow', '45', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.DensinyPump', '1000', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.icon', 'ios-arrow-down-outline', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.showDetails', '0', 'tech']);

            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Commertial.icon', 'ios-arrow-down-outline', 'tech']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Commertial.showDetails', '0', 'tech'])

            /*force*/
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.Eff', '84', 'force']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.Pow', '11', 'force']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.Aver', '7800', 'force']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.icon', 'ios-arrow-down-outline', 'force']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.showDetails', '0', 'force']);
            
/*            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.icon', 'ios-arrow-down-outline', 'force']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.showDetails', '0', 'force']);*/

            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Commertial.icon', 'ios-arrow-down-outline', 'force']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Commertial.showDetails', '0', 'force'])

            /*vav*/
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.Eff', '84', 'vav']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.Pow', '11', 'vav']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.Aver', '7800', 'vav']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.icon', 'ios-arrow-down-outline', 'vav']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.showDetails', '0', 'vav']);
            
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.icon', 'ios-arrow-down-outline', 'vav']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.showDetails', '0', 'vav']);

            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Commertial.icon', 'ios-arrow-down-outline', 'vav']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Commertial.showDetails', '0', 'vav'])

            /*park*/
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.Eff', '84', 'park']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.Pow', '11', 'park']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.Aver', '7800', 'park']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.icon', 'ios-arrow-down-outline', 'park']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.showDetails', '0', 'park']);
            
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.icon', 'ios-arrow-down-outline', 'park']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.showDetails', '0', 'park']);

            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Commertial.icon', 'ios-arrow-down-outline', 'park']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Commertial.showDetails', '0', 'park'])
          
            /*screw*/
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.Eff', '84', 'screw']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.Pow', '11', 'screw']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.Aver', '7800', 'screw']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.icon', 'ios-arrow-down-outline', 'screw']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Motor.showDetails', '0', 'screw']);
            
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.icon', 'ios-arrow-down-outline', 'screw']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Operation.showDetails', '0', 'screw']);

            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Commertial.icon', 'ios-arrow-down-outline', 'screw']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Commertial.showDetails', '0', 'screw'])

            /*common for all*/
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Commertial.EnergPrice', '10', '']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Commertial.CoursePrice', '60', '']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Commertial.AccessEquipPrice', '', '']);
            this.db.executeSql("INSERT INTO VLTCalculateData (key, value, form) VALUES (?, ?, ?)", ['Commertial.InstallPrice', '', '']);
            
            return Promise.all([]);
        }
  })
    .then(() => {

      let table = this.db.executeSql("CREATE TABLE IF NOT EXISTS VLTDutyCycleSettings(id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT, value TEXT, lang TEXT)", []);
      return Promise.all([table]);

    }).then(() => {

        return this.db.executeSql('SELECT * FROM VLTDutyCycleSettings', []);
    }
    ).then((res)=>{
      if(res.rows.length == 0) {
            this.db.executeSql("INSERT INTO VLTDutyCycleSettings (key, value, lang) VALUES (?, ?, ?)", ['DutyCycleTitle', 'Профиль нагрузки', 'ru']);
            this.db.executeSql("INSERT INTO VLTDutyCycleSettings (key, value, lang) VALUES (?, ?, ?)", ['DutyCycleTitle', 'Duty cycle', 'en']);
            this.db.executeSql("INSERT INTO VLTDutyCycleSettings (key, value, lang) VALUES (?, ?, ?)", ['Num', '№', 'ru']);
            this.db.executeSql("INSERT INTO VLTDutyCycleSettings (key, value, lang) VALUES (?, ?, ?)", ['Num', '#', 'en']);
            this.db.executeSql("INSERT INTO VLTDutyCycleSettings (key, value, lang) VALUES (?, ?, ?)", ['Time', 'Время (%)', 'ru']);
            this.db.executeSql("INSERT INTO VLTDutyCycleSettings (key, value, lang) VALUES (?, ?, ?)", ['Time', 'Time (%)', 'en']);
            this.db.executeSql("INSERT INTO VLTDutyCycleSettings (key, value, lang) VALUES (?, ?, ?)", ['Perf', 'Нагрузка (%)', 'ru']);
            this.db.executeSql("INSERT INTO VLTDutyCycleSettings (key, value, lang) VALUES (?, ?, ?)", ['Perf', 'Perf (%)', 'en']);
            this.db.executeSql("INSERT INTO VLTDutyCycleSettings (key, value, lang) VALUES (?, ?, ?)", ['Exp', 'Расход (%)', 'ru']);
            this.db.executeSql("INSERT INTO VLTDutyCycleSettings (key, value, lang) VALUES (?, ?, ?)", ['Exp', 'Expense (%)', 'en']);
            this.db.executeSql("INSERT INTO VLTDutyCycleSettings (key, value, lang) VALUES (?, ?, ?)", ['Day', 'День (%)', 'ru']);
            this.db.executeSql("INSERT INTO VLTDutyCycleSettings (key, value, lang) VALUES (?, ?, ?)", ['Day', 'Day (%)', 'en']);
            this.db.executeSql("INSERT INTO VLTDutyCycleSettings (key, value, lang) VALUES (?, ?, ?)", ['Night', 'Ночь (%)', 'ru']);
            this.db.executeSql("INSERT INTO VLTDutyCycleSettings (key, value, lang) VALUES (?, ?, ?)", ['Night', 'Night (%)', 'en']);

            return Promise.all([]);
        }
  }).then(() => {

      let table = this.db.executeSql("CREATE TABLE IF NOT EXISTS VLTDutyCycle(id INTEGER PRIMARY KEY AUTOINCREMENT, num TEXT, time TEXT, perfomance TEXT, day TEXT, night TEXT, form TEXT)", []);
      return Promise.all([table]);

    }).then(() => {

        return this.db.executeSql('SELECT * FROM VLTDutyCycle', []);
    }
    ).then((res)=>{
      if(res.rows.length == 0) {
            //www
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['1', '25', '50', 'www']); 
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['2', '13', '60', 'www']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['3', '46', '80', 'www']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['4', '16', '100', 'www']);
            
            //air //в поле "perfomance" храним время года
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, day, night, form) VALUES (?, ?, ?, ?, ?, ?)", ['1', '25', '0', '60', '50', 'air']); //зима 
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, day, night, form) VALUES (?, ?, ?, ?, ?, ?)", ['2', '25', '1', '70', '65', 'air']); //весна
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, day, night, form) VALUES (?, ?, ?, ?, ?, ?)", ['3', '25', '2', '90', '85', 'air']); //лето
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, day, night, form) VALUES (?, ?, ?, ?, ?, ?)", ['4', '25', '3', '70', '65', 'air']); //осень

            //tech
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['1', '20', '50', 'tech']); 
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['2', '20', '60', 'tech']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['3', '20', '80', 'tech']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['4', '20', '100', 'tech']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['5', '20', '100', 'tech']);
            
            //force
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['1', '10', '100', 'force']); 
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['2', '70', '70', 'force']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['3', '20', '40', 'force']);
            
            //vav
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['1', '10', '30', 'vav']); 
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['2', '10', '40', 'vav']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['3', '15', '50', 'vav']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['4', '20', '60', 'vav']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['5', '20', '70', 'vav']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['6', '10', '80', 'vav']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['7', '10', '90', 'vav']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['8', '5', '100', 'vav']);
            
            //park
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['1', '25', '30', 'park']); 
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['2', '15', '40', 'park']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['3', '15', '50', 'park']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['4', '10', '60', 'park']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['5', '10', '70', 'park']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['6', '10', '80', 'park']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['7', '10', '90', 'park']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['8', '5', '100', 'park']);
            
            //screw
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['1', '1', '40', 'screw']); 
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['2', '5', '50', 'screw']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['3', '6', '60', 'screw']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['4', '24', '70', 'screw']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['4', '27', '80', 'screw']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['4', '30', '90', 'screw']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['4', '7', '100', 'screw']);
            return Promise.all([]);
        }
  })
  /*.then(() => {
    return this.db.executeSql('SELECT * FROM VLTSettings', []);
    }
  ).then((resultSet) => {
          if(resultSet.res.rows.length > 0) {
            let setts = [];
            for(let i = 0; i < resultSet.res.rows.length; i++) {
              setts.push({
                "key": resultSet.res.rows.item(i).key,
                "value": resultSet.res.rows.item(i).value,
                "lang": resultSet.res.rows.item(i).lang,
              });
            }
          }
    }
  )*/
  ;
}

getVersion(){
  return this.db.executeSql('SELECT * FROM VLTSettings WHERE key=?', ['version'])
      .then( response => {
        return response.rows.item(0).value;
      });
}

getLang(){
  return this.db.executeSql('SELECT * FROM VLTSettings WHERE key=?', ['lang'])
      .then( response => {
        return response.rows.item(0).value;
      });
}

getAll(){
    return this.getLang()
      .then( lang => {
         let sql = 'SELECT * FROM VLTSettings WHERE lang=?';
         return this.db.executeSql(sql, [lang])
      })
      .then(response => {
          let setts = {};
          for (let i = 0; i < response.rows.length; i++) {
            setts[response.rows.item(i).key] = response.rows.item(i).value;
          }
          return Promise.resolve( setts );

          /*let setts = [];
          for (let index = 0; index < response.rows.length; index++) {
            setts.push( response.rows.item(index) );
          }
          return Promise.resolve( setts );*/
        
        /* let setts = [];
           if (response.rows.length > 0) {
           
            for(let i = 0; i < response.rows.length; i++) {
              setts.push({
                "key": response.rows.item(i).key,
                "value": response.rows.item(i).value,
                "lang": response.rows.item(i).lang,
              });
            }
          }
          return Promise.resolve( setts );*/
      })
  }

  getConstantData(){

    return this.getLang()
      .then( lang => {
         let sql = 'SELECT * FROM VLTConstant WHERE lang=?';
         return this.db.executeSql(sql, [lang])
      })
      .then(response => {
        let setts = [];
          for (let i = 0; i < response.rows.length; i++) {
            setts.push([response.rows.item(i).key, response.rows.item(i).txt, response.rows.item(i).value, response.rows.item(i).unit]);
          }
          
          return Promise.resolve( setts );
      })
  }

  getCalculateSettingsData(lang, form){

    return this.db.executeSql('SELECT * FROM VLTCalculateSettings WHERE lang=? and (form="" or form=?)', [lang, form])
      .then(response => {
          let setts = {};

          for (let i = 0; i < response.rows.length; i++) {
            setts[response.rows.item(i).key] = { "txt": response.rows.item(i).txt, "value": response.rows.item(i).value, "unit": response.rows.item(i).unit};
          }

          return Promise.resolve( setts );
      })
  }

  getCalculateData(form){

    return this.db.executeSql('SELECT * FROM VLTCalculateData WHERE (form="" or form=?)', [form])
      .then(response => {
          let setts = [];

          for (let i = 0; i < response.rows.length; i++) {
            setts.push({"key" : response.rows.item(i).key, "value" : response.rows.item(i).value});
          }

          return Promise.resolve( setts );
      })
  }

  updateCalculateData(sett: any)
  {
      let sql = 'UPDATE VLTCalculateData SET value=? WHERE key=? and form=?';
      return this.db.executeSql(sql, [sett.value, sett.key, sett.form]);
  }

  getDutyCycleSettingsData(lang){

    return this.db.executeSql('SELECT * FROM VLTDutyCycleSettings WHERE lang=?', [lang])
      .then(response => {
          let setts = {};

          for (let i = 0; i < response.rows.length; i++) {
            setts[response.rows.item(i).key] = response.rows.item(i).value;
          }

          return Promise.resolve( setts );
      })
  }

  getDutyCycleData(form){

    return this.db.executeSql('SELECT * FROM VLTDutyCycle WHERE form=? ORDER BY num', [form])
      .then(response => {
          let setts = [];

          for (let i = 0; i < response.rows.length; i++) {
            setts.push({"id": response.rows.item(i).id, "num": response.rows.item(i).num, "time": response.rows.item(i).time, "perfomance": response.rows.item(i).perfomance, "day": response.rows.item(i).day, "night": response.rows.item(i).night, "form": response.rows.item(i).form});
          }

          return Promise.resolve( setts );
      })
  }

  insertDutyCycleData(sett: any){
    let sql = 'INSERT INTO VLTDutyCycle(num, time, perfomance, day, night, form) VALUES(?,?,?,?,?,?)';
    return this.db.executeSql(sql, [sett.num, sett.time, sett.perfomance, sett.day, sett.night, sett.form]);
  }

  deleteDutyCycleData(sett: any){
    let sql = 'DELETE FROM VLTDutyCycle WHERE id=?';
    return this.db.executeSql(sql, [sett.id]);
  }

  updateDutyNum(form: string)
  {
      let sql = 'UPDATE VLTDutyCycle SET num = (SELECT count(*) FROM VLTDutyCycle AS my WHERE my.id<=VLTDutyCycle.id and my.form=?) WHERE form=?';
      return this.db.executeSql(sql, [form, form]);
  }

  deleteVLTSettingsData(){
    let sql = 'DELETE FROM VLTSettings';
    return this.db.executeSql(sql, []);
  }

  deleteVLTConstantData(){
    let sql = 'DELETE FROM VLTConstant';
    return this.db.executeSql(sql, []);
  }

  deleteVLTCalculateSettingsData(){
    let sql = 'DELETE FROM VLTCalculateSettings';
    return this.db.executeSql(sql, []);
  }

  deleteVLTDutyCycleSettingsData(){
    let sql = 'DELETE FROM VLTDutyCycleSettings';
    return this.db.executeSql(sql, []);
  }

 deleteVLTDutyCycleData(){
    let sql = 'DELETE FROM VLTDutyCycle';
    return this.db.executeSql(sql, []);
  }

  update(sett: any){
    let sql = 'UPDATE VLTSettings SET value=? WHERE key=?';
    return this.db.executeSql(sql, [sett.value, sett.key]);
  }

  dropAllTables(){
    return this.db.executeSql("DROP TABLE IF EXISTS VLTSettings;", [])
      .then(()=>{
        this.db.executeSql("DROP TABLE IF EXISTS VLTConstant;", []); 
      }).then(()=>{
        this.db.executeSql("DROP TABLE IF EXISTS VLTCalculateSettings;", []); 
      }).then(()=>{
        this.db.executeSql("DROP TABLE IF EXISTS VLTCalculateData;", []); 
      }).then(()=>{
        this.db.executeSql("DROP TABLE IF EXISTS VLTDutyCycleSettings;", []); 
      }).then(()=>{
        this.db.executeSql("DROP TABLE IF EXISTS VLTDutyCycle;", []); 
      });
  }
  
  // more code here
}