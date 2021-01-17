import { Component, OnInit } from '@angular/core';
import { SimpleService2 } from '../simple-service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
  //providers: [SimpleService2],  -- this instance of the service is shared by the parent compo & view children & content children
  //this instance is only shared by the parent compo & view children only (no content children have access to this instance)
  viewProviders: [SimpleService2],
})
export class ParentComponent implements OnInit {
  constructor(public simpleService: SimpleService2) {}

  ngOnInit(): void {}
}
