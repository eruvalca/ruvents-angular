import { TestBed } from '@angular/core/testing';

import { RuventsService } from './ruvents.service';

describe('RuventsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RuventsService = TestBed.get(RuventsService);
    expect(service).toBeTruthy();
  });
});
