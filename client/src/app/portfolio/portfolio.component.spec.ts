import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioComponent } from './portfolio.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PortfoliosService } from '../portfolios.service';
import { TestPortfoliosService } from 'src/testing/test-portfolio-service';
import { Router } from '@angular/router';

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
});
