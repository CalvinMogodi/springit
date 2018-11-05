import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SelectmapPage } from '../selectmap/selectmap'

/**
 * Generated class for the SelectdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selectdate',
  templateUrl: 'selectdate.html',
})
export class SelectdatePage {
  public request = {
    carType: '',
    date: '',
    time: '',
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (navParams.data.request.carType != null) {
      this.request.carType = navParams.data.request.carType   
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectdatePage');
  }

  proceedwithtoday(){
    this.navCtrl.push(SelectmapPage);
  }

  proceed(){
    if(this.request.date == '')
    {
      return
    }

    if(this.request.time == '')
    {
      return
    }
    this.navCtrl.push(SelectmapPage, {request : this.request});
  }

}
