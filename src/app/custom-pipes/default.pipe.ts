import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'default'
})
export class DefaultPipe implements PipeTransform {

  // value is the data you want to transform using your pipe
  // args is the config values you pass to the pipe. comes after the pipe
  // e.g.: {{pipesData.currency | currency: 'USD' : false}}
  // value = pipesData.currency
  // args = USD & false
  transform(value: string, fallback: string, forceHttps: boolean = false): string {
    let image = "";
    if(value) {
      image = value;
    } else {
      image = fallback;
    }

    if(forceHttps) {
     if(image.indexOf("https") === -1) {

       image = image.replace("http", "https");
     }
    }
    return image;
  }
}


// Notes:
// Use ng g p NameOfPipeWithoutPipeSuffix to create new pipe
// it will have the @Pipe decorator
// it will implement the PipeTransform Interface
// implement the transform method
// transform takes (the value to pipe, any config values to passed to the pipe)
// use pipes to transform data on demand in the template instead of storing an intermediate version of the data in the components, this is wasteful
