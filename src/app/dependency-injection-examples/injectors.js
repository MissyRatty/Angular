"use strict";
exports.__esModule = true;
var core_1 = require("@angular/core");
var MandrillService = /** @class */ (function () {
    function MandrillService() {
    }
    return MandrillService;
}());
;
var SendGridService = /** @class */ (function () {
    function SendGridService() {
    }
    return SendGridService;
}());
;
var EmailService = /** @class */ (function () {
    function EmailService() {
    }
    return EmailService;
}());
;
var GenericService = /** @class */ (function () {
    function GenericService() {
    }
    return GenericService;
}());
;
//configuring an injector with providers (providers can be names of the classes we wish to resolve)
//this is the shortcut for creating a provider like this => {provide: MandrillService, useClass: MandrillService}
// where token(provide) has the same Name&Type as the useClass: name
var injector = core_1.ReflectiveInjector.resolveAndCreate([
    MandrillService,
    SendGridService,
    EmailService
]);
//create a child injector from the parent injector
var childInjector = injector.resolveAndCreateChild([EmailService]);
//passing a token (class name) to an injector for it to resolve it into a required instance of a dependency
var emailService1 = injector.get(MandrillService); // this is equivalent to let emailService = new MandrillService();
var emailService2 = injector.get(MandrillService);
console.log(emailService1); // this returns an instance of MandrillService()
//Injectors cache dependencies so that the same call for the same dependency returns the same instance of the dependency
console.log(emailService1 === emailService2); // exactly the same instance of the class (or same object)
//parent and child injectors with the same dependency token don't return the same instance of the dependency
var parentEmailService = injector.get(EmailService);
var childEmailService = childInjector.get(EmailService);
console.log('Is parent dependency instance same as child ? ', parentEmailService === childEmailService); // this returns false
//if a child injector cannot resolve a token to get its mapped dependency
// it forwards the dependency resolution request unto its parent injector
//create a child injector from the parent injector
var childInjector1 = injector.resolveAndCreateChild([]);
//parent and child injectors with the same dependency token don't return the same instance of the dependency
var parentEmailService1 = injector.get(EmailService);
var childEmailService1 = childInjector1.get(EmailService);
console.log('Is parent dependency instance same as child ? ', parentEmailService1 === childEmailService1); //this returns true
//Using Classes as provider values
// Create Injector using providers
// Configure Provider to provide a class
var injector1 = core_1.ReflectiveInjector.resolveAndCreate([
    { provide: 'MandrillService', useClass: MandrillService },
    { provide: 'SendGridService', useClass: SendGridService },
    { provide: 'EmailService', useClass: EmailService }
]);
var emailServiceFinal = injector1.get('EmailService');
var mandrillService = injector1.get('MandrillService');
var sendGridService = injector1.get('SendGridService');
console.log('Email service instance => ', emailServiceFinal);
console.log('Mandrill service instance => ', mandrillService);
console.log('Send Grid service instance => ', sendGridService);
// Create Injector using providers
// Configure Provider to use an existing resolved dependency class
var injector2 = core_1.ReflectiveInjector.resolveAndCreate([
    { provide: GenericService, useClass: GenericService },
    { provide: 'MandrillService', useExisting: GenericService },
    { provide: 'SendGridService', useExisting: GenericService },
    { provide: 'EmailService', useExisting: GenericService }
]);
var genericService = injector2.get(GenericService);
var mandrillService1 = injector2.get('MandrillService');
var sendGridService1 = injector2.get('SendGridService');
var emailService3 = injector2.get('EmailService');
console.log('Generic service instance => ', genericService);
console.log('Mandrill service instance => ', mandrillService1);
console.log('Send Grid service instance => ', sendGridService1);
console.log('Email service instance => ', emailService3);
console.log(genericService === mandrillService1);
console.log(sendGridService1 === emailService3);
//Using Specific Values as provider values
// Create Injector using providers
// Configure Provider to resolve to a specific value
//e.g.: storing an api key
var injector3 = core_1.ReflectiveInjector.resolveAndCreate([
    { provide: 'ApiKey', useValue: 'MyApiKey' }
]);
var apiKey = injector3.get('ApiKey');
console.log('Api Key resolved value => ' + apiKey);
//Using Aliases as provider values
// Create Injector using providers
// Configure Provider to resolve to a specific value where the value is an object
//e.g.: storing a config with api values
var injector4 = core_1.ReflectiveInjector.resolveAndCreate([
    { provide: 'Config', useValue: {
            'apiKey': 'RAHMAT',
            'apiSecret': '1234567890'
        } }
]);
var apiConfigValues = injector4.get('Config');
console.log('Api Key => ' + apiConfigValues.apiKey);
console.log('Api Secret => ' + apiConfigValues.apiSecret);
//main problem with passing the config as an object is that, any part of the application could
//potentially change/update the resolved config value and that will end up changing it for the whole system
//e.g.:
var config = injector4.get('Config');
config['apiKey'] = 'apiKeyUpdated';
var config2 = injector4.get('Config');
console.log('Api Key Now => ' + config2.apiKey); //this now prints apiKeyUpdated instead of RAHMAT
//To prevent any part of the application from updating the config properties in the object,
//use the Object.Freeze({}) as the useValue: this will make the props of the object read-only
//and hence, cannot be assigned any values
var injector5 = core_1.ReflectiveInjector.resolveAndCreate([
    { provide: 'Config1', useValue: Object.freeze({
            'apiKey': 'RAHMAT',
            'apiSecret': '1234567890'
        }) }
]);
var apiConfigValues1 = injector5.get('Config1');
console.log('Api Key => ' + apiConfigValues1.apiKey);
console.log('Api Secret => ' + apiConfigValues1.apiSecret);
// with Object.freeze, this will not allow any updates to the config object specified on lijne 141
//let config3= injector5.get('Config1');
//config3['apiKey'] = 'apiKeyUpdated'; //so this will throw an error that you can't update a readonly property
//let config4 = injector5.get('Config1');
//console.log('Api Key Now => ' + config4.apiKey); //this will print RAHMAT as it hasn't changed
// Using Factories (func) as provider values
//Configure a provider to call a function everytime a token - dependency resolution is requested
// This is the useFactory approach like so:
var isProd = false;
var injector6 = core_1.ReflectiveInjector.resolveAndCreate([
    { provide: 'testService', useFactory: function () {
            return isProd ? new MandrillService() : new SendGridService();
        } }
]);
var service1 = injector6.get('testService');
var service2 = injector6.get('testService');
console.log('Are both service instances from the factory the same => ', service1 === service2);
//Types of Tokens
// String (not recommended): as this could cause token name clashes but using the injectionToken way, resolves this issue
var injector7 = core_1.ReflectiveInjector.resolveAndCreate([
    { provide: 'TokenNameHere', useValue: 'ValueHere' },
    { provide: 'TokenName2', useClass: EmailService },
    { provide: 'TokenName3', useExisting: 'TokenName2' },
    { provide: 'TokenName4', useFactory: function () {
            return isProd ? 'ValueWhenIsProd' : 'ValueWhenIsNotProd';
        } }
]);
var dependencyValues = injector7.get('TokenName2');
var dependencyValues2 = injector7.get('TokenName3');
console.log(dependencyValues, dependencyValues2);
console.log('Same dependency values => ', dependencyValues === dependencyValues2);
// Typed names like name of class:
var injector8 = core_1.ReflectiveInjector.resolveAndCreate([
    { provide: EmailService, useClass: EmailService }
]);
var emailServiceNow = injector8.get(EmailService);
console.log(emailServiceNow);
// Injection Tokens: injection token name can be anything you want
// you can have two injectionTokens with the same descriptive texts, they are considered as two different objects
//e.g.: let apiKeyValueToken = new InjectionToken('ApiKeyValue');  let apiKeyValueToken2 = new InjectionToken('ApiKeyValue');
// this will not cause the IoC resolver to resolve to the same dependency but to two different dependencies if you used like so:
// let apiKeyValueNow = injector9.get(apiKeyValueToken); let apiKeyValueNow2 = injector9.get(apiKeyValueToken);
// while the provider was set up like below:
// { provide: apiKeyValueToken, useValue: 'MyValueHere'},
// { provide: apiKeyValueToken, useValue: 'MyOtherValueHere'}
var apiKeyValueToken = new core_1.InjectionToken('ApiKeyValue');
var injector9 = core_1.ReflectiveInjector.resolveAndCreate([
    { provide: apiKeyValueToken, useValue: 'MyValueHere' }
]);
var apiKeyValueNow = injector9.get(apiKeyValueToken);
console.log('token name is => ' + apiKeyValueToken + ' with value => ', apiKeyValueNow);
