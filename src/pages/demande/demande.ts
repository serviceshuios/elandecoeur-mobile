import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServicewebProvider } from '../../providers/serviceweb/serviceweb';
import { Storage } from '@ionic/storage';
import { FairedonPage } from '../fairedon/fairedon';

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
    cotisation: number;
  constructor(public serviceweb :ServicewebProvider, public navCtrl: NavController, public navParams: NavParams,public storage: Storage) {
    this.demandes = [];
  }
  ionViewWillLoad() {
    this.storage.get('user').then((e)=>{
      this.serviceweb.demandebyuser(e.id).then((data)=>{
        //console.log('++++++++++++++++++++++++++++++');
        //console.log(data);
        //console.log('++++++++++++++++++++++++++++++');
        if(data.status == 200){
          this.demandes = JSON.parse(data.data);

         for(let i=1; i<this.demandes.length;i++){
            //this.demandes[i].montantRecu =
              this.serviceweb.getCotisations(this.demandes[i-1].id).then((lesDatas)=>{

                this.cotisation = JSON.parse(lesDatas.data);
                this.demandes[i-1].montantRecu = JSON.parse(lesDatas.data);
                //console.log('cotisation='+this.cotisation);

            });
          }

          console.log(this.demandes);

        }

      })
    })
  }

  payment(demande){
    this.navCtrl.push(FairedonPage,{"demande":demande});
  }

}
