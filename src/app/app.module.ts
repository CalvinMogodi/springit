import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule , Pipe} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SelectcarPage } from '../pages/selectcar/selectcar'
import { LoginPage } from '../pages/login/login'
import { SignupPage } from '../pages/signup/signup'
import { SelectdatePage } from '../pages/selectdate/selectdate'
import { SelectmapPage } from '../pages/selectmap/selectmap'
import { AvaliableservieproviderPage } from '../pages/avaliableservieprovider/avaliableservieprovider'
import { RateproviderPage } from '../pages/rateprovider/rateprovider'
import { HistoryPage } from '../pages/history/history';
import { RequestPage } from '../pages/request/request';
import { AutocompletePage } from '../pages/autocomplete/autocomplete';
import { CallNumber } from '@ionic-native/call-number';
import { CardpaymentPage } from '../pages/cardpayment/cardpayment';

import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { IonicStorageModule } from '@ionic/storage';
import { Stripe } from '@ionic-native/stripe';

var config = {
  apiKey: "AIzaSyBJ5h0a3tE_HSF-vnqllbBRqqa8k6W77NQ",
  authDomain: "springit-d8d43.firebaseapp.com",
  databaseURL: "https://springit-d8d43.firebaseio.com",
  projectId: "springit-d8d43",
  storageBucket: "springit-d8d43.appspot.com",
  messagingSenderId: "681332387773"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SelectcarPage,
    LoginPage,
    SignupPage,
    SelectdatePage,
    SelectmapPage,
    AvaliableservieproviderPage,
    RateproviderPage,
    HistoryPage,
    RequestPage,
    AutocompletePage,
    CardpaymentPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule, // for database
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    SelectcarPage,
    LoginPage,
    SignupPage,
    SelectdatePage,
    SelectmapPage,
    AvaliableservieproviderPage,
    RateproviderPage,
    HistoryPage,
    RequestPage,
    AutocompletePage,
    CardpaymentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Stripe,
    CallNumber
  ]
})
export class AppModule {}
