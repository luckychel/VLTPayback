import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';

/*
  Generated class for the Result page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-result',
  templateUrl: 'result.html'
})
export class ResultPage {
  
  lang = "";
  form = "";
  results: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public emailComposer: EmailComposer) {

     this.lang = this.navParams.get("lang");
     this.form = this.navParams.get("form");
     this.results = this.navParams.get("results");

  }
  
  sendEmail(){
    let email = {
      to: 'mc@danfoss.ru',
      cc: 'fedotov@danfoss.com',
   /*   bcc: ['john@doe.com', 'jane@doe.com'],*/
    /*  attachments: [
        'file://img/logo.png',
        'res://icon.png',
        'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
        'file://README.pdf'
      ],*/
      subject: 'ТЭО калькулятор',
      body: '',
      isHtml: true
    };
    this.emailComposer.open(email);
  }

  close() {
   this.viewCtrl.dismiss();
  }
}
