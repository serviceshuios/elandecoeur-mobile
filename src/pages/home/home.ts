import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { FairedonPage } from '../fairedon/fairedon';
import { ServicewebProvider } from '../../providers/serviceweb/serviceweb';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  demandes: any;

  constructor( public serviceweb :ServicewebProvider,public navCtrl: NavController) {

    this.demandes = [];
  }

  ionViewDidLoad() {
    this.serviceweb.demandeaccueil().then((data)=>{
      if(data.status == 200){
        this.demandes = JSON.parse(data.data);
        console.log(this.demandes);
        
      }
      
    })
  }
  

  payment(demande){
    this.navCtrl.push(FairedonPage,{"demande":demande});
    
  }

  check(){
    console.log("test")
  }

}
