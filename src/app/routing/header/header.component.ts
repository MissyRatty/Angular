import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goHome(): void {
    this.router.navigate(['home']);
  }

  goSearch(): void {
    this.router.navigate(['search']);

    // if the search page path was e.g.: search/foo/moo
    // then the router navigation will be:
    // this.router.navigate(['search', 'foo', 'moo'])

    // if some parts of the url values were coming from variables 
    // then this way makes it easy to append the values
    // e.g.: 
    // let part = 'foo';
    // this.router.navigate(['search', part, 'moo'])
  }

}
