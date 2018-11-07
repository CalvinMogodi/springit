import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public afAuth: AngularFireAuth) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {

    if (this.user.email != "" && this.user.password != "") {
      this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password).then((newUser) => {
        if (newUser) {
          this.storage.set('userLogin', true);
          this.storage.set('userId', newUser.user.uid);
          this.navCtrl.setRoot(HomePage);
        } else {
          this.storage.set('userLogin', false);
        }
      });
    }
  }

}
