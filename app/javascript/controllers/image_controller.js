import { Controller } from "stimulus"


export default class extends Controller {

  connect() {
    window.addEventListener("resize", this.handleVideoDimensionsSet);
    this.handleVideoDimensionsSet();
  }

  handleVideoDimensionsSet = () => {
    var elWidth = document.documentElement.clientWidth;
    this.element.style.width = elWidth + "px";

    var viewportHeight = document.documentElement.clientHeight;
    var ratioHeight = elWidth * 0.5625;
    var heightRatio = ratioHeight / viewportHeight;
    if(heightRatio >= 0.8) {
      this.element.style.height = viewportHeight + "px";
    } else {
      this.element.style.height = ratioHeight + "px";
    }


    this.element.style.backgroundImage = `url(https://ik.imagekit.io/nhrknfxy8/cover_y5eg__E0_O.JPG?tr=w-${elWidth},ar-1-0.5625,cm-extract)`;
  }
}
