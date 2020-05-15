import { Portfolio } from 'src/app/portfolio.model';

const portfolioJSON: any = require('./mocked_responses/portfolios.json');

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