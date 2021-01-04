import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { SearchItem } from '../http-with-promises-example/models/search-item.model';
import { SearchService } from '../http-with-promises-example/services/search.service';

@Component({
  selector: 'app-http-with-observables-example',
  templateUrl: './http-with-observables-example.component.html',
  styleUrls: ['./http-with-observables-example.component.css']
})
export class HttpWithObservablesExampleComponent implements OnInit, OnDestroy {

  private isSearchLoading: boolean = false;
  private isError: boolean = false;

  //OPTION 1
  private searchResults: SearchItem[] = [];

  //OPTION 2
  private results: Observable<SearchItem[]>;

  //OPTION 3 with Reactive-Forms
  private searchField: FormControl;
  private searchResults2: Observable<SearchItem[]>;

  subscription: Subscription = null;

  constructor(private searchService: SearchService) { 

  }

  ngOnInit(): void {

    //OPTION 3: 

    //initialize form control
    this.searchField = new FormControl('');

    this.searchResults2 = this.searchField.valueChanges
    .pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(() => this.isSearchLoading = true), //use this to do logic as side-effects not related to the streams (Observables)

      // use switch map to map the Observable<string> (from searchField.valueChanges) into Observable<Observable<SearchItem[]>>
      // and then the switch part of the switch map, will make sure we are subscribed to the inner Observabe (the one from the searchService.handleSearchAsObservable)
      switchMap((searchText: string) => {

        //return this.searchService.handleSearchAsObservable(searchText);
        
        return this.searchService.handleSearchAsObservableJsonP(searchText)
        .pipe(
          catchError((error) => {
            this.isSearchLoading = false;
            console.error(`Error: ${error.status} ${error.statusText}`);
            this.isError = true;

            if(!this.searchField.value) {
              this.isError = false;
            }
            return of<SearchItem[]>();
          })
        );
      }),

      tap(() => this.isSearchLoading = false) // use this to do logic as side-effects not related to the streams (Observables) (do deprecated, use tap instead)
    );
  }

  
  // called when the button is clicked
  handleSearch(searchTerm: string): void {
    console.log(`component searching for ${searchTerm}`);
    this.isSearchLoading = true;

    //OPTION 1:
    // the searchService.doSearch returns an Observable<SearchItem[]> so we can do a subscribe handler on it
    // to let it do post-http-call processing (e.g.: set the isSearchLoading back to false)
    this.subscription = this.searchService.handleSearchAsObservable(searchTerm).subscribe((response) => {
      this.isSearchLoading = false;
      this.searchResults = response;
    }, 
     error => { 
       console.error(`Error: ${error.status} ${error.statusText}`) 
      }
    );
  }

  handleSearch2(searchTerm: string): void {
    //OPTION 2:
    this.results = this.searchService.handleSearchAsObservable(searchTerm);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
