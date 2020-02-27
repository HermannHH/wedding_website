import { Controller } from "stimulus";
import Swiper from 'swiper';

export default class extends Controller {
  // static targets = [ "output" ]

  connect() {
    // this.outputTarget.textContent = 'Hello, Stimulus!'
    // this.toInfinityAndBeyond();
    new Swiper(this.element, {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 30,
      slidesPerGroup: 1,
      autoplay: {
        delay: 2000,
        // disableOnInteraction: false
      }
    });
  }
}
