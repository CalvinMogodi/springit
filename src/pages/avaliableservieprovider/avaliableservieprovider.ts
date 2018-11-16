import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RateproviderPage } from '../rateprovider/rateprovider'
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the AvaliableservieproviderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-avaliableservieprovider',
  templateUrl: 'avaliableservieprovider.html',
})
export class AvaliableservieproviderPage {
  public serviceProvider = {
    cellNumber: '',
    name:''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber) {
    this.serviceProvider = navParams.data.serviceProvider;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvaliableservieproviderPage');
  }

  rate(){
    this.navCtrl.setRoot(RateproviderPage);
  }

  callProvider(){
    this.callNumber.callNumber(this.serviceProvider.cellNumber, true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }

}
