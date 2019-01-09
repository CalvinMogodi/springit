import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AvaliableservieproviderPage } from '../avaliableservieprovider/avaliableservieprovider';

/**
 * Generated class for the CardpaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cardpayment',
  templateUrl: 'cardpayment.html',
})
export class CardpaymentPage {
  public user: any;
  public key: any;
  public frame0 = false;
  public frame1 = false;
  public frame2 = false;
  public request = {
    carType: '',
    amount: 0,
    date: '',
    time: '',
    location: '',
    createdDate: new Date(),
    userId: 0,
    active: false,
    pickedup: false,
    paymentMethod: '',
    status: 'New',
    spName: '',
    spId: 0,
    coordinates: { latitude: '', longitude: '' }
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, public viewCtrl: ViewController) {
    if (navParams.data.request != null) {
      this.request = navParams.data.request;
      this.key = navParams.data.requestId;
      this.user = navParams.data.user;
      switch (this.request.carType) {
        case 'Bakkie':
          this.frame0 = true;
          this.frame1 = false;
          this.frame2 = false;
          break;
        case 'Hatchback':
          this.frame0 = false;
          this.frame1 = true;
          this.frame2 = false;
          break;
        case 'Sedan':
          this.frame0 = false;
          this.frame1 = true;
          this.frame2 = false;
          break;
        case 'SUV':
          this.frame0 = false;
          this.frame1 = false;
          this.frame2 = true;
          break;
        case 'Kombie':
          this.frame0 = false;
          this.frame1 = false;
          this.frame2 = true;
          break;
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardpaymentPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  done() {
    var updates = {};
    updates['requests/'+this.key+'/active/'] = true; 
    updates['requests/'+this.key+'/status/'] = 'New'; 
    this.db.database.ref().update(updates);
    this.navCtrl.push(AvaliableservieproviderPage, { request: this.request, serviceProvider: this.user, requestId: this.key });
    this.viewCtrl.dismiss();
  }

}
