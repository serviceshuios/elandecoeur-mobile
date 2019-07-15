import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServicewebProvider } from '../../providers/serviceweb/serviceweb';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the DemandePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-demande',
  templateUrl: 'demande.html',
})
export class DemandePage {
  demandes: any;
  constructor(public serviceweb :ServicewebProvider, public navCtrl: NavController, public navParams: NavParams,public storage: Storage) {
    this.demandes = [];
  }
  ionViewDidLoad() {
    this.storage.get('user').then((e)=>{
      this.serviceweb.demandebyuser(e.id).then((data)=>{
        console.log(data)
        if(data.status == 200){
          this.demandes = JSON.parse(data.data);
          console.log(this.demandes);
          
        }
        
      })
    })


  }

}
