import { TestBed } from '@angular/core/testing';

import { TakeTestGuard } from './take-test.guard';

describe('TakeTestGuard', () => {
  let guard: TakeTestGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TakeTestGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
