import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { List } from 'ionic-angular';
import { VideoConfigPage } from '../config/video-config';
import { VideoWatchPage } from '../watch/video-watch';
import { CoreProvider } from '../../services/core';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  entryComponents:[ VideoConfigPage, VideoWatchPage]
})
export class HomePage {

  constructor(public navCtrl: NavController, public core : CoreProvider, public alert : AlertController) {

  }

  redirectPageConfig(){
    this.navCtrl.push(VideoConfigPage);
  }

  redirectPageWatch(){
    this.navCtrl.push(VideoWatchPage);
  }




}
