import { TestBed } from '@angular/core/testing';

import { RouteGuardParamsGuard } from './route-guard-params.guard';

describe('RouteGuardParamsGuard', () => {
  let guard: RouteGuardParamsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RouteGuardParamsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
