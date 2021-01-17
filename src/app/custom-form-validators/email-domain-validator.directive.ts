import {
  Directive,
  Inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
// import { EmailDomainValidator } from './email-domain-validator';
import { CustomValidators } from './helpers/custom-validators';

@Directive({
  selector: '[emailDomain] [ngModel]',

  // This was used when this Directive was using the EmailDomainValidator func as its provided validator
  // providers: [
  //   {
  //     provide: NG_VALIDATORS,
  //     useValue: EmailDomainValidator,
  //     // multi: true => this tells the DI framework to add the resolved instance/value of the validatorFunc(EmailDomainValidator) to the list of resolved Validators in NG_Validators
  //     multi: true,
  //   },
  // ],

  // OPTION 1: when using configured token / useValue in NgModule
  // use this to provide the EmailDomainValidatorDirective class as the custom validator
  // providers: [
  //   {
  //     provide: NG_VALIDATORS,
  //     useClass: EmailDomainValidatorDirective,
  //     multi: true,
  //   },
  // ],

  // OPTION 2: when using input prop in the template-driven form: <input nameOfDirective='''configurableValue"/>
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailDomainValidatorDirective,
      multi: true,
    },
  ],
})
export class EmailDomainValidatorDirective implements OnChanges {
  // this will map to the input prop on the emailDomain directive on the template-driven form
  @Input('emailDomain') emailDomain: string;

  private valFunc: ValidatorFn;

  // Option 1: when the configurable value is registered as a provider.useValue in the NgModule
  // inject the RequiredDomain token in the constructor

  // constructor(@Inject('RequiredDomain') requiredDomain: string) {
  //   // use the factory func to get an instance of a validator func and assign that to the local valFunc
  //   this.valFunc = CustomValidators.emailDomain(requiredDomain);
  // }

  // adding this bit to support using this directive on template-driven forms
  validate(control: AbstractControl): ValidationErrors | null {
    return this.valFunc(control);
  }

  // Option 2: when the configurable value is passed as in input prop config to the directive in the html
  // use this lifecycle hook to find out when input props of this Directive have changed
  // you can get what the previous and current values are from this hook
  ngOnChanges(changes: SimpleChanges): void {
    // this bit is just for debugging
    for (let key in changes) {
      console.log('ValidatorOnChanges');
      console.log(`${key} changed.
      Current: ${changes[key].currentValue}.
      Previous: ${changes[key].previousValue}`);
    }

    // we could have also used the value from changes["emailDomain"].currentValue
    // this.emailDomain = changes['emailDomain'].currentValue
    if (this.emailDomain) {
      this.valFunc = CustomValidators.emailDomain(
        this.emailDomain
        // changes['emailDomain'].currentValue
      );
    } else {
      // this will always return null, which for this validator, if it returns null, then it passed
      this.valFunc = Validators.nullValidator;
    }
  }
}
