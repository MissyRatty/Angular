import { AbstractControl, ValidationErrors } from '@angular/forms';

export function EmailDomainValidator(
  control: AbstractControl
): ValidationErrors | null {
  let email = control.value as string;

  if (email && email.indexOf('@') != -1) {
    let domain = email.split('@')[1];

    if (domain !== 'gmail.com') {
      //this returned object will be appended unto the ValidationErrors object (which is as concatenation of all validation errors from validators)
      return { emailDomain: domain };
    }
  }
  return null;
}
