import { Controller } from "stimulus"


export default class extends Controller {

  connect() {
    window.addEventListener("resize", this.handleVideoDimensionsSet);
    this.handleVideoDimensionsSet();
  }

  handleVideoDimensionsSet = () => {
    var elWidth = document.documentElement.clientWidth;
    this.element.style.width = elWidth + "px";

    var ratio = 0.5625;
    var viewportHeight = document.documentElement.clientHeight;
    var ratioHeight = elWidth * ratio;
    var heightToViewportRatio = ratioHeight / viewportHeight;
    if(heightToViewportRatio >= 0.8) {
      var ratio = viewportHeight / elWidth;
      var finalHeight = viewportHeight;
    } else {
      var finalHeight = ratioHeight;
    }
    this.element.style.height = finalHeight + "px";


    this.element.style.backgroundImage = `url(https://ik.imagekit.io/nhrknfxy8/cover_D8yZnqPX5I.JPG?tr=w-${elWidth},ar-1-${ratio},cm-extract,pr-true)`;
  }
}
