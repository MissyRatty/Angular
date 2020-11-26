import {
  Component,
  OnInit,
  AfterContentInit,
  AfterViewInit,
  ViewChild,
  ContentChild,
  ViewChildren,
  QueryList,
  ContentChildren,
  ElementRef,
} from '@angular/core';
import { Joke } from '../models/joke.model';
import { JokeComponent } from '../joke/joke.component';

@Component({
  selector: 'app-joke-list',
  templateUrl: './joke-list.component.html',
  styleUrls: ['./joke-list.component.css'],
})
export class JokeListComponent
  implements OnInit, AfterContentInit, AfterViewInit {
  //this will find jokecomponent in the joke-list(parent view)
  //if it finds more than one joke component, it will return the first one it finds: jokecomponent[0]
  //we can also use the viewChild decorator to get access to our template local variables in our component
  @ViewChild(JokeComponent) jokeViewChild: JokeComponent;

  //to get all the joke components that have been rendered in the parent, joke-list components, do:
  @ViewChildren(JokeComponent) jokeViewChildren: QueryList<JokeComponent>;

  //referencing template local variables, so we can store a reference to it
  @ViewChild('header') headerElement: ElementRef;

  @ContentChild(JokeComponent) jokeContentChild: JokeComponent;
  @ContentChildren(JokeComponent) jokeContentChildren: QueryList<JokeComponent>;

  jokes: Joke[] = [
    new Joke(
      'What did the cheese say when it looked in the mirror?',
      'Hillo-Me, well damn !! (Halloumi)'
    ),
    new Joke(
      'What kind of cheese do you use to disguise a small horse?',
      'boo Mask-a-pony, hell damn !!! (Mascarpone)'
    ),
    new Joke(
      'Just for Laughs?', 
      'hell I used to watch the damn thing.lol'),
  ];

  constructor() {
    //this will log out undefined:
    //since by this time, the children of this component's view wouldn't have been rendered yet
    //Angular renders in a Tree-Down approach, so when this parent Joke-List component is getting rendered,
    //child components like Joke component wouldn't have been rendered yet
    console.log(`new -jokeviewChild is ${this.jokeViewChild}`);

    console.log(`new -jokeContentChild is ${this.jokeContentChild}`);
  }

  ngOnInit(): void {}

  //hooking into view children
  ngAfterViewInit(): void {
    //at this point the child view has been initialized
    console.log(`ngAfterViewInit => jokeviewChild is ${this.jokeViewChild}`);

    let jokes: JokeComponent[] = this.jokeViewChildren.toArray();
    console.log(jokes);

    console.log(`ngAfterViewInit - headerElement is ${this.headerElement}`);
    //now we have access to the <h4> tag by doing .nativeElement, we can manipulate its DOM props
    this.headerElement.nativeElement.innerText = `${this.headerElement.nativeElement.innerText} - Best Joke Machine!`;
  }

  //hooking into content children
  ngAfterContentInit(): void {
    //at this point the content child has been initialized
    console.log(
      `ngAfterContentInit => jokeContentChild is ${this.jokeContentChild}`
    );

    let jokes: JokeComponent[] = this.jokeContentChildren.toArray();

    console.log(jokes);
  }
  // constructor() {
  //   this.jokes = [
  //     new Joke(
  //       'What did the cheese say when it looked in the mirror?',
  //       'Hello-Me (Halloumi)'
  //     ),
  //     new Joke(
  //       'What kind of cheese do you use to disguise a small horse?',
  //       'Mask-a-pony (Mascarpone)'
  //     ),
  //     new Joke(
  //       'A kid threw a lump of cheddar at me',
  //       "I thought 'That's not very mature'"
  //     ),
  //   ];
  // }

  // addJoke() {
  //   this.jokes.unshift(new Joke('New Joke Here ?', 'Not Today, hehehehehe.'));
  // }

  // deleteJokes() {
  //   this.jokes = [];
  // }

  // addJoke(joke: Joke) {
  //   //unshift is like a preprend( adds the item to the top of the array heap/stack not bottom, bottom is what push does)
  //   this.jokes.unshift(joke);
  // }

  // deleteJoke(joke: Joke) {
  //   let jokeToDeleteIndex = this.jokes.indexOf(joke);
  //   if (jokeToDeleteIndex > -1) {
  //     this.jokes.splice(jokeToDeleteIndex, 1);
  //   }
  // }
}

//view child are elements used within the component itself, We use the ViewChild decorator to access these view children
//content child are rather content-projected into the view of the component (uses the <ng-content> tag)
