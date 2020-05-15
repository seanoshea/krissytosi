import { Component, OnInit } from '@angular/core';
import { PortfoliosService } from '../portfolios.service';
import { Portfolio } from '../portfolio.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less']
})
export class NavigationComponent implements OnInit {
  loading = true;
  constructor(public service: PortfoliosService, private router: Router) { }

  ngOnInit(): void {
    this.service.observablePortfolios.subscribe(() => {
      this.loading = false;  
    });
  }

  portfolioPressed(portfolio:Portfolio): void {
    this.service.selectedPortfolio = portfolio;
    this.router.navigate(['/portfolio']);
  }
}
