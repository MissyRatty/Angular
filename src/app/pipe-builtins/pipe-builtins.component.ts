import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { PipesModel } from '../models/pipes.model';

@Component({
  selector: 'app-pipe-builtins',
  templateUrl: './pipe-builtins.component.html',
  styleUrls: ['./pipe-builtins.component.css']
})
export class PipeBuiltinsComponent implements OnInit, OnDestroy {
  private jsonVal: object;
  title: string;
  pipesData: PipesModel;
  items = new Array<number>();

  promiseData: string = "hahahaha";
  promise: Promise<string>;

  observableData: number;
  observable: Observable<number>;
  subscription: Subscription = null;

  constructor() {
    this.getPromise().then(data => {
      this.promiseData = data as string
      console.log('my data => ' + this.promiseData);
    });

    //NB: store the subscription so that we can unsubscribe when this component gets destroyed
    this.subscription = this.getObservable().subscribe(value => this.observableData = value);

    //the async pipe will handle unsubscribing when the observable is no longer needed
    this.observable = this.getObservable();

    this.promise = this.getPromise();
    
    this.items = [1, 2, 3, 4, 5, 6];

    this.jsonVal = { moo: 'foo', goo: { too: 'new'} };
    this.title = 'Pipes';

    this.pipesData = new PipesModel(
      1234.56,
      new Date(),
      2.3456,
      this.jsonVal,
      'LowerCasing',
      'UpperCasing',
      0.123456,
      this.items);
   }

  ngOnInit(): void {
  }

  getPromise(): Promise<string>{
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve('Promise completed!!!'), 2000);
    });
  }

  getObservable(): Observable<number>{
    return interval(1000).pipe(take(10), map((value) => value * value));
  }

  //unsubscribe from subscriptions when the component is destroyed
  ngOnDestroy(): void {
    //check that there is a subscription before unsubscribing
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}

// Pipes: for applying data transformations to data to be showin in templates

// Currency Pipe => Format a number as a Currency
// 1. It accepts as first Argument is the currency's abbreviation e.g,: EUR for euro, USD for us dollars etc
// 2. Second param is the currency symbol, e.g.: {{ 12345 | currency: 'GHC':true}}

// Date Pipe => Format dates
// 1. First param is a date format string e.g.: 'shortDate', 'fullDate', 'd/M/y' etc

// Decimal Pipe => Format decimals
// uses the number pipe and takes the format: number: 'minNumberOfIntDigits.minNumOfFractionDigits-maxNumOfFractionDigits'
// this will round it off after the number of max frac digits. e.g. 2.3456 => 002.35

// Json Pipe => format json, use this to print out the content of an object
// uses the json pipe

// LoverCase & UppercasePipe => formats text to Capital and Small letters

// Percent Pipe => formats a number as a percent
// it can also format it like a decimal to show up to a certain number of decimal places


// Slice Pipe => for slicing up an array and getting some parts of it (think of it like a slice of cake from a full cake lol)
// first arg : start index of the slice
// second arg : end index of the slice
// you can add -ve indexes to be the offset from the end
// if you had slice: 1:3, this will select the 2nd item in your array up to the 3rd item in the array cause it excludes the one in position 3
// as that is the end of the slice.
// you can even use the slice pipe in a for loop

// Async Pipe => accepts an observable/promise and render the output without having to call the then/subscribe funcs
// Note: subscribe to Observables & then to Promises: Observable.subscribe() || Promise.then().catch().finally
// async pipe  for promises: automatically calls then()
// for observables: automatically calls subscribe() & unsubscribe()
// makes rendering data from observables and promises on templates easily


