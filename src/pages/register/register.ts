import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {ServicewebProvider} from '../../providers/serviceweb/serviceweb';
import { LoginPage } from '../login/login';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  login: FormGroup;
  submitted: boolean = false;
  verif: boolean = false;
  loader:any;
  
  constructor(private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public serviceweb :ServicewebProvider) {
    this.login = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required],
      username: ['', Validators.compose([Validators.required])],
      
      adresse: ['', Validators.compose([Validators.required])],
      numeroCni: ['', Validators.compose([Validators.required])],
      lieuDelivranceCni: ['', Validators.compose([Validators.required])],
      dateExpirattionCni: ['', Validators.compose([Validators.required])],
      sexe: ['', Validators.compose([Validators.required])],

      verification: ['', Validators.compose([Validators.required])],
      telephone: ['', Validators.compose([Validators.max(1000000000),Validators.required])],
      nom: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'),Validators.required])],
    });
  }


  inscription(){
    this.submitted = true;
    console.log(this.login.value)
    if (this.login.valid) {
      if(this.login.value.verification === this.login.value.password ){
          this.verif = false;
          this.serviceweb.register(this.login.value).then((data)=>{
            if(data.status == 500){
              console.error(JSON.parse(data.error));
              
              this.presentAlert(2,JSON.parse(data.error).message)
            }
            if(data.status == 200){
              this.presentAlert(3,data)
            }
            
          }).catch((error)=>{
            console.error(error);
            
          })
      }else{
        console.log("pb de verif")
        this.verif = true;
      }
    }
  }

  presentAlert(id, message) {
    if(id == 1){

    let alert = this.alertCtrl.create({
      title: 'ERREUR',
      subTitle: "Pas d'accès a internet",
      buttons: [{
        cssClass:"btn-elephant",
        text: 'fermer',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });

    alert.present();
    }
    if(id == 2){

      let alert = this.alertCtrl.create({
        title: 'ERREUR',
        subTitle: message,
        buttons: [{
          cssClass:"btn-elephant",
          text: 'fermer',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });

      alert.present();
      }

      if(id == 3){

        let alert = this.alertCtrl.create({
          title: 'FELICITATION',
          subTitle: "Inscription réussi !",
          buttons: [{
            cssClass:"btn-elephant",
            text: 'fermer',
            role: 'cancel',
            handler: () => {
              this.navCtrl.setRoot(LoginPage);
            }
          }]
        });
        alert.present();
        } 
  }

}
