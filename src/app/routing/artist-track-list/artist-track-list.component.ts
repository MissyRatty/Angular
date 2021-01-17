import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchArtistTrack } from 'src/app/angular-core-http-api/http-with-promises-example/models/search-artist-track.model';
import { SearchService } from 'src/app/angular-core-http-api/http-with-promises-example/services/search.service';

@Component({
  selector: 'app-artist-track-list',
  templateUrl: './artist-track-list.component.html',
  styleUrls: ['./artist-track-list.component.css'],
})
export class ArtistTrackListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  artistTracks: SearchArtistTrack[];

  isLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService
  ) {
    this.subscription = this.activatedRoute.parent.params.subscribe(
      (parentParams) => {
        console.log(parentParams);

        // perform search
        if (parentParams['id']) {
          this.searchArtistTracks(parentParams['id']);
        }
      }
    );
  }

  ngOnInit(): void {}

  searchArtistTracks(artistId: string): void {
    this.isLoading = true;
    this.searchService.getTracksByArtistId(artistId).then(() => {
      this.isLoading = false;

      console.log(this.searchService.artistTracksResults);
      this.artistTracks = this.searchService.artistTracksResults;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
