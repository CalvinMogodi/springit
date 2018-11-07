import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AvaliableservieproviderPage } from '../avaliableservieprovider/avaliableservieprovider';
import { Stripe } from '@ionic-native/stripe';
import { Geolocation } from '@ionic-native/geolocation';

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
  public paymentMethods =  [ "Cash", "Card" ];
  public paymentMethod = "";
  public showPaymentForm = false;
  public years = [];
  public request = {
    carType: '',
    date: '',
    time: '',
    location: '',
    createdDate: new Date(),
    userId: 0,
    active: false,
    pickedup: false,
    paymentMethod: ''
  };
  public cardDetails = {
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  }
  public providerCloseBy = false;

  constructor(public geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, public stripe: Stripe) {
    
    let year = new Date().getFullYear();
    for(var _i = 1; _i < 10; _i++) {      
      this.years.push(year);
      year = year + 1;
    }

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

  paymentMethodChanged(){
    if(this.paymentMethod == "Card"){
      this.showPaymentForm = true;
    }
  }

  paywithcard(){
    this.stripe.setPublishableKey('pk_test_tDpVMqID903bo2eKCjQ3ZYkU');
    let card = {
      number: '4242424242424242',
      expMonth: 12,
      expYear: 2020,
      cvc: '220'
     };
     
     this.stripe.createCardToken(card)
        .then(token => console.log(token.id))
        .catch(error => console.error(error));
  }

  requestSP() {
    this.searching = true;
    this.providerCloseBy = false;
    this.geolocation.getCurrentPosition().then((resp) => { 
      this.db.database.ref().child('serviceproviders').orderByChild('active').equalTo(true).on('value', snapshot => {
        var result = snapshot.val();
        if (result != null) {
          snapshot.forEach(snap => {
            let distance = this.calculateDistance(resp.coords.latitude , resp.coords.longitude);
            if(distance <= 10){
              var user = snap.val();
              if(this.paymentMethod == "Card"){
                this.paywithcard();
              }
              else{
                this.addRequest();
              }              
              this.providerCloseBy = true;
            }            
          });       
        }
      });
     });   
  }

  calculateDistance(userLatitude, userLongitude){
    return 10;
  }

  addRequest() {
    this.request.active = true;
    this.request.paymentMethod = this.paymentMethod;
    const newId = this.db.list('/requests').push(this.request).key;

    this.db.database.ref().child('requests/' + newId).on('value', snapshot => {
      var result = snapshot.val();
      this.navCtrl.push(AvaliableservieproviderPage, { request: this.request });
    });
  }

}
