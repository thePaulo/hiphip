import { TestBed } from '@angular/core/testing';

import { TablezService } from './tablez.service';

describe('TablezService', () => {
  let service: TablezService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablezService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
