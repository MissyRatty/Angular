import { Inject, Injectable } from '@angular/core';
import { Joke } from '../models/joke.model';
import { MAX_JOKES_TOKEN } from '../joke/joke.constants';

@Injectable({
  providedIn: 'root'
})
export class JokeService {
  public jokes: Joke[];

  constructor(@Inject(MAX_JOKES_TOKEN) public maxNumberOfJokes: number) { }

  addJoke(joke: Joke): void {

    if(this.jokes.length == this.maxNumberOfJokes) {
      this.jokes.pop();
    }
    else if(this.jokes.length > this.maxNumberOfJokes) {
      this.jokes.splice(this.maxNumberOfJokes, (this.jokes.length - this.maxNumberOfJokes));
    }

    //add the new joke to the start of the array
    this.jokes.unshift(joke);
  }

  deleteJoke(joke: Joke): void {
    let jokeToDeleteIndex = this.jokes.indexOf(joke);
    if (jokeToDeleteIndex > -1) {
      //at position jokeToDeleteIndex, remove 1 item from the jokes array
      this.jokes.splice(jokeToDeleteIndex, 1);
    }
  }

}
