import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SelectcarPage } from '../selectcar/selectcar'
import { LoginPage } from '../login/login'
import { SignupPage } from '../signup/signup'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  requst(){
    this.navCtrl.setRoot(SelectcarPage);
  }

  register(){
    this.navCtrl.setRoot(SignupPage);
  }

  login(){
    this.navCtrl.push(LoginPage);
  }

}
