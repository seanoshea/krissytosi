import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioComponent } from './portfolio.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PortfoliosService } from '../portfolios.service';
import { TestPortfoliosService } from 'src/testing/test-portfolio-service';

describe('PortfolioComponent', () => {
  let component: PortfolioComponent;
  let fixture: ComponentFixture<PortfolioComponent>;

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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
