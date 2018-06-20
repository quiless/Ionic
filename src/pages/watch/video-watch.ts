import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { List } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { StatusBar } from '@ionic-native/status-bar';
import { CoreProvider } from '../../services/core';


@Component({
  selector: 'video-watch',
  templateUrl: 'video-watch.html'
})
export class VideoWatchPage {

  videoConfigFrom = {
    NumberFromStorage: '',
    ApiUrlFromStorage: '',
    VideoUriFromStorage: '',
    VideoIdFromStorage: '',
    AdvanceVideoFromStorage: false,
  }

  currentTime: number;
  showFullVideo: boolean = false;
  sendVideoToServer : boolean = false;
  videoWasAdvanced : boolean = false;



  constructor(public coreProvider : CoreProvider, public statusBar: StatusBar, public streamingMedia : StreamingMedia, public navCtrl: NavController, private storage: Storage, private alertController : AlertController) {

  }
  
  ionViewDidLoad() {
    this.getDataFromStorage();
    this.statusBar.hide();
    this.statusBar.overlaysWebView(true);
  }


  getDataFromStorage(){
    
    this.storage.get('AdvanceVideo').then((val) => {
      if (val != true){
        this.videoConfigFrom.AdvanceVideoFromStorage  = false;
      } else {
        this.videoConfigFrom.AdvanceVideoFromStorage = val;
      }
    });

    this.storage.get('Number').then((val) => {
      this.videoConfigFrom.NumberFromStorage = val;
    });

    this.storage.get('ApiUrl').then((val) => {
      this.videoConfigFrom.ApiUrlFromStorage = val;
    });


    this.storage.get('VideoUri').then((val) => {
      this.videoConfigFrom.VideoUriFromStorage = val;
    });

    this.storage.get('VideoId').then((val) => {
      this.videoConfigFrom.VideoIdFromStorage = val;
     
    });

  }

  showData(){
    var alert = this.alertController.create({
      title: "ALO",
      buttons: ['OK']
    });
  }

  
  isValid(){
    let alert = this.alertController.create({
      title: "Configuração salva com sucesso!",
      buttons: ['OK']
    });
    alert.present();
  }

  setCurrentTime(data) {


    if (data.target.currentTime > this.videoConfigFrom.NumberFromStorage){
      this.videoWasAdvanced = false;
    }

    if (this.videoWasAdvanced == true && data.target.currentTime < this.videoConfigFrom.NumberFromStorage){
      data.target.currentTime = 4;
      //this.showFullVideo = true;
      this.videoWasAdvanced = false;
    }

    if (data.target.currentTime < 0.01){
      this.showFullVideo = false;
      this.sendVideoToServer = false;
      this.videoWasAdvanced = false;
    }

    if (this.showFullVideo == false) {
      if (data.target.currentTime >= this.videoConfigFrom.NumberFromStorage){
        data.target.currentTime = 0;
        this.sendVideoToServer = false;
      }
    }   

    if (this.sendVideoToServer == false) {
      if (data.target.currentTime > this.videoConfigFrom.NumberFromStorage){
       
        this.sendVideoInformation();
      }
    }
  
    
  }

  sendVideoInformation(){
    this.coreProvider.sendInformations(this.videoConfigFrom.VideoIdFromStorage, this.videoConfigFrom.ApiUrlFromStorage)
    .subscribe(res => { }, (err) => { 
      let alert = this.alertController.create({
        title: err,
        subTitle: err + this.videoConfigFrom.ApiUrlFromStorage,
        buttons: ['OK']
      });
      alert.present();
     });  
     this.sendVideoToServer = true;
  }

  updateShowFullVideo(){
    this.showFullVideo = true;
    if (this.videoConfigFrom.AdvanceVideoFromStorage == true){
      this.videoWasAdvanced = true;
    }

    //this.coreProvider.sendInformations('teste');
  }

  showVideo(){
    var alert = this.alertController.create({
      title: "ALOO",
      buttons: ['OK']
    });
  }

  
}


