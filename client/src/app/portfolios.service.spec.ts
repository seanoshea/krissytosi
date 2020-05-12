import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PortfoliosService } from './portfolios.service';

describe('PortfoliosService', () => {
  let service: PortfoliosService;

  beforeEach(() => {
    service = TestBed.inject(PortfoliosService);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [PortfoliosService]
    })
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
