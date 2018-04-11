import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class YoutubeService {

  private urlYoutube:string = "https://www.googleapis.com/youtube/v3";
  private apiKey:string = "AIzaSyA5qLhbd0hLhtrXe4DWx_3ng6kWDZtWJo8";
  private playlist: string = "UUqjrMD3e9c1xlktzuAt4O5g";

  private nextPageToken:string = "";

  constructor(public http: Http) {

  }

  getVideos() {
    let url = `${this.urlYoutube}/playlistItems`;
    let params = new URLSearchParams();

    params.set('part', 'snippet');
    params.set('maxResults', '3');
    params.set('playlistId', this.playlist);
    params.set('key', this.apiKey);

    if (this.nextPageToken) {
      params.set('pageToken', this.nextPageToken);
    }


    return this.http.get(url, { search: params }).map(resp => {
      console.log(resp.json());
      this.nextPageToken = resp.json().nextPageToken;

      let videos: any[] = [];
      for (let video of resp.json().items) {
        let snippet = video.snippet;
        videos.push(snippet);
      }

      return videos;
    });
  }

}
