import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase/app';


var config = {
  apiKey: 'AIzaSyAVbhEUNRr1eOkrVqvmBVkXKoDH2RaMQvg',
  authDomain: 'test-8774c.firebaseapp.com',
  databaseURL: 'https://test-8774c.firebaseio.com',
  projectId: 'test-8774c',
  storageBucket: '',
  messagingSenderId: '80673719335',
  appId: '1:80673719335:web:c0a9d830c8800697e0fa02'
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}
