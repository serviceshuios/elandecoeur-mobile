import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { c } from '@angular/core/src/render3';
/*
  Generated class for the ServicewebProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicewebProvider {
 loading: any
// url: string="http://192.168.0.102/elandecoeur/public/api/"
 url: string="http://603ddf18.ngrok.io/elandecoeur/public/api/"

 
  constructor( public loadingCtrl: LoadingController, public HTTP: HTTP) {
    console.log('Hello ServicewebProvider Provider');
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
    });
  
    this.loading.present();
  }

  async conversion(devise : string , montant : number){
    await this.presentLoadingDefault()
  }

  async login(username: string, password: string)
  {
    this.presentLoadingDefault()
    let e = await this.HTTP.post(this.url+"connexion",{"email":username,"password":password},{}).then(data =>{
      this.loading.dismiss();
      //console.log(data)
      return data;
    }).catch((error)=>{
      
      //console.log(error)
      this.loading.dismiss();
      return error;
    })

    //console.log(e);

    return e;
  }

  async register(user)
  {
    this.presentLoadingDefault()
    let e = await this.HTTP.post(this.url+"inscription",user,{}).then(data =>{
      this.loading.dismiss();
      return data;
    }).catch((error)=>{
      this.loading.dismiss();
      return error;
    })
    return e;
  }
  async forgotpassword(email)
  {
    this.presentLoadingDefault()
    let e = await this.HTTP.post(this.url+"forgotpassword",{"email":email},{}).then(data =>{
      this.loading.dismiss();
      return data;
    }).catch((error)=>{
      this.loading.dismiss();
      return error;
    })
    return e;
  }  

  async demandeaccueil()
  {
    this.presentLoadingDefault()
    let e = await this.HTTP.get(this.url+"demandes",{},{}).then(data =>{
      this.loading.dismiss();
      return data;
    }).catch((error)=>{
      this.loading.dismiss();
      return error;
    })
    return e;
  }  

  async convertdevise(montant, devise)
  {
    this.presentLoadingDefault()
    let e = await this.HTTP.post(this.url+"convertXafToEuro",{"montant":montant,"devise":devise},{}).then(data =>{
      this.loading.dismiss();
      return data;
    }).catch((error)=>{
      this.loading.dismiss();
      return error;
    })
    return e;
  }  

  async confirmdonation(montant, moyenpaiement, idtransaction, anonyme, demande, utilisateur)
  {
    this.presentLoadingDefault()
    let e = await this.HTTP.post(this.url+"donation",{"montant":montant,"moyenDePaiement":moyenpaiement,"detailsDeLaTransaction":idtransaction,"anonyme":anonyme,"demande":demande,"utilisateur":utilisateur},{}).then(data =>{
      this.loading.dismiss();
      return data;
    }).catch((error)=>{
      this.loading.dismiss();
      return error;
    })
    return e;
  }  

  async demandebyuser(utilisateur)
  {
    console.log(utilisateur);

    this.presentLoadingDefault()
    let e = await this.HTTP.post(this.url+"demandesUtilisateur",{"user": utilisateur},{}).then(data =>{
      this.loading.dismiss();
      return data;
    }).catch((error)=>{
      this.loading.dismiss();
      return error;
    })
    return e;
  }  

  async demandebycategorie(id)
  {
    console.log(id);
    this.presentLoadingDefault()
    let e = await this.HTTP.post(this.url+"demandesCategorie",{"categorie":id},{}).then(data =>{
      this.loading.dismiss();
      return data;
    }).catch((error)=>{
      this.loading.dismiss();
      return error;
    })
    return e;
  }
}
