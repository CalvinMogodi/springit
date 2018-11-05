import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AvaliableservieproviderPage } from '../avaliableservieprovider/avaliableservieprovider';

/**
 * Generated class for the RequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-request',
  templateUrl: 'request.html',
})
export class RequestPage {
  public imgURL = '';
  public searching = false;
  public pickedup = false;
  public request = {
    carType: '',
    date: '',
    time: '',
    location: '',
    createdDate: new Date(),
    userId: 0,
    active: false,
    pickedup: false
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
    if (navParams.data.request != null) {
      this.request.carType = navParams.data.request.carType;
      this.request.date = navParams.data.request.date;
      this.request.time = navParams.data.request.time;
      this.request.location = navParams.data.request.location;

      switch (this.request.carType) {
        case 'Bakkie':
          this.imgURL = '../../assets/imgs/bakkie.png';
          break;
        case 'Hatchback':
          this.imgURL = '../../assets/imgs/hatchback.png';
          break;
        case 'Sedan':
          this.imgURL = '../../assets/imgs/sedan.png';
          break;
        case 'SUV':
          this.imgURL = '../../assets/imgs/suv.png';
          break;
        case 'Kombie':
          this.imgURL = '../../assets/imgs/kombie.png';
          break;
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestPage');
  }

  requestSP() {
    this.searching = true;
    this.db.database.ref().child('users').orderByChild('active').equalTo(true).on('value', snapshot => {
      var result = snapshot.val();
      if (result != null) {
        snapshot.forEach(snap => {
          var user = snap.val();
        });

        this.addRequest();
      }
    });
  }

  addRequest() {
    this.request.active = true;
    const newId = this.db.list('/requests').push(this.request).key;

    this.db.database.ref().child('requests/' + newId).on('value', snapshot => {
      var result = snapshot.val();
      if (result.pickedup) {
        this.pickedup = true;
        this.searching = false;
        this.navCtrl.push(AvaliableservieproviderPage, {request: this.request})
      }
    });
  }

}
