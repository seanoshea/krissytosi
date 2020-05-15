import { Component, OnInit } from '@angular/core';

import { PortfoliosService }         from '../portfolios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router, private service: PortfoliosService) { }

  loading:boolean = true;
  randomizedPortfolio;
  randomizedPhoto;

  ngOnInit() {
    this.service.observablePortfolios.subscribe(portfolios => {
      const first = this.randomizeFirstPortfolio();
      if (first) {
        this.service.fetchPhotos(first.id).subscribe(photos => {
          this.loading = false;
          this.randomizedPhoto = photos[0];
        });
      }
    });
  }

  randomizeFirstPortfolio() {
    const index = Math.floor(Math.random() * this.service.portfolios.length - 1)
    this.randomizedPortfolio = this.service.portfolios[index];
    return this.randomizedPortfolio;
  }

  mainScreenImagePressed() {
    this.service.selectedPortfolio = this.randomizedPortfolio;
    this.router.navigate(['/portfolio']);
  }
}
