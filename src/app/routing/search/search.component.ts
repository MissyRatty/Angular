import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchItem } from 'src/app/angular-core-http-api/http-with-promises-example/models/search-item.model';
import { SearchService } from 'src/app/angular-core-http-api/http-with-promises-example/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  private isLoading: boolean = false;
  private subscription: Subscription;

  private searchResults: SearchItem[] = [];

  constructor(
    private searchService: SearchService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { 

      this.subscription = this.activatedRoute.params
      .subscribe(params => {

        if(params['term']) {

          // lets perform the search here
          this.search(params['term']);
        }
      });
    }

  ngOnInit(): void {
  }

  onSearch(searchText: string) {

    // redirecting to a route that has optional query params
    // doing it this way, will make your url something like this: http://localhost:4200/#/search;term=love
    // this.router.navigate(['search', { term: searchText }]);

    this.router.navigate(['search', searchText]);
  }

  search(searchText: string): void {

      this.isLoading = true;
      console.log(`searching for ${searchText}`);

      this.searchService.handleSearchAsPromiseJsonP(searchText)
        .then(_ => {

          this.isLoading = false;
          this.searchResults = this.searchService.results2;
        });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
