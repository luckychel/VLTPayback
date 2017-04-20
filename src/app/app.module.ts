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

import { CalculatePage } from '../pages/calculate/calculate';


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

    CalculatePage,

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

    CalculatePage
  ],
  providers: [ 
    StatusBar,
    SplashScreen,
    EmailComposer, {provide: ErrorHandler, useClass: IonicErrorHandler}, SettingsService]
})
export class AppModule {}
