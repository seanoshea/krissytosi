import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { asyncData } from './async-observable-helper';

import { Portfolio }          from '../app/portfolio.model';
import { Photo }          from '../app/photo.model';
import { PortfoliosService }   from '../app/portfolios.service';
import { testPortfolios, testPhotos } from './test-portfolios-photos';

@Injectable()
export class TestPortfoliosService extends PortfoliosService {

  constructor() {
    super(null);
  }

  mockedPortfolios = testPortfolios();
  mockedPhotos = testPhotos();

  fetch(): Observable<Portfolio[]> {
    return asyncData(this.portfolios)
  }

  fetchPhotos(id: number | string): Observable<Photo[]> {
    return asyncData(this.mockedPhotos);
  }

  get portfolios() {
      return this.mockedPortfolios;
  }

  set portfolios(p) {
    this.mockedPortfolios = p;
  }
}