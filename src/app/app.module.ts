import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FirstComponent } from './first/first.component';
import { JokeComponent } from './joke/joke.component';
import { JokeListComponent } from './joke-list/joke-list.component';
import { JokeFormComponent } from './joke-form/joke-form.component';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NgForExampleComponent } from './ng-for-example/ng-for-example.component';
import { NgForGroupedExampleComponent } from './ng-for-grouped-example/ng-for-grouped-example.component';
import { NgIfExampleComponent } from './ng-if-example/ng-if-example.component';
import { NgSwitchExampleComponent } from './ng-switch-example/ng-switch-example.component';
import { NgStyleExampleComponent } from './ng-style-example/ng-style-example.component';
import { NgClassExampleComponent } from './ng-class-example/ng-class-example.component';
import { NgNonBindableExampleComponent } from './ng-non-bindable-example/ng-non-bindable-example.component';
import { RecentArticlesComponent } from './recent-articles/recent-articles.component';

import { CardHoverDirective } from './card-hover.directive';
import { RolloverImageDirective } from './rollover-image.directive';
import { ShowImagesComponent } from './show-images/show-images.component';
import { FormAppComponent } from './form-app/form-app.component';
import { PipeBuiltinsComponent } from './pipe-builtins/pipe-builtins.component';
import { DefaultPipe } from './custom-pipes/default.pipe';
import { UseCustomPipeComponent } from './use-custom-pipe/use-custom-pipe.component';
import { CleanPipe } from './custom-pipes/clean.pipe';
import { ModalFormComponent } from './forms/modal-form/modal-form.component';
import { ReactiveModelFormComponent } from './forms/reactive-model-form/reactive-model-form.component';
import { TemplateDrivenFormsComponent } from './forms/template-driven-forms/template-driven-forms.component';
import { DependencyInjectionExampleComponent } from './dependency-injection-examples/dependency-injection-example/dependency-injection-example.component';
import { SimpleComponent } from './service-examples/simple/simple.component';
import { SimpleService } from './service-examples/simple-service';
import { OtherService } from './service-examples/other-service';
import { ChildComponent } from './configuring-providers/child/child.component';
import { ParentComponent } from './configuring-providers/parent/parent.component';
import { SimpleService2 } from './configuring-providers/simple-service';
import { JokeService } from './joke/joke.service';
import { MAX_JOKES_TOKEN } from './joke/joke.constants';

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    JokeComponent,
    JokeListComponent,
    JokeFormComponent,
    CarouselItemComponent,
    CarouselComponent,
    NgForExampleComponent,
    NgForGroupedExampleComponent,
    NgIfExampleComponent,
    NgSwitchExampleComponent,
    NgStyleExampleComponent,
    NgClassExampleComponent,
    NgNonBindableExampleComponent,
    RecentArticlesComponent,
    CardHoverDirective,
    RolloverImageDirective,
    ShowImagesComponent,
    FormAppComponent,
    PipeBuiltinsComponent,
    DefaultPipe,
    UseCustomPipeComponent,
    CleanPipe,
    ModalFormComponent,
    ReactiveModelFormComponent,
    TemplateDrivenFormsComponent,
    DependencyInjectionExampleComponent,
    SimpleComponent,
    ChildComponent,
    ParentComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, CommonModule, ReactiveFormsModule],
  providers: [
    SimpleService, 
    OtherService, 
    SimpleService2, 
    JokeService, 
    { provide: MAX_JOKES_TOKEN, useValue: 4 }
  ], //these services will be available in the app top level injector
  bootstrap: [AppComponent], // root component for our application
})
export class AppModule {}

// Package together related components into an Angular Module
// Angular modules structures angular code into packages
// Combines code from different files into one package
