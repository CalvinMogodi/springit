import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RateproviderPage } from '../rateprovider/rateprovider'
import { CallNumber } from '@ionic-native/call-number';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';

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
  public request: any;
  public requestId = "";
  public showComplete = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber, public db: AngularFireDatabase) {
    this.serviceProvider = navParams.data.serviceProvider;
    this.request = navParams.data.request;
    this.requestId = navParams.data.requestId;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvaliableservieproviderPage');
  }

  callProvider() {
    this.callNumber.callNumber(this.serviceProvider.cellNumber, true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }

  cancel() {
    var updates = {};
    updates['requests/'+this.requestId+'/status/'] = "Cancelled";
    updates['requests/'+this.requestId+'/pickedup/'] = true;
    this.db.database.ref().update(updates);
    this.navCtrl.setRoot(HomePage);
  }

  start() {
    var updates = {};
    updates['requests/'+this.requestId+'/status/'] = "In Prograss";
    this.db.database.ref().update(updates);
    this.showComplete = true;
  }

  complete() {
    var updates = {};
    updates['requests/'+this.requestId+'/status/'] = "Complete";
    this.db.database.ref().update(updates);
    this.navCtrl.setRoot(RateproviderPage);
  }

}
