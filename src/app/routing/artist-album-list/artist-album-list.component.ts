import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchArtistAlbum } from 'src/app/angular-core-http-api/http-with-promises-example/models/search-artist-album.model';
import { SearchService } from 'src/app/angular-core-http-api/http-with-promises-example/services/search.service';

@Component({
  selector: 'app-artist-album-list',
  templateUrl: './artist-album-list.component.html',
  styleUrls: ['./artist-album-list.component.css']
})
export class ArtistAlbumListComponent implements OnInit, OnDestroy {
  
  private subscription: Subscription;
  private artistAlbums: SearchArtistAlbum[] = [];

  private isLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private searchService: SearchService) { 

    }

  ngOnInit(): void {

    this.subscription = this.activatedRoute.parent.params
    .subscribe((parentParams) => {

      if(parentParams['id']) {

        this.searchArtistAlbums(parentParams['id']);
      }
    })
  }

  searchArtistAlbums(artistId: string): void {

    this.isLoading = true;

    this.searchService.getAlbumsByArtistId(artistId)
    .then(_ => {

      this.isLoading = false;
      this.artistAlbums = this.searchService.artistAlbumsResults;
    })
  }

  ngOnDestroy(): void {

    this.subscription.unsubscribe();
  }
}