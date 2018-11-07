import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SelectcarPage } from '../selectcar/selectcar'
import { LoginPage } from '../login/login'
import { SignupPage } from '../signup/signup'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public hidelogins = false;

  constructor(private storage: Storage,public navCtrl: NavController) {
    storage.get('userLogin').then((val) => {
      if(val){
        this.hidelogins = true;
      }
    });
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
