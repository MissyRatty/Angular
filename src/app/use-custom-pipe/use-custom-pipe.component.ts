import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-use-custom-pipe',
  templateUrl: './use-custom-pipe.component.html',
  styleUrls: ['./use-custom-pipe.component.css']
})
export class UseCustomPipeComponent implements OnInit {

  imageUrl: string = "";
  
  constructor() { }

  ngOnInit(): void {
  }

}
