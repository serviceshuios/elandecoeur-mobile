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
  id: number;
  cotisation: number;

  // constructor --> ionViewDidLoad --> ionViewWillEnter --> ionViewDidEnter --> ionViewWillLeave --> ionViewDidLeave --> ionViewWillUnload.
  constructor( public serviceweb :ServicewebProvider,public navCtrl: NavController) {

    this.demandes = [];
  }


  recuperationDemandes() {

    this.serviceweb.demandeaccueil().then((data)=>{
      if(data.status == 200){
        this.demandes = JSON.parse(data.data);

        console.log('===========================');
        console.log(this.demandes);
        console.log('===========================');
      }

    })

    //
    for(let i=1; i<this.demandes.length;i++){
       //this.demandes[i].montantRecu =
         this.serviceweb.getCotisations(this.demandes[i-1].id).then((lesDatas)=>{

           this.cotisation = JSON.parse(lesDatas.data);
           this.demandes[i-1].montantRecu = JSON.parse(lesDatas.data);
           //console.log('cotisation='+this.cotisation);

       });
     }
     
  }

  //cette méthode s'execute une seule fois à l'initialisation de la page
 ngOnInit() { 
  //this.recuperationDemandes();
}

// cette méthode s'execute à chaque chargement de la page
 ionViewWillEnter() {
    console.log("WILL ENTER");
  }

ionViewWillLoad() {
   console.log("WILL LOAD");
   this.recuperationDemandes();
}
  payment(demande){
    this.navCtrl.push(FairedonPage,{"demande":demande});

  }

  check(){
    console.log("test")
  }

}
