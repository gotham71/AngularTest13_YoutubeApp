import { Component, OnInit } from '@angular/core';

//Services
import { YoutubeService } from './../../services/youtube.service';


declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  videos: any[] = [];
  videoSelected: any;

  constructor(public _youtubeService: YoutubeService) {

    this._youtubeService.getVideos().subscribe(videos => {
      this.videos = videos;
    });

  }

  ngOnInit() {
  }

  seeVideo(video:any) {
    this.videoSelected = video;
    $('#exampleModal').modal();
  }

  closeModal() {
    this.videoSelected = null;
    $('#exampleModal').modal('hide');
  }

  loadMoreVideos() {
    this._youtubeService.getVideos().subscribe(videos => {
      this.videos.push.apply(this.videos, videos);
    });
  }
}
