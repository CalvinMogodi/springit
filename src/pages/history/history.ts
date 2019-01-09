import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AvaliableservieproviderPage } from '../avaliableservieprovider/avaliableservieprovider';
import { Storage } from '@ionic/storage';

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
  requests = [];

  constructor(private zone: NgZone, public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, private storage: Storage) {
    storage.get('userId').then((val) => {
      val = "eSSHR8AT00aNwZFgZTJWoLjd6Uo1";
      if(val){
        this.db.database.ref().child('requests').orderByChild('userId').equalTo(val).on('value', snapshot => {
          var result = snapshot.val();
          if (result != null) {
            snapshot.forEach(snap => {
              var user = snap.val(); 
              this.zone.run(() => { 
                this.requests.push(user);   
                });            
            });       
          }
        });
      }
    });
   
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

}
