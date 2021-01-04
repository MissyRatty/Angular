import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SearchItem } from '../models/search-item.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  apiRootValue: string = environment.iTunesApiRoot;
  results: SearchItem[] = [];

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
}
