import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Language } from 'src/app/models/language.model';
import { SignUp } from 'src/app/models/sign-up.model';

@Component({
  selector: 'app-template-driven-forms',
  templateUrl: './template-driven-forms.component.html',
  styleUrls: ['./template-driven-forms.component.css']
})
export class TemplateDrivenFormsComponent implements OnInit {
  signUpModel: SignUp = new SignUp();
  langs: Language[];

  //get a ref to the ngForm using a viewChild decorator (the form is a child element on the component view)
  @ViewChild("mySecondForm") 
  formViewChild: FormGroup;

  constructor() {
    this.langs = [
      new Language('English', 'en'), 
      new Language('French', 'fr'), 
      new Language('German', 'ge')];
   }

  ngOnInit(): void {
  }

  onFormSubmit(): void {
    if(this.formViewChild.valid) {
      console.log('form submitted', this.formViewChild.value);

      this.onFormCancel();
    }
  }

  onFormCancel(): void {
    this.formViewChild.reset();
  }

}
