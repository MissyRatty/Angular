import { Component, OnInit } from '@angular/core';
import { SimpleService } from '../simple-service';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.css']
})
export class SimpleComponent implements OnInit {

  //inject an instance of SimpleService into this SimpleComponent Ctor
  constructor(private simpleService: SimpleService) { }

  ngOnInit(): void {
  }

}


//@Injectable() was not needed on the component although the component has a simpleService dependency injected in its ctor
//reason being: Angular already performs the Injectable functionality with the @Component decorator