import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CoreProvider {

  header = new Headers();
  options = new RequestOptions();
  

  constructor(public http: Http, public alert : AlertController) {
    this.header.append('Content-Type', 'application/json')
    this.options = new RequestOptions({
      headers: this.header
    }) 
  }

  public sendInformations(videoId, ApiUrl){

    return this.http.get(ApiUrl + "?videoId=" + videoId);
    //return this.http.post(url, JSON.stringify(jsonToSend), this.options)

  }


  
}