import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { asyncData } from './async-observable-helper';

import { Portfolio }          from '../app/portfolio.model';
import { Photo }          from '../app/photo.model';
import { PortfoliosService }   from '../app/portfolios.service';

const portfolioJSON: any = require('../testing/mocked_responses/portfolios.json');
const photosJSON: any = require('../testing/mocked_responses/photos.json');

@Injectable()
export class TestPortfoliosService extends PortfoliosService {

  constructor() {
    super(null);
  }

  mockedPortfolios = portfolioJSON;
  mockedPhotos = photosJSON;

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

@Injectable()
export class MockedPortfoliosService extends PortfoliosService {
  constructor() {
    super(null);
  }

  get portfolios() {
    return portfolioJSON['photosets']['photoset'].map(photoset => {
      return new Portfolio(
        photoset.id,
        photoset.owner,
        photoset.username,
        photoset.primary,
        photoset.count_photos,
        photoset.count_videos,
        photoset.title['_content'],
        photoset.visibility_can_see_set
      );
    });
  }

  set portfolios(p) {
  }
}