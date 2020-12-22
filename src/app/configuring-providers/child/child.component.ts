import { Component, OnInit } from '@angular/core';
import { SimpleService2 } from '../simple-service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  constructor(private service: SimpleService2) { }

  ngOnInit(): void {
  }

}
