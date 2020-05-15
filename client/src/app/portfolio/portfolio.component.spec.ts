import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioComponent } from './portfolio.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PortfoliosService } from '../portfolios.service';
import { TestPortfoliosService } from 'src/testing/test-portfolio-service';
import { Router } from '@angular/router';
const portfolioJSON: any = require('../../testing/mocked_responses/portfolios.json');

describe('PortfolioComponent', () => {
  let component: PortfolioComponent;
  let fixture: ComponentFixture<PortfolioComponent>;
  let router: Router;
  let service: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ PortfolioComponent ],
      providers: [{
        provide: PortfoliosService, useClass: TestPortfoliosService,
      }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioComponent);
    router = TestBed.get(Router);
    service = TestBed.get(PortfoliosService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('No Portfolio is selected', () => {
    it('should send you back to the home page', () => {
      const navigateSpy = spyOn(router, 'navigate');

      component.ngOnInit();

      expect(navigateSpy).toHaveBeenCalledWith(['/']);
    });
  });

  describe('A portfolio is selected', () => {
    beforeEach(() => {
      const portfolios = service.parsePortfolios(portfolioJSON);
      service.selectedPortfolio = portfolios[0];
    });
    describe('Has loaded photos for this portfolio', () => {
      it('should not make an api call for retrieving the photos', () => {
        const hasLoadedSpy = spyOn(service, 'hasLoadedPhotosForPortfolio').and.returnValue(true);
        const apiSpy = spyOn(service, 'fetchPhotos');

        component.ngOnInit();

        expect(hasLoadedSpy).toHaveBeenCalledWith(service.selectedPortfolio);
        expect(apiSpy).not.toHaveBeenCalled();
      });
    });
    describe('Has not loaded photos for this portfolio', () => {
      it('should make an api call for retrieving the photos', () => {
        const hasLoadedSpy = spyOn(service, 'hasLoadedPhotosForPortfolio').and.returnValue(false);
        
        const apiSpy = spyOn(service, 'fetchPhotos').and.callThrough();

        component.ngOnInit();

        expect(hasLoadedSpy).toHaveBeenCalledWith(service.selectedPortfolio);
        expect(apiSpy).toHaveBeenCalled();
      });
    });
  });
});
