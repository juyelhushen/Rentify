import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authurizationGuard } from './authurization.guard';

describe('authurizationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authurizationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
