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
  static targets = [ "initialOffset" ]

  connect() {
    this.initialOffsetTarget.innerHTML = this.element.offsetTop;
    window.addEventListener('scroll', this.stickyNavigation);
  }

  stickyNavigation = () => {
    // Bottom
    if (scrollY >= this.initialOffsetTarget.innerHTML) {
      this.bottomOfWindowAdjustments();
    // Top
    } else {
      this.topOfWindowAdjustments();
    }
  }

  bottomOfWindowAdjustments = () => {
    this.element.classList.remove('bottom-0');
    this.element.classList.add('top-0');

    this.element.classList.remove('absolute');
    this.element.classList.add('fixed');

    this.element.classList.remove('opacity-25');
    this.element.classList.add('opacity-100');

    this.element.classList.remove('bg-gray-800');
    this.element.classList.add('bg-white');
  }

  topOfWindowAdjustments = () => {
    this.element.classList.remove('top-0');
    this.element.classList.add('bottom-0');

    this.element.classList.remove('fixed');
    this.element.classList.add('absolute');

    this.element.classList.remove('opacity-100');
    this.element.classList.add('opacity-25');

    this.element.classList.remove('bg-white');
    this.element.classList.add('bg-gray-800');
  }

}
