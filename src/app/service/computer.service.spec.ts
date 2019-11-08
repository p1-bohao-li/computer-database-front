import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComputerService } from './computer.service';

describe('ComputerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: ComputerService = TestBed.get(ComputerService);
    expect(service).toBeTruthy();
  });
});
