import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {LoginPage} from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { DemandePage } from '../pages/demande/demande';
import { PatientPage } from '../pages/patient/patient';
import { DetailPage } from '../pages/detail/detail';
import { ProfilPage } from '../pages/profil/profil';
import { UrgencePage } from '../pages/urgence/urgence';
import { OperationPage } from '../pages/operation/operation';
import { FairedonPage } from '../pages/fairedon/fairedon';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { PayPal } from '@ionic-native/paypal';
import { ServicewebProvider } from '../providers/serviceweb/serviceweb';
import { HTTP } from '@ionic-native/http';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    DemandePage,
    PatientPage,
    DetailPage,
    ProfilPage,
    UrgencePage,
    OperationPage,
    FairedonPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      responsive: true,
      titleFontSize: '50',
      showUnits:false,
      showSubtitle: false
      
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    DemandePage,
    PatientPage,
    DetailPage,
    ProfilPage,
    UrgencePage,
    OperationPage,
    FairedonPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PayPal,
    ServicewebProvider,
    HTTP
    
  ]
})
export class AppModule {}
