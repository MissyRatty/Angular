import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchArtistItem } from 'src/app/angular-core-http-api/http-with-promises-example/models/search-artist.model';
import { SearchService } from 'src/app/angular-core-http-api/http-with-promises-example/services/search.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css'],
})
export class ArtistComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  artistDetails: SearchArtistItem;

  constructor(
    private searchService: SearchService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        // perform search
        this.searchArtistDetails(params['id']);
      }
    });
  }

  searchArtistDetails(artistId: string): void {
    this.searchService.getArtistDetailsById(artistId).then(() => {
      console.log(this.searchService.artistDetailsResults);

      this.artistDetails = this.searchService.artistDetailsResults[0];
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
