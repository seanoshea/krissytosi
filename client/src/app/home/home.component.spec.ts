import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { HomeComponent } from './home.component';
import { PortfoliosService } from '../portfolios.service';
import { TestPortfoliosService } from '../../testing/test-portfolio-service';
import { mockedPhoto } from '../../testing/test-utils';
const photosJSON: any = require('../../testing/mocked_responses/photos.json');

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ HomeComponent ],
      providers: [{
        provide: PortfoliosService, useClass: TestPortfoliosService,
      }],
    })
    .compileComponents();
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Pressing on the main screen image', () => {
    it('should send you over to the portfolio screen', () => {
      const navigateSpy = spyOn(router, 'navigate');

      component.mainScreenImagePressed();

      expect(navigateSpy).toHaveBeenCalledWith(['/portfolio']);
    });
  });

  describe('When the photos from the randomized photo have loaded', () => {
    it('should set the randomizedPhoto property on the component', () => {
      expect(component.loading).toBeTrue();

      component.photosLoaded([mockedPhoto(photosJSON)]);

      expect(component.randomizedPhoto).toBeDefined();
      expect(component.loading).toBeFalse();
    });
  });
});
