import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServicewebProvider } from '../../providers/serviceweb/serviceweb';
import { FairedonPage } from '../fairedon/fairedon';

/**
 * Generated class for the UrgencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-urgence',
  templateUrl: 'urgence.html',
})
export class UrgencePage {
  demandes: any;

  constructor( public serviceweb :ServicewebProvider,public navCtrl: NavController) {

    this.demandes = [];
  }

  ionViewDidLoad() {
    this.serviceweb.demandebycategorie(1).then((data)=>{
      if(data.status == 200){
        this.demandes = JSON.parse(data.data);
        console.log(this.demandes);
        
      }
      console.log(data)
      
    })
  }
  

  payment(demande){
    this.navCtrl.push(FairedonPage,{"demande":demande});
    
  }
}
