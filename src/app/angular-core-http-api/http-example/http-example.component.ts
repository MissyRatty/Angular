import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-http-example',
  templateUrl: './http-example.component.html',
  styleUrls: ['./http-example.component.css']
})
export class HttpExampleComponent implements OnInit, OnDestroy {

  apiRootValue: string = environment.apiRoot;

  // GETS
  subscription: Subscription = null;
  subscription2: Subscription = null;

  // DELETEs
  subscription3: Subscription = null;
  subscription4: Subscription = null;

  // POSTs
  subscription5: Subscription = null;
  subscription6: Subscription = null;

  // PUTs
  subscription7: Subscription = null;
  subscription8: Subscription = null;


  // inject http client library here
  constructor(private httpClient: HttpClient) { 

  }

  ngOnInit(): void {
  }

  doGet(): void {
    console.log("GET called");
    let getUrl = `${this.apiRootValue}/get`;

    // get request with no query params
    this.subscription = this.httpClient.get(getUrl, {responseType: 'json'}).subscribe(response => console.log(response));

    // a get request with query params:
    let params = new HttpParams().set('foo', 'moo').set('limit', '25');

    this.subscription2 = this.httpClient.get(getUrl, { params: params, responseType: 'text'} ).subscribe(response => console.log(response));
  }

  doPost(): void {
    console.log('POST called');

    let postUrl = `${this.apiRootValue}/post`;

    // post request with no query params
    this.subscription5 = this.httpClient.post(postUrl, {moo: 'loo', foo: 'goo'}, {responseType: 'json'}).subscribe(response => console.log(response));

    // a post request with query params:
    let params = new HttpParams().set('foo', 'moo').set('limit', '25');

    this.subscription6 = this.httpClient.post(postUrl, {moo: 'loo', foo: 'goo'}, { params: params, responseType: 'text'} ).subscribe(response => console.log(response));
  }

  doPut(): void {
    console.log('PUT called');

    let putUrl = `${this.apiRootValue}/put`;

    // put request with no query params
    this.subscription7 = this.httpClient.put(putUrl, {moo: 'loo', foo: 'goo'}, {responseType: 'json'}).subscribe(response => console.log(response));

    // a put request with query params:
    let params = new HttpParams().set('foo', 'moo').set('limit', '25');

    this.subscription8 = this.httpClient.put(putUrl, {moo: 'loo', foo: 'goo'}, { params: params, responseType: 'text'} ).subscribe(response => console.log(response));
  }

  doDelete(): void {
    console.log('DELETE called');

    let deleteUrl = `${this.apiRootValue}/delete`;

    // delete request with no query params
    this.subscription3 = this.httpClient.delete(deleteUrl, {responseType: 'json'}).subscribe(response => console.log(response));

    // a delete request with query params:
    let params = new HttpParams().set('id', 'moo').set('type', '25');

    this.subscription4 = this.httpClient.delete(deleteUrl, { params: params, responseType: 'text'} ).subscribe(response => console.log(response));
  }

  doGetAsPromise(): void {
    console.log('GET as Promise called');

    let getUrl = `${this.apiRootValue}/get`;

    // get request with no query params but converting the Observable to a promise
    // hence, using the then handler instead of the subscribe handler
    this.httpClient.get(getUrl, {responseType: 'json'}).toPromise().then((response) => console.log(response));
    

    // a get request with query params but converting the Observable to a promise
    // hence, using the then handler instead of the subscribe handler
    let params = new HttpParams().set('foo', 'moo').set('limit', '25');

    this.httpClient.get(getUrl, { params: params, responseType: 'text'} ).toPromise().then(response => console.log(response));
  }

  doGetAsPromiseError(): void {
    console.log('GET as Promise Error called');

    // simulate an error by calling the wrong endpoint
    let getUrl = `${this.apiRootValue}/put`;

    // get request with no query params but converting the Observable to a promise and catch the error
    // hence, using the then handler instead of the subscribe handler
    this.httpClient.get(getUrl, {responseType: 'json'})
      .toPromise()
      .then((response) => console.log(response))
      .catch((error) => console.error(`Error: ${error.status} ${error.statusText}`));
    

    // a get request with query params but converting the Observable to a promise and catch the error
    // hence, using the then handler instead of the subscribe handler
    let params = new HttpParams().set('foo', 'moo').set('limit', '25');

    this.httpClient.get(getUrl, { params: params, responseType: 'text'} )
      .toPromise()
      .then(response => console.log(response))
      .catch((error) => console.error(`Error: ${error.status} ${error.statusText}`));
  }

  doGetAsObservableError(): void {
    console.log('GET as Observable Error called');

     // simulate an error by calling the wrong endpoint
     let getUrl = `${this.apiRootValue}/post`;

     // get request with no query params and handle the error
     // hence, passing a second param in the subscribe as the error handler
     this.httpClient.get(getUrl, {responseType: 'json'})
       .subscribe(
         response => console.log(response),
         error => console.error(`Error: ${error.status} ${error.statusText}`)
         );
     
 
     // a get request with query params and handle the error
     // hence, passing a second param in the subscribe as the error handler
     let params = new HttpParams()
      .set('foo', 'moo')
      .set('limit', '25');
 
     this.httpClient.get(getUrl, { params: params, responseType: 'text'} )
       .subscribe(
         response => console.log(response),
         error => console.error(`Error: ${error.status} ${error.statusText}`)
         );
  }

  doGetWithHeaders(): void {
    console.log('GET With Headers called');

    // create Http Auth header (using the btoa js func to convert username:password to base64)
    // note: HttpHeaders is immutable, hence any operation on a new HttpHeader instance, returns another (new httpHeader instance)
    // so you can't do: let headers = new HttpHeaders; headers.append('','');
    // rather you will have to re-assign the results of headers.append('','') to the headers variable as headers.append('','') returns a new instance of HttpHeaders
    const headers = new HttpHeaders().append('Authorization', btoa('myusername:mypassword'));

    // a get request with query params:
    let params = new HttpParams().set('foo', 'moo').set('limit', '25'); 

    let getUrl = `${this.apiRootValue}/get`;

    this.httpClient.get(getUrl, { headers, params })
    .toPromise()
    .then(response => console.log(response))
    .catch(error => `Error: ${error.status} ${error.statusText}`);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();

    this.subscription3.unsubscribe();
    this.subscription4.unsubscribe();

    this.subscription5.unsubscribe();
    this.subscription6.unsubscribe();

    this.subscription7.unsubscribe();
    this.subscription8.unsubscribe();
  }
}
