import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencyInjectinExampleComponent } from './dependency-injection-example.component';

describe('DependencyInjectinExampleComponent', () => {
  let component: DependencyInjectinExampleComponent;
  let fixture: ComponentFixture<DependencyInjectinExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DependencyInjectinExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DependencyInjectinExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
