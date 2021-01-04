import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpWithPromisesExampleComponent } from './http-with-promises-example.component';

describe('HttpWithPromisesExampleComponent', () => {
  let component: HttpWithPromisesExampleComponent;
  let fixture: ComponentFixture<HttpWithPromisesExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpWithPromisesExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpWithPromisesExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
