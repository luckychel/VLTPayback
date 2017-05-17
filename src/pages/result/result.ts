import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';

@Component({
  selector: 'page-result',
  templateUrl: 'result.html'
})
export class ResultPage {
  
  lang = "";  form = ""; formName = "";
  results: any = {};
  seasons: any = [];

  @ViewChild("ResTitle", {read: ElementRef }) ResTitle;
  @ViewChild("Res1", {read: ElementRef }) Res1;
  @ViewChild("Res2", {read: ElementRef }) Res2;
  @ViewChild("Res3", {read: ElementRef }) Res3;
  @ViewChild("Res4", {read: ElementRef }) Res4;
  @ViewChild("Res5", {read: ElementRef }) Res5;
  @ViewChild("Res6", {read: ElementRef }) Res6;
  @ViewChild("Res7", {read: ElementRef }) Res7;

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
      subject: 'ТЭО калькулятор',
      body: this.getBodyHtml(),
      isHtml: true
    };
    this.emailComposer.open(email);
  }

  getBodyHtml(){
    let html = "";//this.element.nativeElement.innerHTML;
    html = "<div>" + this.ResTitle.nativeElement.innerHTML + "</div>";
    html += "<div>" + this.Res1.nativeElement.innerText + "</div>";
    html += "<div>" + this.Res2.nativeElement.innerText + "</div>";
    html += "<div>" + this.Res3.nativeElement.innerText + "</div>";
    html += "<div>" + this.Res4.nativeElement.innerText + "</div>";
    html += "<div>" + this.Res5.nativeElement.innerText + "</div>";
    html += "<div>" + this.Res6.nativeElement.innerText + "</div>";
    html += "<div>" + this.Res7.nativeElement.innerText + "</div>";
    return html;
  }

  close() {
   this.viewCtrl.dismiss();
  }

  getSeason(id){
    return this.seasons[id];
  }
}
