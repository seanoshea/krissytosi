import { Component, OnInit } from '@angular/core';
import { PortfoliosService } from '../portfolios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.less']
})
export class PortfolioComponent implements OnInit {
  photos:any;

  constructor(private router: Router, private service: PortfoliosService) { }

  ngOnInit(): void {
    // ensure that we have at least a portfolio
    if (!this.service.selectedPortfolio) {
      this.router.navigate(['/']);
    } else {
      if (this.service.hasLoadedPhotosForPortfolio(this.service.selectedPortfolio)) {
        this.photos = this.service.photos[this.service.selectedPortfolio.id];
      } else {
        this.service.fetchPhotos(this.service.selectedPortfolio.id).subscribe(() => {
          this.photos = this.service.photos[this.service.selectedPortfolio.id];
        });
      }
    }
  }
}
