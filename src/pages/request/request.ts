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
    paymentMethod: '',
    status: 'New',
    spName: '',
    spId:0,
    coordinates: {latitude: '', longitude:''}
  };
  public cardDetails = {
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  }
  public providerCloseBy = true;

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
      this.request.coordinates = navParams.data.request.coordinates

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
    }else{
      this.showPaymentForm = false;
    }
  }

  paywithcard(user, spId){
    this.stripe.setPublishableKey('pk_test_tDpVMqID903bo2eKCjQ3ZYkU');
    let card = {
      number: '4242424242424242',
      expMonth: 12,
      expYear: 2020,
      cvc: '220'
     };
     
     this.stripe.createCardToken(card).then(token => 
      console.log(token.id)
    ).catch(error => 
      console.error(error)
    );
  }

  requestSP() {
    if(this.paymentMethod != ""){
      this.searching = true;
    this.providerCloseBy = true;
    this.geolocation.getCurrentPosition().then((resp) => { 
      this.db.database.ref().child('serviceproviders').orderByChild('active').equalTo(true).on('value', snapshot => {
        var result = snapshot.val();
        if (result != null) {
          let canProcced = false;
          let thisuser;
          let thisspId;
          snapshot.forEach(snap => {
            var user = snap.val();
            let spId = snap.key;
            let distance = this.calculateDistance(this.request.coordinates.latitude,this.request.coordinates.longitude, user.coordinates.latitude, user.coordinates.longitude);
            if(distance <= 10){ 
              canProcced = true;  
              thisspId =  spId;
              thisuser = user;         
            }  
          });  

          if(canProcced){
            if(this.paymentMethod == "Card"){
              this.paywithcard(thisuser, thisspId);
            }
            else{
              this.addRequest(thisuser, thisspId);
            }   
            this.providerCloseBy = true;    
            this.searching = false;       
          }else{
            this.providerCloseBy = false;
            this.searching = false;
          }     
        }
      });
     });   
    }    
  }

  addRequest(user, spId) {
    this.request.active = true;
    this.request.paymentMethod = this.paymentMethod;
    this.request.spName = user.name;
    this.request.spId = spId;
    const newId = this.db.list('/requests').push(this.request).key;
    this.db.database.ref().child('requests/' + newId).on('value', snapshot => {
      var result = snapshot.val();
      this.navCtrl.push(AvaliableservieproviderPage, { request: this.request, serviceProvider: user, requestId: newId });
    });
  }

  calculateDistance(lat1, lon1, lat2, lon2) 
    {
      var R = 6371; // km
      var dLat = this.toRad(lat2-lat1);
      var dLon = this.toRad(lon2-lon1);
      lat1 = this.toRad(lat1);
      lat2 = this.toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

    // Converts numeric degrees to radians
    toRad(Value) 
    {
        return Value * Math.PI / 180;
    }
}
