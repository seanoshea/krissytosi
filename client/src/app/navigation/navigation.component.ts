import { Component, OnInit } from '@angular/core';
import { PortfoliosService } from '../portfolios.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less']
})
export class NavigationComponent implements OnInit {
  loading = true;
  constructor(public service: PortfoliosService) { }

  ngOnInit(): void {
    this.service.observablePortfolios.subscribe(p => {
      this.loading = false;  
    });
  }
}
