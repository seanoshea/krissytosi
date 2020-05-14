import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PortfoliosService } from '../portfolios.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less']
})
export class NavigationComponent implements OnInit {
  portfolios: any;
  constructor(private service: PortfoliosService) { }

  ngOnInit(): void {
    this.service.observablePortfolios.subscribe(p => {
      console.warn('Found em', p);
      this.portfolios = p;
      // this.crowd= item;
    });
  }
}
