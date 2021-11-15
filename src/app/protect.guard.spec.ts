import { TestBed, async, inject } from '@angular/core/testing';

import { ProtectGuard } from './protect.guard';

describe('ProtectGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProtectGuard]
    });
  });

  it('should ...', inject([ProtectGuard], (guard: ProtectGuard) => {
    expect(guard).toBeTruthy();
  }));
});
