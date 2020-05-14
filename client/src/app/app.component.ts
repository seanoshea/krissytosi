import { Component } from '@angular/core';
import { Portfolio } from './portfolio.model';
import { PortfoliosService } from './portfolios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Krissy O\'Shea';
  portfolios: Portfolio[];

  constructor(private service: PortfoliosService) { }

  ngOnInit():void {
    this.service.fetch();
  }
}
