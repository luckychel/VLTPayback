import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { SettingPage } from '../pages/setting/setting';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { DutycyclePage } from '../pages/dutycycle/dutycycle';
import { LicensePage } from '../pages/license/license';
import { ResultPage } from '../pages/result/result';

import { WwandwPage } from '../pages/wwandw/wwandw';
import { AirPage } from '../pages/air/air';
import { TechPage } from '../pages/tech/tech';
import { ForcePage } from '../pages/force/force';
import { VavPage } from '../pages/vav/vav';
import { ParkPage } from '../pages/park/park';
import { ScrewPage } from '../pages/screw/screw';

import { SettingsService } from '../services/settings-service';
import { MathcesCategoryPipe } from '../pipes/mathces-category-pipe';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EmailComposer } from '@ionic-native/email-composer';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    SettingPage,
    HomePage,
    TabsPage,

    DutycyclePage,
    LicensePage,
    ResultPage,

    WwandwPage,
    AirPage,
    TechPage,
    ForcePage,
    VavPage,
    ParkPage,
    ScrewPage,

    MathcesCategoryPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    SettingPage,
    HomePage,
    TabsPage,
    
    DutycyclePage,
    LicensePage,
    ResultPage,

    WwandwPage,
    AirPage,
    TechPage,
    ForcePage,
    VavPage,
    ParkPage,
    ScrewPage
  ],
  providers: [ 
    StatusBar,
    SplashScreen,
    EmailComposer, {provide: ErrorHandler, useClass: IonicErrorHandler}, SettingsService]
})
export class AppModule {}
