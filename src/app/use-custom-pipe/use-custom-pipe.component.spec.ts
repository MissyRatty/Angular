import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseCustomPipeComponent } from './use-custom-pipe.component';

describe('UseCustomPipeComponent', () => {
  let component: UseCustomPipeComponent;
  let fixture: ComponentFixture<UseCustomPipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseCustomPipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseCustomPipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
