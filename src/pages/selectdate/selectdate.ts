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
  public max: any;
  public min = new Date().toJSON().split('T')[0];;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (navParams.data.request.carType != null) {
      this.request.carType = navParams.data.request.carType   
    }

    let date = new Date(new Date().getFullYear() + 10 + '-01-01');
    this.max = new Date(date).toJSON().split('T')[0]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectdatePage');
  }

  proceedwithtoday(){
    this.request.date = new Date().getFullYear() + '-' + new Date().getMonth()+ '-' + new Date().getDate();
    this.request.time = new Date().getHours() + ':' + new Date().getMinutes(); 
    this.navCtrl.push(SelectmapPage, {request : this.request});
  }

  dateFormat(){
    let month = new Date().getMonth();
    //month.length

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
