import { Component, OnInit } from '@angular/core';

import { Portfolio }                from '../portfolio.model';
import { PortfoliosService }         from '../portfolios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  portfolios: Portfolio[];
  selectedPortfolio: Portfolio;

  constructor(private service: PortfoliosService) { }

  ngOnInit() {
    this.service.fetch().subscribe(portfolios => {
      this.portfolios = portfolios;
      this.service.fetchPhotos(this.portfolios[0].id).subscribe(photos => {
        console.warn(photos[0]);
      });
    });
  }
}
