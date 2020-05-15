import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import { PortfoliosService } from '../portfolios.service';
import { MockedPortfoliosService } from '../../testing/test-portfolio-service';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ NavigationComponent ],
      providers: [{
        provide: PortfoliosService, useClass: MockedPortfoliosService,
      }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
