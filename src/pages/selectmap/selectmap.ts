import {Component, ViewChild, ElementRef } from '@angular/core';
import {IonicPage, NavController, ModalController, NavParams} from 'ionic-angular';
import {AutocompletePage} from '../autocomplete/autocomplete';
import { Geolocation } from '@ionic-native/geolocation';
import { RequestPage } from '../request/request';

declare let google: any

/**
 * Generated class for the SelectmapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selectmap',
  templateUrl: 'selectmap.html',
})
export class SelectmapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  address;
  public request = {
    carType: '',
    date: '',
    time: '',
    location: '',
    coordinates: {latitude: '', longitude:''}
  };

  constructor(public navCtrl: NavController, public modalCtrl:ModalController, public navParams: NavParams, public geolocation: Geolocation ) {
    this.address = {
      place: '',
      latitude:'',
      longitude:''
    };
    if (navParams.data.request != null) {      
      this.request.carType = navParams.data.request.carType;
      this.request.date = navParams.data.request.date;
      this.request.time = navParams.data.request.time;    
  }
  }

  showAddressModal () {
    let modal = this.modalCtrl.create(AutocompletePage);
    let me = this;
    modal.onDidDismiss(data => {
      if(data != null){
        this.address.place = data.description;
        let latLng = new google.maps.LatLng(data.latitude, data.longitude);   
  
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.address.latitude = data.latitude;
        this.address.longitude = data.longitude;
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.request.coordinates = {latitude: data.latitude, longitude:data.longitude}
        var position = new google.maps.LatLng(data.latitude, data.longitude);
        var museumMarker = new google.maps.Marker({position: position, title: data.description});
        museumMarker.setMap(this.map);
      }    
    });
    modal.present();
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);     

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    }, (err) => {
      console.log(err);
    });

  }

  addMarker(latLng) {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  function(success) {
    console.log(success);
  }

  proceed() {
    if(this.address.place != undefined && this.address.place != ""){
      this.request.location = this.address.place;
      this.request.coordinates =  {latitude: this.address.latitude, longitude: this.address.longitude}
      this.navCtrl.push(RequestPage, {request: this.request});
    }  
  }

}
