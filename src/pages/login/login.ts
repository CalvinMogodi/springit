import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public user = {
    email: '',
    password: '',
  };
  public showError = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public afAuth: AngularFireAuth, public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.showError = false;
    if (this.user.email != "" && this.user.password != "") {
      var loader = this.loadingCtrl.create({
        content: "Please wait..."
    });

    loader.present();
      this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password).then((newUser) => {
        loader.dismiss();
        if (newUser) {
          this.storage.set('userLogin', true);
          this.storage.set('userId', newUser.user.uid);
          window.location.reload();
          this.navCtrl.setRoot(HomePage);
          this.showError = false;
        } else {
          this.storage.set('userLogin', false);
          this.showError = true;
        }
      }).catch(error => {
        loader.dismiss();
        this.storage.set('userLogin', false);
        this.showError = true;        
      });
    }
  }

}
