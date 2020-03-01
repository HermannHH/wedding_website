// Visit The Stimulus Handbook for more details
// https://stimulusjs.org/handbook/introduction
//
// This example controller works with specially annotated HTML like:
//
// <div data-controller="hello">
//   <h1 data-target="hello.output"></h1>
// </div>

import { Controller } from "stimulus";
import Typed from 'typed.js';


class DomUtils {
  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  static keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

  static preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault) e.preventDefault();
    e.returnValue = false;
  }

  static preventDefaultForScrollKeys(e) {
    if (DomUtils.keys[e.keyCode]) {
      DomUtils.preventDefault(e);
      return false;
    }
  }

  static disableScroll() {
    document.addEventListener('wheel', DomUtils.preventDefault, {
      passive: false,
    }); // Disable scrolling in Chrome
    document.addEventListener('keydown', DomUtils.preventDefaultForScrollKeys, {
      passive: false,
    });
  }

  static enableScroll() {
    document.removeEventListener('wheel', DomUtils.preventDefault, {
      passive: false,
    }); // Enable scrolling in Chrome
    document.removeEventListener(
      'keydown',
      DomUtils.preventDefaultForScrollKeys,
      {
        passive: false,
      }
    ); // Enable scrolling in Chrome
  }
}

export default class extends Controller {
  static targets = [ "loader", "content", "typed" ]

  connect() {
    DomUtils.disableScroll();
    var options = {
      strings: [`
        <p class="text-3xl text-gray-600 leading-10 typewriter">Love, Laughter and Happily Ever After.</p>
        <p class="text-3xl text-gray-600 leading-10 typewriter">Welcome to our wedding website.</p>
        <p class="text-base text-gray-500 mt-2">Hermann and Samantha</p>
        <p class="text-xl typewriter text-pantene mt-4">#hermantha2020</p>`
      ],
      typeSpeed: 30,
      showCursor: false,
      onComplete: (self) => {
        setTimeout(() => {
          this.typingCompleted();
        }, 1000);
      }
    };

    var typed = new Typed(this.typedTarget, options);
    this.bindErrorToast();
  }


  typingCompleted = () => {
    window.scrollTo(0, 0);
    this.loaderTarget.classList.add('fade-out-1s');
    this.contentTarget.classList.add('fade-in-1s');
    setTimeout(() => {
      this.loaderTarget.remove();
    }, 1000);
    DomUtils.enableScroll();
  }

  bindErrorToast = () => {
    document.addEventListener('ajax:error', () => {
      var el = document.createElement('div');
      el.style.cssText = 'display:hidden;';
      el.setAttribute('data-notyf-type', 'error');
      el.setAttribute('data-notyf-message', "Something went wrong. Please try again later...or phone Samantha");
      el.setAttribute('data-controller', 'notyf');
      document.body.appendChild(el);
    });
  }
}
