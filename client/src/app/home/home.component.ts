import { Component, OnInit } from '@angular/core';

import { Portfolio }                from '../portfolio.model';
import { PortfoliosService }         from '../portfolios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor(private service: PortfoliosService) { }

  loading:boolean = true;
  randomizedPortfolio;
  randomizedPhoto;

  ngOnInit() {
    this.service.fetch().subscribe(portfolios => {
      this.service.fetchPhotos(this.randomizeFirstPortfolio().id).subscribe(photos => {
        this.loading = false;
        this.randomizedPhoto = photos[0];
      });
    });
  }

  randomizeFirstPortfolio() {
    const index = Math.floor(Math.random() * this.service.portfolios.length - 1)
    this.randomizedPortfolio = this.service.portfolios[index];
    return this.randomizedPortfolio;
  }

  mainScreenImagePressed() {

  }
}
