import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { List } from 'ionic-angular';
import { VideoPlayer } from '@ionic-native/video-player';
import { File } from '@ionic-native/file';;
import { Camera } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { VideoWatchPage } from '../watch/video-watch';


@Component({
  selector: 'video-config',
  templateUrl: 'video-config.html',
  entryComponents:[VideoWatchPage]
})

export class VideoConfigPage{

  private imageSrc: string;
  objeto = {};
  constructor(public navCtrl: NavController, private file : File, private camera : Camera, private alertController : AlertController, private storage: Storage) {
 
  }

  videoConfig = {
    Number: 0,
    ApiUrl: "",
    VideoUri: "",
    VideoId: 0,
    AdvanceVideo: false
  }

  

  private openGallery (): void {
 
    let cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,   
      mediaType: this.camera.MediaType.VIDEO, 
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,     
      correctOrientation: true
    }
  
    this.camera.getPicture(cameraOptions)
      .then((file_uri) => {
        this.videoConfig.VideoUri = "";
        this.videoConfig.VideoUri = file_uri;
        let alert = this.alertController.create({
          title: file_uri,
          subTitle: file_uri,
          buttons: ['OK']
        });
        alert.present();
      },(err) => {
        let alert = this.alertController.create({
          title: err,
          subTitle: err,
          buttons: ['OK']
        });
        alert.present();
      });   
  }

  saveConfig(){
    this.storage.set('Number', this.videoConfig.Number);
    this.storage.set('ApiUrl', this.videoConfig.ApiUrl);
    this.storage.set('VideoUri', this.videoConfig.VideoUri);
    this.storage.set('VideoId', this.videoConfig.VideoId);
    this.storage.set('AdvanceVideo', this.videoConfig.AdvanceVideo);
    //var Texto = this.videoConfig.Number + " " +  this.videoConfig.ApiUrl + " " + this.videoConfig.VideoUri
    let alert = this.alertController.create({
      title: "Configuração salva com sucesso!",
      buttons: ['OK']
    });
    alert.present();
  }

}
