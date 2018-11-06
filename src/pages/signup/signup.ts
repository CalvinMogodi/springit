import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public user = {
    name: '',
    surname: '',
    address: '',
    email: '',
    phonenumber: '',
    password: '',
    confirmPassword: '',
  }
  public passwordNotMatch = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, public afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup() {
    this.passwordNotMatch = false;
    if (this.user.password != this.user.confirmPassword) {
      this.passwordNotMatch = true;
      return;
    }
    if (this.user.name != "" && this.user.surname != "" && this.user.address != "" && this.user.email != "" && this.user.phonenumber != "" && this.user.password != "") {
      this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password).then((newUser) => {
        const newId = this.db.list('/users').push(this.user);
        this.navCtrl.setRoot(HomePage);
        this.user.password = '';
        this.user.confirmPassword = '';
        this.db.list('users').set(newUser.user.uid, this.user);
      });
    }
  }

}
