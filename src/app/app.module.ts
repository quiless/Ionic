import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { VideoPlayer } from '@ionic-native/video-player';
import { Camera } from '@ionic-native/camera';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { VideoConfigPage } from '../pages/config/video-config';
import { VideoWatchPage } from '../pages/watch/video-watch';
import { File } from '@ionic-native/file';
import { IonicStorageModule } from '@ionic/storage';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { HttpModule } from '@angular/http';
import { CoreProvider } from '../services/core';
import { LongPressModule } from 'ionic-long-press';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    VideoConfigPage,
    VideoWatchPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    LongPressModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    VideoConfigPage,
    VideoWatchPage
  ],
  providers: [
    StreamingMedia,
    StatusBar,
    SplashScreen,
    CoreProvider,
    Camera,
    File,
    Storage,
    VideoPlayer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
