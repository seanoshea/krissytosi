import { Portfolio } from 'src/app/portfolio.model';
import { Photo } from 'src/app/photo.model';

const portfolioJSON: any = require('../mocked_responses/portfolios.json');
const photosJSON: any = require('../mocked_responses/photos.json');

export function mockedPortfolio() {
  this.portfolios = portfolioJSON['photosets']['photoset'].map(photoset => {
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
  return this.portfolios[0];
}

export function mockedPhoto() {
  const photos = photosJSON['photoset']['photo'].map(photo => {
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
  return photos[0];
}