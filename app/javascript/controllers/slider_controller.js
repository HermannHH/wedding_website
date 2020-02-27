// Visit The Stimulus Handbook for more details
// https://stimulusjs.org/handbook/introduction
//
// This example controller works with specially annotated HTML like:
//
// <div data-controller="hello">
//   <h1 data-target="hello.output"></h1>
// </div>

import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "slideItem", "slideTrack" ]

  connect() {
    // this.outputTarget.textContent = 'Hello, Stimulus!'
    console.log('swiper loaded', this.slideItemTargets.length);
      // this.toInfinityAndBeyond();
      new Swiper (this.element, {
        effect: 'fade',
        autoplay: {
          delay: 5000,
        },
      })
  }

  // toInfinityAndBeyond = () => {
  //   // console.log('this.slideTrackTarget', this.slideTrackTarget)
  //   setInterval(() => {
  //     this.slideItemTargets.forEach(element => {
  //       var bounds = element.getBoundingClientRect();
  //       console.log('bounds', element, bounds.left)
  //       if(bounds.left < 0) {
  //         console.log('i am smoooolllll', element)
  //         this.slideTrackTarget.appendChild(element);
  //         // element.remove();
  //       }
  //     });

  //   }, 3000);
  // }
}
