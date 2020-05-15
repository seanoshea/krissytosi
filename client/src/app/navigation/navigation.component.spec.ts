import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import { PortfoliosService } from '../portfolios.service';
import { MockedPortfoliosService } from '../../testing/test-portfolio-service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
const portfolioJSON: any = require('../../testing/mocked_responses/portfolios.json');

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let router: Router;
  let service: PortfoliosService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ NavigationComponent ],
      providers: [{
        provide: PortfoliosService, useClass: MockedPortfoliosService,
      }],
    })
    .compileComponents();
    router = TestBed.get(Router);
    service = TestBed.get(PortfoliosService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Pressing on one of the navigation items', () => {
    it('should send you over to the portfolio screen', () => {
      const portfolios = service.parsePortfolios(portfolioJSON);
      const navigateSpy = spyOn(router, 'navigate');

      component.portfolioPressed(portfolios[0]);

      expect(navigateSpy).toHaveBeenCalledWith(['/portfolio']);
      expect(service.selectedPortfolio).toBeDefined();
    });
  });
});
