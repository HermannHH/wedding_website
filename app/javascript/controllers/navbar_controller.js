// Visit The Stimulus Handbook for more details
// https://stimulusjs.org/handbook/introduction
//
// This example controller works with specially annotated HTML like:
//
// <div data-controller="hello">
//   <h1 data-target="hello.output"></h1>
// </div>

import { Controller } from "stimulus";
import smoothscroll from 'smoothscroll-polyfill';


export default class extends Controller {
  static targets = [ "initialOffset" ]

  connect() {
    smoothscroll.polyfill();
    this.initialOffsetTarget.innerHTML = this.element.offsetTop;
    window.addEventListener('scroll', this.stickyNavigation);
  }

  stickyNavigation = () => {
    // Bottom
    if (scrollY >= this.initialOffsetTarget.innerHTML) {
      this.element.classList.add('white-navbar');
    // Top
    } else {
      this.element.classList.remove('white-navbar');
    }
  }

  scrollToSection = (event) => {
    event.preventDefault();
    if (event.srcElement.dataset.targetHash) {
      var fromTop = document.querySelector(event.srcElement.dataset.targetHash).offsetTop;
      window.scroll({ top: fromTop - 85, left: 0, behavior: 'smooth' });
    } else {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
  }

}
