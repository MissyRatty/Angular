import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SearchComponent } from '../routing/search/search.component';

@Injectable({
  providedIn: 'root'
})
export class UnsearchedTermGuard implements CanDeactivate<SearchComponent> {
  canDeactivate(
    component: SearchComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot): boolean {

      console.log("UnsearchedTermGuard");
      console.log(currentRoute.params);
      console.log(currentState.url);

      return component.canDeactivate() || window.confirm("Are you sure?");
  }
  
}
