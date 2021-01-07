import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlwaysAuthChildrenGuard } from './guards/always-auth-children.guard';
import { AlwaysAuthGuard } from './guards/always-auth.guard';
import { OnlyLoggedInUsersGuard } from './guards/only-logged-in-users.guard';
import { UnsearchedTermGuard } from './guards/unsearched-term.guard';
import { ArtistAlbumListComponent } from './routing/artist-album-list/artist-album-list.component';
import { ArtistTrackListComponent } from './routing/artist-track-list/artist-track-list.component';
import { ArtistVideoListComponent } from './routing/artist-video-list/artist-video-list.component';
import { ArtistComponent } from './routing/artist/artist.component';
import { ErrorComponent } from './routing/error/error.component';
import { HomeComponent } from './routing/home/home.component';
import { SearchComponent } from './routing/search/search.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'find', redirectTo: 'search' },
  { path: 'home', component: HomeComponent },

  // for optional params you can do this without having to do: search/:term
  // only thing is, the url in your address bar will look like this: http://localhost:4200/#/search;term=love
  // I don't really like this format as its got the ';' in the url
  // So I prefer to register the other search/:term path which will resolve to: http://localhost:4200/#/search/love
  { 
    path: 'search', 
    component: SearchComponent, 
    canDeactivate: [ UnsearchedTermGuard ] 
  }, 
  { 
    path: 'search/:term', 
    component: SearchComponent 
  },
  { 
    path: 'artist/:id', 
    component: ArtistComponent, 
    canActivate: [ OnlyLoggedInUsersGuard, AlwaysAuthGuard ], // put guard on parent/main Component
    canActivateChild: [ AlwaysAuthChildrenGuard ],            // put guard on child components of the parent/main component   
    children: [
      { path: '', redirectTo: 'tracks', pathMatch: 'full' },
      { path: 'tracks', component: ArtistTrackListComponent },
      { path: 'albums', component: ArtistAlbumListComponent },
      { path: 'videos', component: ArtistVideoListComponent }
    ] 
  },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
