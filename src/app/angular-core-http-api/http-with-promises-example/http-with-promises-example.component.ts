import { Component, OnInit } from '@angular/core';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-http-with-promises-example',
  templateUrl: './http-with-promises-example.component.html',
  styleUrls: ['./http-with-promises-example.component.css'],
})
export class HttpWithPromisesExampleComponent implements OnInit {
  isSearchLoading: boolean = false;

  constructor(public searchService: SearchService) {}

  ngOnInit(): void {}

  handleSearch(searchTerm: string): void {
    console.log(`component searching for ${searchTerm}`);
    this.isSearchLoading = true;

    // the searchService.doSearch returns a Promise so we can do a then handler on it
    // to let it do post http call processing (e.g.: set the isSearchLoading back to false)
    this.searchService
      .handleSearchAsPromise(searchTerm)
      .then(() => (this.isSearchLoading = false));
  }
}
