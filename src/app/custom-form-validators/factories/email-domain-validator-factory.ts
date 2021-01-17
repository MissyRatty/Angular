import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function EmailDomainValidatorFactory(
  requiredDomain: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let email = control.value as string;

    if (email && email.indexOf('@') != -1) {
      let emailParts = email.split('@');

      if (emailParts && emailParts.length > 1) {
        let domain = emailParts[1];

        if (domain !== requiredDomain) {
          return {
            emailDomain: true,
            expectedDomain: requiredDomain,
          };
        }
      }
    }
    return null;
  };
}
