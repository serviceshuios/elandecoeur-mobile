import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServicewebProvider } from '../../providers/serviceweb/serviceweb';
import { FairedonPage } from '../fairedon/fairedon';

/**
 * Generated class for the OperationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-operation',
  templateUrl: 'operation.html',
})
export class OperationPage {
  demandes: any;

  constructor( public serviceweb :ServicewebProvider,public navCtrl: NavController) {

    this.demandes = [];
  }

  ionViewDidLoad() {
    this.serviceweb.demandebycategorie(3).then((data)=>{
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
