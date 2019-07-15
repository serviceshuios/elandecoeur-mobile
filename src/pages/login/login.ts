import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import {ServicewebProvider} from '../../providers/serviceweb/serviceweb';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username:string=""
  password:string=""
  erreur:string=""
  constructor(private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams, public serviceweb :ServicewebProvider,public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async gotoHome(){
    this.erreur=""
    await this.serviceweb.login(this.username,this.password).then((e)=>{
      console.log(e);
      if(e.status == 500){
        this.erreur = JSON.parse(e.error).message
        return 0;
      }

      if(e.status == 200){
        var user = JSON.parse(e.data);

        this.storage.set('user',user).then((e)=>{
          this.navCtrl.setRoot(HomePage);
        })
        return 0;
      }

    })
  }

  gotoInscription(){
    this.navCtrl.push(RegisterPage);
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Mot de passe oublié',
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            if (data.email) {
              // logged in!
              this.serviceweb.forgotpassword(data.email)
            } else {
              // invalid login
              return false;
            }
          }
        }
      ]
    });

    alert.present();
    
   
  }

}
