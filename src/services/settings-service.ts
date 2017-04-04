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

        //закомментировать перед публикацией
        return this.dropAllTables();

        /*this.deleteVLTSettingsData();
        this.deleteVLTConstantData();
        this.deleteVLTWWWSettingsData();
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

      let table = this.db.executeSql("CREATE TABLE IF NOT EXISTS VLTWWWSettings(id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT,  txt TEXT, value TEXT, unit TEXT, lang TEXT)", []);
      return Promise.all([table]);

    }).then(() => {

        return this.db.executeSql('SELECT * FROM VLTWWWSettings', []);
    }
  ).then((res)=>{
      if(res.rows.length == 0) {
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt, value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['titleWWW', 'Водоканал','', '', 'ru']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['titleWWW', 'WW&W', '', '', 'en']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt, value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['headerWWWInput', 'Параметры настройки','', '', 'ru']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['headerWWWInput', 'Parameter settings', '', '', 'en']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt, value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['headerWWWResult', 'Результаты','', '', 'ru']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['headerWWWResult', 'Results', '', '', 'en']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt, value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['MotorTitle', 'Двигатель / Характеристики','', '', 'ru']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['MotorTitle', 'Motor / Drive Data', '', '', 'en']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt, value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['OperationTitle', 'Оперативные данные','', '', 'ru']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['OperationTitle', 'Operation', '', '', 'en']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt, value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['CommertialTitle', 'Коммерческие данные','', '', 'ru']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['CommertialTitle', 'Commertial', '', '', 'en']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt, value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['MotorEff', 'КПД двигателя','', '', 'ru']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['MotorEff', 'Motor efficiency', '', '', 'en']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt, value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['MotorPow', 'Мощность двигателя','', '', 'ru']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['MotorPow', 'Motor power', '', '', 'en']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt, value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['MotorAver', 'Среднее кол-во часов работы','', '', 'ru']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['MotorAver', 'Average work time', '', '', 'en']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt, value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['EnergPrice', 'Цена электроэнерги за кВтч с НДС, руб.','', '', 'ru']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['EnergPrice', 'Energy price with VAT', '', '', 'en']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt, value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['CoursePrice', 'Курс евро, руб.','', '', 'ru']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['CoursePrice', 'Rate from 1 euro', '', '', 'en']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt, value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['DutyCycle', 'Профиль нагрузки','', '', 'ru']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['DutyCycle', 'Duty cycle', '', '', 'en']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt, value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['PumpEff', 'КПД насоса, %','', '', 'ru']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['PumpEff', 'Pump efficiency', '', '', 'en']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt, value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['NeedPress', 'Требуемый напор, м','', '', 'ru']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['NeedPress', 'Needed pressure, m', '', '', 'en']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt, value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['PressBefore', 'Напор на всасе насоса, м','', '', 'ru']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['PressBefore', 'Pressure before pump, m', '', '', 'en']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt, value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['NominalFlow', 'Номинальное значение подачи, м3/ч','', '', 'ru']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['NominalFlow', 'Nominal water flow, m3/h', '', '', 'en']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt, value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['MaxPress', 'Макс. давление, м3/ч','', '', 'ru']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['MaxPress', 'Max. pressure, m3/h', '', '', 'en']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt, value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['MinFlow', 'Мин. подача, м','', '', 'ru']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['MinFlow', 'Min. flow, m', '', '', 'en']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt, value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['MinPress', 'Мин. давление, м3/ч','', '', 'ru']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['MinPress', 'Min. pressure, m3/h', '', '', 'en']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt, value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['MaxFlow', 'Макс. подача, м','', '', 'ru']);
            this.db.executeSql("INSERT INTO VLTWWWSettings (key, txt,  value, unit, lang) VALUES (?, ?, ?, ?, ?)", ['MaxFlow', 'Max. flow, m', '', '', 'en']);
 
            return Promise.all([]);
        }
  }).then(() => {

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
            this.db.executeSql("INSERT INTO VLTDutyCycleSettings (key, value, lang) VALUES (?, ?, ?)", ['Num', 'No.', 'en']);
            this.db.executeSql("INSERT INTO VLTDutyCycleSettings (key, value, lang) VALUES (?, ?, ?)", ['Time', 'Время (%)', 'ru']);
            this.db.executeSql("INSERT INTO VLTDutyCycleSettings (key, value, lang) VALUES (?, ?, ?)", ['Time', 'Time(%)', 'en']);
            this.db.executeSql("INSERT INTO VLTDutyCycleSettings (key, value, lang) VALUES (?, ?, ?)", ['Perf', 'Нагрузка (%)', 'ru']);
            this.db.executeSql("INSERT INTO VLTDutyCycleSettings (key, value, lang) VALUES (?, ?, ?)", ['Perf', 'Perf(%)', 'en']);
     /*       this.db.executeSql("INSERT INTO VLTDutyCycleSettings (key, value, lang) VALUES (?, ?, ?)", ['Add', 'Добавить строку', 'ru']);
            this.db.executeSql("INSERT INTO VLTDutyCycleSettings (key, value, lang) VALUES (?, ?, ?)", ['Add', 'Add row', 'en']);
            this.db.executeSql("INSERT INTO VLTDutyCycleSettings (key, value, lang) VALUES (?, ?, ?)", ['Clear', 'Очистить таблицу', 'ru']);
            this.db.executeSql("INSERT INTO VLTDutyCycleSettings (key, value, lang) VALUES (?, ?, ?)", ['Clear', 'Clear table', 'en']);
            this.db.executeSql("INSERT INTO VLTDutyCycleSettings (key, value, lang) VALUES (?, ?, ?)", ['Save', 'Сохранить', 'ru']);
            this.db.executeSql("INSERT INTO VLTDutyCycleSettings (key, value, lang) VALUES (?, ?, ?)", ['Save', 'Save', 'en']);
            this.db.executeSql("INSERT INTO VLTDutyCycleSettings (key, value, lang) VALUES (?, ?, ?)", ['Cancel', 'Отмена', 'ru']);
            this.db.executeSql("INSERT INTO VLTDutyCycleSettings (key, value, lang) VALUES (?, ?, ?)", ['Cancel', 'Cancel', 'en']);*/
            return Promise.all([]);
        }
  }).then(() => {

      let table = this.db.executeSql("CREATE TABLE IF NOT EXISTS VLTDutyCycle(id INTEGER PRIMARY KEY AUTOINCREMENT, num TEXT, time TEXT, perfomance TEXT, form TEXT)", []);
      return Promise.all([table]);

    }).then(() => {

        return this.db.executeSql('SELECT * FROM VLTDutyCycle', []);
    }
    ).then((res)=>{
      if(res.rows.length == 0) {
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['1', '25', '50', 'www']); 
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['2', '13', '60', 'www']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['3', '46', '80', 'www']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['4', '16', '100', 'www']);

            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['1', '25', '50', 'air']); 
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['2', '13', '60', 'air']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['3', '46', '80', 'air']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['4', '16', '100', 'air']);

            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['1', '25', '50', 'tech']); 
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['2', '13', '60', 'tech']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['3', '46', '80', 'tech']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['4', '16', '100', 'tech']);

            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['1', '25', '50', 'force']); 
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['2', '13', '60', 'force']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['3', '46', '80', 'force']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['4', '16', '100', 'force']);

            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['1', '25', '50', 'vav']); 
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['2', '13', '60', 'vav']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['3', '46', '80', 'vav']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['4', '16', '100', 'vav']);

            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['1', '25', '50', 'park']); 
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['2', '13', '60', 'park']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['3', '46', '80', 'park']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['4', '16', '100', 'park']);

            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['1', '25', '50', 'screw']); 
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['2', '13', '60', 'screw']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['3', '46', '80', 'screw']);
            this.db.executeSql("INSERT INTO VLTDutyCycle (num, time, perfomance, form) VALUES (?, ?, ?, ?)", ['4', '16', '100', 'screw']);
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

  getWWWData(lang){

    return this.db.executeSql('SELECT * FROM VLTWWWSettings WHERE lang=?', [lang])
      .then(response => {
          let setts = {};

          for (let i = 0; i < response.rows.length; i++) {
            setts[response.rows.item(i).key] = { "txt": response.rows.item(i).txt, "value": response.rows.item(i).value, "unit": response.rows.item(i).unit};
          }

          return Promise.resolve( setts );
      })
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
            setts.push({"id": response.rows.item(i).id, "num": response.rows.item(i).num, "time": response.rows.item(i).time, "perfomance": response.rows.item(i).perfomance, "form": response.rows.item(i).form});
          }

          return Promise.resolve( setts );
      })
  }

  insertDutyCycleData(sett: any){
    let sql = 'INSERT INTO VLTDutyCycle(num, time, perfomance, form) VALUES(?,?,?,?)';
    return this.db.executeSql(sql, [sett.num, sett.time, sett.perfomance, sett.form]);
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

  deleteVLTWWWSettingsData(){
    let sql = 'DELETE FROM VLTWWWSettings';
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
    this.db.executeSql("DELETE FROM VLTSettings;", []);
    this.db.executeSql("DROP TABLE IF EXISTS VLTSettings;", []); 
    this.db.executeSql("DELETE FROM VLTConstant;", []);
    this.db.executeSql("DROP TABLE IF EXISTS VLTConstant;", []); 
    this.db.executeSql("DELETE FROM VLTWWWSettings;", []);
    this.db.executeSql("DROP TABLE IF EXISTS VLTWWWSettings;", []); 
    this.db.executeSql("DELETE FROM VLTDutyCycleSettings;", []);
    this.db.executeSql("DROP TABLE IF EXISTS VLTDutyCycleSettings;", []); 
    this.db.executeSql("DELETE FROM VLTDutyCycle;", []);
    this.db.executeSql("DROP TABLE IF EXISTS VLTDutyCycle;", []); 
    return true;
  }
  
  // more code here
}