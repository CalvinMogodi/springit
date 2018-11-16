import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the RateproviderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rateprovider',
  templateUrl: 'rateprovider.html',
})
export class RateproviderPage {

  public serviceProvider = {
    cellNumber: '',
    name:''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber) {
    this.serviceProvider = navParams.data.serviceProvider;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RateproviderPage');
  }

  submit(){
    this.navCtrl.setRoot(HomePage);
  }

  callProvider(){
    this.callNumber.callNumber(this.serviceProvider.cellNumber, true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }

}
