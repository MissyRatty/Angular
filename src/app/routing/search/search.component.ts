import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchItem } from 'src/app/angular-core-http-api/http-with-promises-example/models/search-item.model';
import { SearchService } from 'src/app/angular-core-http-api/http-with-promises-example/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  private subscription: Subscription;

  searchResults: SearchItem[] = [];

  constructor(
    public searchService: SearchService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.subscription = this.activatedRoute.params.subscribe((params) => {
      if (params['term']) {
        // lets perform the search here
        this.search(params['term']);
      }
    });
  }

  ngOnInit(): void {}

  onSearch(searchText: string) {
    // redirecting to a route that has optional query params
    // doing it this way, will make your url something like this: http://localhost:4200/#/search;term=love
    // this.router.navigate(['search', { term: searchText }]);

    this.isLoading = true;

    this.router.navigate(['search', searchText]);
  }

  search(searchText: string): void {
    this.isLoading = true;
    console.log(`searching for ${searchText}`);

    this.searchService.handleSearchAsPromiseJsonP(searchText).then((_) => {
      this.isLoading = false;
      this.searchResults = this.searchService.results2;
    });
  }

  canDeactivate(): boolean {
    // we want to prompt user if they are on the search page but didn't search for anything by not clicking the search button
    // its not a very good example though lol
    return this.isLoading;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
