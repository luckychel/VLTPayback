import { Component, ViewChild, ElementRef } from '@angular/core';
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
  
  lang = "";  form = ""; formName = "";
  results: any = {};
  seasons: any = [];

  @ViewChild("ResTitle", {read: ElementRef }) ResTitle;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public emailComposer: EmailComposer,
    public element: ElementRef) {

    this.lang = this.navParams.get("lang");
    this.form = this.navParams.get("form");
    this.formName = this.navParams.get("formName");
    this.results = this.navParams.get("results");

    this.seasons.push(this.lang === "en" ? "Winter" : "Зима");
    this.seasons.push(this.lang === "en" ? "Spring" : "Весна");
    this.seasons.push(this.lang === "en" ? "Summer" : "Лето");
    this.seasons.push(this.lang === "en" ? "Autumn" : "Осень");
  }
  
  ngAfterViewInit(){

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
      body: this.getBodyHtml(),
      isHtml: true
    };
    this.emailComposer.open(email);
  }

  getBodyHtml(){
    let html = "";//this.element.nativeElement.innerHTML;
    //title
    html = this.ResTitle.nativeElement.innerHTML;
    
    return html;
  }

  close() {
   this.viewCtrl.dismiss();
  }

  getSeason(id){
    return this.seasons[id];
  }
}
