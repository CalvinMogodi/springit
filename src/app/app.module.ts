import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
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

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

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
    RequestPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule, // for database
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
    RequestPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
