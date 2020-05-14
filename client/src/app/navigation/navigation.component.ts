import { Component, OnInit } from '@angular/core';
import { PortfoliosService } from '../portfolios.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less']
})
export class NavigationComponent implements OnInit {
  // doesnt feel right to duplicate this data.
  portfolios: any;
  constructor(private service: PortfoliosService) { }

  ngOnInit(): void {
    this.service.observablePortfolios.subscribe(p => {
      // redraw
    });
  }
}
