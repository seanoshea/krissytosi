import { Directive } from '@angular/core';

@Directive({
  selector: '[appResponsive]'
})
export class ResponsiveDirective {
  constructor() {
    return {
      link: function(scope, element, attrs) {
        var width = (window.innerWidth > 0) ? window.innerWidth : screen.width,
        xAxis = parseInt(scope.photo.width_o, 10),
        dimension = width >= xAxis ? 'url_o' : 'url_m';
        element[0].src = scope.photo[dimension];
      }
    };
  }
}
