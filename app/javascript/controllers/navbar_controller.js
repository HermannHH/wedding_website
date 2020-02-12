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
  // static targets = [ "output" ]

  connect() {
    window.addEventListener('scroll', this.stickyNavigation);
  }

  stickyNavigation = () => {
    const offsetTop = this.element.offsetTop;
    if (window.scrollY >= offsetTop) {
      this.element.classList.remove('absolute');
      this.element.classList.remove('bottom-0');
      this.element.classList.add('top-0');
      this.element.classList.add('fixed');
    } else {
      console.log('step 2');
      this.element.classList.remove('fixed');
      this.element.classList.remove('top-0');
      this.element.classList.add('bottom-0');
      this.element.classList.add('absolute');
    }
  }

}
