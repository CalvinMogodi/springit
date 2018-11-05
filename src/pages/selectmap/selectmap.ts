import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { RequestPage } from '../request/request';

declare var google;

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
  public request = {
    carType: '',
    date: '',
    time: '',
    location: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation) {
    if (navParams.data.request != null) {      
        this.request.carType = navParams.data.request.carType;
        this.request.date = navParams.data.request.date;
        this.request.time = navParams.data.request.time;    
    }
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

  addMarker() {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
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
    this.navCtrl.push(RequestPage, {request: this.request});
  }

}
