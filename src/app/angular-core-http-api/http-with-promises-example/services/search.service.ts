import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SearchArtistAlbum } from '../models/search-artist-album.model';
import { SearchArtistTrack } from '../models/search-artist-track.model';
import { SearchArtistVideo } from '../models/search-artist-video.model';
import { SearchArtistItem } from '../models/search-artist.model';
import { SearchItem } from '../models/search-item.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  apiRootValue: string = environment.iTunesApiRoot;
  results: SearchItem[] = [];

  results2: SearchItem[] = [];
 

  artistDetailsResults: SearchArtistItem[] = [];
  artistTracksResults: SearchArtistTrack[] = [];
  artistAlbumsResults: SearchArtistAlbum[] = [];
  artistVideosResults: SearchArtistVideo[] = [];

  constructor(private httpClient: HttpClient) { }

  handleSearchAsPromise(searchTerm: string): Promise<string> {
    console.log(`service searching for ${searchTerm}`, this.httpClient);

    let promise = new Promise<string>((resolve, reject) => {
      let params = new HttpParams().set('term', searchTerm).set('media', 'music').set('limit', '20');
      let apiUrl = `${this.apiRootValue}/search`;

      this.httpClient.get(apiUrl, {params: params, responseType: 'json'})
      .toPromise()
      .then((response: any) => {
        // map here is an array func (works like the forEach)
        this.results = response.results.map((item: {trackName: string, artistName: string, trackViewUrl: string, artworkUrl30: string, artistId: string}) => {
          return new SearchItem(item.trackName, item.trackViewUrl, item.artistName, item.artistId, item.artworkUrl30);
        });

        console.log(this.results);
        resolve('done');
      })
      .catch(error =>  {
        console.error(`Error: ${error.status} ${error.statusText}`);
        reject('error');
      });
    });

    return promise;
  }

  handleSearchAsObservable(searchTerm: string): Observable<SearchItem[]> {
    console.log(`service searching for ${searchTerm}`, this.httpClient);

    let params = new HttpParams().set('term', searchTerm).set('media', 'music').set('limit', '20');
    let apiUrl = `${this.apiRootValue}/search`;

     return this.httpClient.get(apiUrl, {params: params, responseType: 'json'})
    .pipe(
      map((response: any) => {
        let searchResults = response.results.map((item: {trackName: string, artistName: string, trackViewUrl: string, artworkUrl30: string, artistId: string}) => {
          return new SearchItem(item.trackName, item.trackViewUrl, item.artistName, item.artistId, item.artworkUrl30);
        });

        return searchResults;
      })
    )
  }

  handleSearchAsObservableJsonP(searchTerm: string):  Observable<SearchItem[]> {
    console.log(`service searching for ${searchTerm}`, this.httpClient);
    
    let apiUrl = `${this.apiRootValue}/search?term=${searchTerm}&media=music&limit=20`;

    return this.httpClient.jsonp(apiUrl, 'callback')
    .pipe(
      map((response: any) => {
        console.log('loggingStuff');
        console.log(response);

        let searchResults = response.results.map((item: {trackName: string, artistName: string, trackViewUrl: string, artworkUrl30: string, artistId: string}) => {
          return new SearchItem(item.trackName, item.trackViewUrl, item.artistName, item.artistId, item.artworkUrl30);
        });

        return searchResults;
      })
    );
  }

  handleSearchAsPromiseJsonP(searchTerm: string): Promise<SearchItem[]> {
    console.log(`service searching for ${searchTerm}`, this.httpClient);

    let promise = new Promise<SearchItem[]>((resolve, reject) => {
      
      let apiUrl = `${this.apiRootValue}/search?term=${searchTerm}&media=music&limit=20`;

     this.httpClient.jsonp(apiUrl, 'callback')
      .toPromise()
      .then((response: any) => {
        // map here is an array func (works like the forEach)
        this.results2 = response.results.map((item: {trackName: string, artistName: string, trackViewUrl: string, artworkUrl30: string, artistId: string}) => {
          return new SearchItem(item.trackName, item.trackViewUrl, item.artistName, item.artistId, item.artworkUrl30);
        });

        console.log(this.results2);
        resolve([]);
      })
      .catch(error =>  {
        console.error(`Error: ${error.status} ${error.statusText}`);
        reject('error');
      });
    });

    return promise;

  }

  getArtistDetailsById(artistId: string): Promise<SearchArtistItem[]> {

    let promise = new Promise<SearchArtistItem[]>((resolve, reject) => {
      
      let apiGetArtistDetailsUrl: string = `${this.apiRootValue}/lookup?id=${artistId}`;

     this.httpClient.jsonp(apiGetArtistDetailsUrl, 'callback')
      .toPromise()
      .then((response: any) => {

        // map here is an array func (works like the forEach)
        this.artistDetailsResults = response.results.map((item: { artistId: string, artistName: string, artistLinkUrl: string, primaryGenreName: string }) => {
          return new SearchArtistItem(item.artistId, item.artistName, item.artistLinkUrl, item.primaryGenreName);
        });

        console.log(this.artistDetailsResults);
        resolve([]);
      })
      .catch(error =>  {
        console.error(`Error: ${error.status} ${error.statusText}`);
        reject('error');
      });
    });

    return promise;
  }

  getTracksByArtistId(artistId: string): Promise<SearchArtistTrack[]> {

    let promise = new Promise<SearchArtistTrack[]>((resolve, reject) => {
      
      let apiGetTracksUrl: string = `${this.apiRootValue}/lookup?id=${artistId}&entity=song`;

     this.httpClient.jsonp(apiGetTracksUrl, 'callback')
      .toPromise()
      .then((response: any) => {

        // // remove first item in the array as its not information about the tracks
        response.results.shift();

        //instead of shift maybe we could select where "wrapperType": "track"
        //let tracks = response.results.reduce((allTracks: any, item: any) => (item.wrapperType == 'track' && allTracks.push(item.value), allTracks), []);

        // map here is an array func (works like the forEach)
        this.artistTracksResults = response.results.map((item: { trackName: string, artistName: string, trackViewUrl: string, artworkUrl60: string, artistId: string }) => {
          return new SearchArtistTrack(item.artistId, item.trackName, item.trackViewUrl, item.artworkUrl60);
        });

        console.log(this.artistTracksResults);
        resolve([]);
      })
      .catch(error =>  {
        console.error(`Error: ${error.status} ${error.statusText}`);
        reject();
      });
    });

    return promise;
  }

  getAlbumsByArtistId(artistId: string): Promise<SearchArtistAlbum[]> {

    let promise = new Promise<SearchArtistAlbum[]>((resolve, reject) => {
      
      let apiGetAlbumsUrl: string = `${this.apiRootValue}/lookup?id=${artistId}&entity=album`;

     this.httpClient.jsonp(apiGetAlbumsUrl, 'callback')
      .toPromise()
      .then((response: any) => {

        //remove the first item in the array as its not information about the Albums
        response.results.shift();

        // map here is an array func (works like the forEach)
        this.artistAlbumsResults = response.results.map((item: { artistId: string, collectionCensoredName: string, collectionViewUrl: string, artworkUrl60: string }) => {
          return new SearchArtistAlbum(item.artistId, item.collectionCensoredName, item.collectionViewUrl, item.artworkUrl60);
        });

        console.log(this.artistAlbumsResults);
        resolve([]);
      })
      .catch(error =>  {
        console.error(`Error: ${error.status} ${error.statusText}`);
        reject();
      });
    });

    return promise;
  }

  getVideosByArtistId(artistId: string): Promise<SearchArtistVideo[]> {

    let promise = new Promise<SearchArtistVideo[]>((resolve, reject) => {
      
      let apiGetVideosUrl: string = `${this.apiRootValue}/lookup?id=${artistId}&entity=musicVideo`;

     this.httpClient.jsonp(apiGetVideosUrl, 'callback')
      .toPromise()
      .then((response: any) => {

        //remove the first item in the array as its not information about the videos
        response.results.shift();

        // map here is an array func (works like the forEach)
        this.artistVideosResults = response.results.map((item: { trackName: string, trackViewUrl: string, artworkUrl100: string }) => {
          return new SearchArtistVideo(artistId, item.trackName, item.trackViewUrl, item.artworkUrl100);
        });

        console.log(this.artistVideosResults);
        resolve([]);
      })
      .catch(error =>  {
        console.error(`Error: ${error.status} ${error.statusText}`);
        reject();
      });
    });

    return promise;
  }
}
