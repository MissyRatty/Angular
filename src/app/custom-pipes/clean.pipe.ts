import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clean'
})
export class CleanPipe implements PipeTransform {
  private curseWordReplacement: string = "$%#@!";

  transform(value: string, badWords: string): string {
    if(value && badWords) {
      let curseWords = badWords.split(',').map((badWord) => badWord.trim());

      for (const word of curseWords) {
        if(value.includes(word)) {
          value = value.replace(word, this.curseWordReplacement)
        }
      }
    }
    return value;
  }

}
