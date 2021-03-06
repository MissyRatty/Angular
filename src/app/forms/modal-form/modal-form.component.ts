import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailDomainValidator } from 'src/app/custom-form-validators/email-domain-validator';
import { CustomValidators } from 'src/app/custom-form-validators/helpers/custom-validators';
import { Language } from 'src/app/models/language.model';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css'],
})
export class ModalFormComponent implements OnInit {
  myForm: FormGroup; //this represents the form itself
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  language: FormControl;

  langs: Language[];

  constructor() {
    this.langs = [
      new Language('English', 'en'),
      new Language('French', 'fr'),
      new Language('German', 'ge'),
    ];
  }

  ngOnInit(): void {
    //instantiate the formGroup
    // 1. all form controls in the form : these rep the current state of the form controls (including their current values too)
    //  we can nest a formGroup in another formgroup (e.g.: the Fname & Lname in the view are both inside of another <fieldset>)
    //  so we will create a new formGroup and put those two formcontrols in it
    // Note: the top level FormGroup is only valid if the inner (formgroups/formcontrols) are also valid

    this.createFormControls();
    this.createForm();
  }

  createFormControls(): void {
    this.firstName = new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]);

    this.lastName = new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]);

    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[^  @]*@[^  @]*'),

      // adding a custom validator function
      // validation errors from this custom validator will be added the overall concatenated validationErrors object for this emailformControl
      // so in the html, on the email input text box, you can get check if this validation failed by:
      // checking  formControlName.ErrorsObject.CustomValidatorErrorObjectPropertyName => email.Errors.emailDomain
      // if email.Errors.emailDomain doesn't exist, then that means the validator was valid (hence returned null | no validation error object)

      // EmailDomainValidator,

      // using the factory Validator to return a validator func
      // the factory is wrapped in this CustomValidators class to expose the static method emailDomain
      // this was just to have my custom Validators usage syntax in line with the built.in Angular validators
      CustomValidators.emailDomain('gmail.com'),
    ]);

    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]);

    this.language = new FormControl('', Validators.required);
  }

  createForm(): void {
    this.myForm = new FormGroup({
      name: new FormGroup({
        firstName: this.firstName,
        lastName: this.lastName,
      }),
      email: this.email,
      password: this.password,
      language: this.language,
    });
  }

  onFormSubmit(): void {
    if (this.myForm.valid) {
      console.log('Form can be Submitted', this.myForm.value);

      //clear form entries when form is submitted
      this.onFormCancel();
    }
  }

  onFormCancel(): void {
    this.myForm.reset();
  }
}
