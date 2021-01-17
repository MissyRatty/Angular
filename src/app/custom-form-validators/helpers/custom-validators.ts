import { EmailDomainValidatorFactory } from '../factories/email-domain-validator-factory';

export class CustomValidators {
  static emailDomain(requiredDomain: string) {
    return EmailDomainValidatorFactory(requiredDomain);
  }
}
