import { Injectable } from "@angular/core";
import { OtherService } from "./other-service";

@Injectable()
export class SimpleService {
    otherService: OtherService;

    constructor(otherService: OtherService){
        this.otherService = otherService;
    }
}


//Note: @Injectable is the shortcut for having to mark/decorate every parameter in the constructor of this service class with 
//the @Inject(NameOfServiceToInject/TheTokenName)

//So add the @Injectable() decorator to every service class that you would want the Angular DI framework to inject instances of other dependencies
//into it for ya


//you can mark a dependency param in a ctor with @Inject(NameOfServiceToInject/TokenName) otherService: OtherService