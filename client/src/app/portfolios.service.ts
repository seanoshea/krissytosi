import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Portfolio } from './portfolio.model';
import { Photo } from './photo.model';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class PortfoliosService {
  portfoliosUrl = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getList&user_id=91622522@N07&api_key=3426649638b25fe317be122d3fbbc1b1&format=json&jsoncallback=JSONP_CALLBACK';
  portfolioPhotosUrl = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&extras=url_m,url_o&photoset_id=${0}&api_key=3426649638b25fe317be122d3fbbc1b1&format=json&jsoncallback=JSONP_CALLBACK';
  // TODO: Where do I store this data?
  private portfolios: Portfolio[] = [];

  constructor(
    private loggerService: LoggerService, private http: HttpClient) { }

  fetch() {
    return this.http.jsonp(this.portfoliosUrl, 'callback').pipe(
      map(res => {
        return res['photosets']['photoset'].map(photoset => {
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
      })
    );
  }

  fetchPhotos(id:string) {
    const url = this.portfolioPhotosUrl.replace('${0}', id);
    return this.http.jsonp(url, 'callback').pipe(
      map(res => {
        return res['photoset']['photo'].map(photo => {
          return new Photo(
            photo.id,
            photo.title,
            photo.ispublic,
            photo.url_m,
            photo.height_m,
            photo.width_m,
            photo.url_o,
            photo.height_o,
            photo.width_o
          );
        });
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      this.loggerService.error(`An error occurred: ${error.error.message}`);
    } else {
      this.loggerService.error(
        `API code ${error.status}, body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}
