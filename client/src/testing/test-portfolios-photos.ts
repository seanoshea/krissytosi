const portfolioJSON: any = require('../testing/mocked_responses/portfolios.json');
const photosJSON: any = require('../testing/mocked_responses/photos.json');

export function testPortfolios() {
  return portfolioJSON;
}

export function testPhotos() {
  return photosJSON;
}