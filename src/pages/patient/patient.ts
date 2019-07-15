import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServicewebProvider } from '../../providers/serviceweb/serviceweb';
import { FairedonPage } from '../fairedon/fairedon';

/**
 * Generated class for the PatientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-patient',
  templateUrl: 'patient.html',
})
export class PatientPage {
  demandes: any;

  constructor( public serviceweb :ServicewebProvider,public navCtrl: NavController) {

    this.demandes = [];
  }

  ionViewDidLoad() {
    this.serviceweb.demandebycategorie(2).then((data)=>{
      if(data.status == 200){
        this.demandes = JSON.parse(data.data);
        console.log(this.demandes);
        
      }
      
    })
  }
  

  payment(demande){
    this.navCtrl.push(FairedonPage,{"demande":demande});
    
  }

}
