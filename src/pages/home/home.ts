import { Component} from '@angular/core';
import { NavController, Platform ,ToastController } from 'ionic-angular';
import { SelectcarPage } from '../selectcar/selectcar'
import { LoginPage } from '../login/login'
import { SignupPage } from '../signup/signup'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private toast = null; 
  public hidelogins = false;

  constructor(private storage: Storage,public navCtrl: NavController, public platform: Platform,  public toastCtrl: ToastController) {
    if (this.platform.ready) {
      // the app is in PWA mode, we proceed to detect device and browser support:
      let userAgent = navigator.userAgent;
      let isandroid = this.platform.is('android');
      let isios = this.platform.is('ios');

      if (!isandroid && !isios) {
        window.location.href = 'http://springitapp.com';
      }
    }
    storage.get('userLogin').then((val) => {
      if(val){
        this.hidelogins = true;
      }
    });
  }

  presentToast(message, position, cssclass) {
    // prevent toasts from "stacking":
    if (this.toast) {
        this.toast.dismiss();
        this.toast = null;
    }
    // create a toast:
    this.toast = this.toastCtrl.create({
        message: message,
        closeButtonText: "OK",
        showCloseButton: true,
        cssClass: cssclass,
        position: position,
    });
    this.toast.present();
}

  requst(){
    this.navCtrl.setRoot(SelectcarPage);
  }

  register(){
    this.navCtrl.setRoot(SignupPage);
  }

  login(){
    this.navCtrl.setRoot(LoginPage);
  }

}
