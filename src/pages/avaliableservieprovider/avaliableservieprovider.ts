import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RateproviderPage } from '../rateprovider/rateprovider'

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvaliableservieproviderPage');
  }

  rate(){
    this.navCtrl.setRoot(RateproviderPage);
  }

}
