import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { preserveWhitespacesDefault } from '@angular/compiler';
import { ServicewebProvider } from '../../providers/serviceweb/serviceweb';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

/**
 * Generated class for the FairedonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-fairedon',
  templateUrl: 'fairedon.html',
})
export class FairedonPage {

  montant :string= "0";
  devise : string="XAF";
  demande:any;
  anonyme:boolean= true ;
  constructor(public storage: Storage, public navCtrl: NavController, public navParams: NavParams, public payPal: PayPal, public loadingCtrl: LoadingController, public serviceweb: ServicewebProvider) {

    this.demande = navParams.get('demande')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FairedonPage');
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);
  }

  async payment(){

    this.serviceweb.convertdevise(this.montant,this.devise).then((data)=>{
      var result : string;
      if(data.status == 200){
        console.log(data);

        result = JSON.parse(data.data)
        console.log(result);
      }
      if(data.status != 200){
        console.log(data)
        return 0;
      }
      if(parseInt(this.montant) > 0){
        this.payPal.init({
          PayPalEnvironmentProduction: 'EH3OtBmYxXmj-Qjzb56FLPcGKFCALiiN1ScSxpgAi5ymRDJ6RdKKwxm3zalYVtRpOLWBpameBh50ywbx',
          PayPalEnvironmentSandbox: 'EJc4FLGflHIJjRWdpOUQ7oF5Y5LKuB_iS_HtKMomZMt3DEyWneb9uVkZswKTDRNC83ag9gAf4ES8nfVf'
        }).then(() => {
          // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
          this.payPal.prepareToRender('PayPalEnvironmentNoNetwork', new PayPalConfiguration({
            // Only needed if you get an "Internal Service Error" after PayPal login!
            //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
          })).then(() => {
          if(this.devise == "XAF"){
            this.devise = "EUR"
          }

            let payment = new PayPalPayment( result, this.devise, 'Description', 'sale');
            this.payPal.renderSinglePaymentUI(payment).then((data) => {
              // Successfully paid
              this.storage.get('user').then((user)=>{
                var an = "oui"
                if(!this.anonyme){
                  an = "non"
                }
                this.serviceweb.confirmdonation(result,"PAYPAL",data.response.id,an,this.demande.id,user.id).then((response)=>{
                  console.log(response)
                  if(response.status == 200){
                    this.navCtrl.setRoot(HomePage);
                  }
                })
              })

              console.log(data)

            }, () => {
              // Error or render dialog closed without being successful
              console.log("erreur 1")
            });
          }, () => {
            // Error in configuration
            console.log("erreur 2")

          });
        }, () => {
          // Error in initialization, maybe PayPal isn't supported or something else
          console.log("erreur 3")

        });
      }

    })

}




  test(){
    console.log(this.montant);
  }
}
