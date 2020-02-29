import { Controller } from "stimulus";


export default class extends Controller {
  static targets = [ "track", "item" ]

  connect() {
    this.initSmoothScrolling();
  }

  initSmoothScrolling = () => {
    var sliderWidth = 0;
    var animationWidth = 0;
    var sliderHeight = this.trackTarget.offsetHeight;
    // console.log('init', this.outerHeight(this.trackTarget));


    this.itemTargets.forEach(el => {
      console.log('tt', el)
      animationWidth += el.offsetWidth;

      var slidesVisible = this.element.offsetWidth / this.itemTargets[0].offsetWidth;
      slidesVisible = Math.ceil(slidesVisible);

      // count slides to determine animation speed
      var slidesNumber = this.itemTargets.length;
      var speed = slidesNumber * 2;

      // append the tail
      // el.slice(0,slidesVisible).clone().appendTo(this.trackTarget);

      // Detect the slider width with appended tail
      // $('>div>div', container).each(function(){
      //   sliderWidth += $(this).outerWidth(false);
      // });

    });
  }

  outerHeight = (element) => {
    const height = element.offsetHeight,
        style = window.getComputedStyle(element)

    return ['top', 'bottom']
        .map(side => parseInt(style[`margin-${side}`]))
        .reduce((total, side) => total + side, height)
  }
}
