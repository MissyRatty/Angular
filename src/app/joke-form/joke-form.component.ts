import {
  Component,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Joke } from '../models/joke.model';

@Component({
  selector: 'app-joke-form',
  templateUrl: './joke-form.component.html',
  styleUrls: ['./joke-form.component.css'],
  //encapsulation: ViewEncapsulation.None, : this will let the .card css leak into all .card places
})
export class JokeFormComponent implements OnInit {
  @Output() jokeCreated = new EventEmitter<Joke>(); // helper class used to emit events when something happens: hmm is this like event listeners on ES5 ?
  //other components can bind and react to those events

  jokeForm: FormGroup;
  jokeSetup: FormControl;
  jokePunchLine: FormControl;

  constructor() {}

  ngOnInit(): void {
    this.createFormControls();
    this.createFormGroup();
  }

  createFormGroup(): void {
    this.jokeForm = new FormGroup({
      jokeSetup: this.jokeSetup,
      jokePunchLine: this.jokePunchLine
    });
  }

  createFormControls(): void {
    this.jokeSetup = new FormControl('', [Validators.required, Validators.maxLength(50)]);
    this.jokePunchLine = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  }

  createJoke(setupValue: string, punchLineValue: string) {
    //outputs an event, and the event will contain the Joke property
    if(this.jokeForm.valid) {
      if (setupValue && punchLineValue) {
        this.jokeCreated.emit(new Joke(setupValue, punchLineValue));

        this.jokeForm.reset();
      }
    }
  }
}
