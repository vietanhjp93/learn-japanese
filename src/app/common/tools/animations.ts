import { animateChild, trigger, style, transition, query, group, animate } from '@angular/animations';

export const sideInAnimation = 
    trigger('routeAnimations', [
        transition('rankPage <=> forgotPage', [
            style({position: 'relative'}),
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%'
                })
            ]),
            query(':enter', [
                style({ left: '-100%'})
            ]),
            query(':leave', animateChild()),
            group([
                query(':leave', [
                    animate('300ms ease-out', style({ left: '100%'}))
                ]),
                query(':enter', [
                    animate('300ms ease-in', style({ left: '0%'}))
                ])
            ]),
            query(':enter', animateChild()),
        ])

    ]);

export const slider =
trigger('slideInOut', [
    transition('* => isLeft', slideTo('left') ),
    transition('* => isRight', slideTo('right') ),
    transition('isRight => *', slideTo('left') ),
    transition('isLeft => *', slideTo('right') )
]);

function slideTo(direction) {
    const optional = { optional: true };
    return [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          [direction]: 0,
          width: '100%'
        })
      ], optional),
      query(':enter', [
        style({ [direction]: '-100%'})
      ]),
      group([
        query(':leave', [
          animate('600ms ease', style({ [direction]: '100%'}))
        ], optional),
        query(':enter', [
          animate('600ms ease', style({ [direction]: '0%'}))
        ])
      ]),
      // Normalize the page style... Might not be necessary
  
      // Required only if you have child animations on the page
      query(':leave', animateChild()),
      query(':enter', animateChild()),
    ];
  }

