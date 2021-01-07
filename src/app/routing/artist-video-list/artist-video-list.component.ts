import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchArtistVideo } from 'src/app/angular-core-http-api/http-with-promises-example/models/search-artist-video.model';
import { SearchService } from 'src/app/angular-core-http-api/http-with-promises-example/services/search.service';

@Component({
  selector: 'app-artist-video-list',
  templateUrl: './artist-video-list.component.html',
  styleUrls: ['./artist-video-list.component.css']
})
export class ArtistVideoListComponent implements OnInit, OnDestroy {

  private artistVideoResults: SearchArtistVideo[] = [];
  private isLoading: boolean = false;

  private subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private searchService: SearchService) { 

    }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.parent.params
    .subscribe((parentParams) => {

      if(parentParams['id']) {

        this.isLoading = true;
        this.searchVideosByArtistId(parentParams['id']);
      }
    })
  }

  searchVideosByArtistId(artistId: string): void {

    this.searchService.getVideosByArtistId(artistId)
    .then(_ => {
      this.isLoading = false;
      this.artistVideoResults = this.searchService.artistVideosResults;
    });
  }

  ngOnDestroy(): void {
    
    this.subscription.unsubscribe();
  }

}
