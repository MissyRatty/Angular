import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpWithObservablesExampleComponent } from './http-with-observables-example.component';

describe('HttpWithObservablesExampleComponent', () => {
  let component: HttpWithObservablesExampleComponent;
  let fixture: ComponentFixture<HttpWithObservablesExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpWithObservablesExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpWithObservablesExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
