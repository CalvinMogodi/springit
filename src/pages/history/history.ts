import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AvaliableservieproviderPage } from '../avaliableservieprovider/avaliableservieprovider';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  requests: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, private storage: Storage) {
    storage.get('userId').then((val) => {
      val = "eSSHR8AT00aNwZFgZTJWoLjd6Uo1";
      if(val){
        this.requests = db.list('requests').valueChanges(); //.orderByChild('userId').equalTo(val).on();
      }
    });
   
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

}
