import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { PortfoliosService } from './portfolios.service';

import { asyncData, asyncError } from '../testing/async-observable-helper';
const portfolioJSON: any = require('../testing/mocked_responses/portfolios.json');
const photosJSON: any = require('../testing/mocked_responses/photos.json');

describe('PortfoliosService', () => {
  let httpClientSpy: { jsonp: jasmine.Spy };
  let service: PortfoliosService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['jsonp']);
    service = new PortfoliosService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Portfolios', () => {
    it('should return expected portfolios', () => {
      httpClientSpy.jsonp.and.returnValue(asyncData(portfolioJSON));

      service.fetch().subscribe(
        portfolios => expect(portfolios.length).toEqual(4, 'expected portfolios'),
        fail
      );
      expect(httpClientSpy.jsonp.calls.count()).toBe(1, 'one call');
    });

    it('should return an error when the server returns a 404', () => {
      const errorResponse = new HttpErrorResponse({
        error: 'test 404 error',
        status: 404, statusText: 'Not Found'
      });

      httpClientSpy.jsonp.and.returnValue(asyncError(errorResponse));

      service.fetch().subscribe(
        portfolios => fail('expected an error, not portfolios'),
        error  => expect(error.message).toContain('404 Not Found')
      );
    });
  });

  describe('Photos', () => {
    it('should return photos for a given portfolio', () => {
      httpClientSpy.jsonp.and.returnValue(asyncData(photosJSON));

      service.fetchPhotos('1').subscribe(
        photos => expect(photos.length).toEqual(17, 'expected photos'),
        fail
      );
      expect(httpClientSpy.jsonp.calls.count()).toBe(1, 'one call');
    });

    it('should return an error when the server returns a 404', () => {
      const errorResponse = new HttpErrorResponse({
        error: 'test 404 error',
        status: 404, statusText: 'Not Found'
      });

      httpClientSpy.jsonp.and.returnValue(asyncError(errorResponse));

      service.fetchPhotos('1').subscribe(
        photos => fail('expected an error, not photos'),
        error  => expect(error.message).toContain('404 Not Found')
      );
    });
  });
});
