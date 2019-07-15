import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { DemandePage } from '../pages/demande/demande';
import { UrgencePage } from '../pages/urgence/urgence';
import { OperationPage } from '../pages/operation/operation';
import { PatientPage } from '../pages/patient/patient';
import { DetailPage } from '../pages/detail/detail';
import { FairedonPage } from '../pages/fairedon/fairedon';
import { Storage } from '@ionic/storage';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any ;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public storage: Storage) {
    this.initializeApp();

    // used for an example of ngFor and navigation

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.storage.get("user").then((user)=>{
        if(user){
          this.rootPage = HomePage;
        }
        else{
          this.rootPage = LoginPage;
        }
        
      }).then(()=>this.splashScreen.hide())
      
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page=='accueil'){
      this.nav.setRoot(HomePage);

    }
    if(page=='demande'){
      this.nav.setRoot(DemandePage);

    }
    if(page=='urgence'){
      this.nav.setRoot(UrgencePage);

    }
    if(page=='operation'){
      this.nav.setRoot(OperationPage);

    }
    if(page=='patient'){
      this.nav.setRoot(PatientPage);

    }
    if(page=='deconnexion'){
      this.storage.clear().then(()=>this.nav.setRoot(LoginPage))
    }
  }
}
