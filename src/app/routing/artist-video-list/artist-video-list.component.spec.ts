import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistVideoListComponent } from './artist-video-list.component';

describe('ArtistVideoListComponent', () => {
  let component: ArtistVideoListComponent;
  let fixture: ComponentFixture<ArtistVideoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistVideoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistVideoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
