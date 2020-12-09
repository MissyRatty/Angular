import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-reactive-model-form',
  templateUrl: './reactive-model-form.component.html',
  styleUrls: ['./reactive-model-form.component.css']
})
export class ReactiveModelFormComponent implements OnInit, OnDestroy {
  searchField: FormControl;
  searches: string[] = [];

  searchFieldValueChangesSubscription: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.searchField = new FormControl();

    this.searchFieldValueChangesSubscription = this.searchField.valueChanges
    .pipe(
          debounceTime(800), // this will make the search field text box only emit value changes (stream) when it waits 400 ms without receiving any new input from the user
          distinctUntilChanged(), // only emit the value if the current value is different from the last value emitted
         ).subscribe(searchTerm => this.searches.push(searchTerm));
  }

  ngOnDestroy(): void {
    this.searchFieldValueChangesSubscription.unsubscribe();
  }

}
