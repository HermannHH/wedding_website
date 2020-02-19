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

  connect() {
    window.addEventListener("resize", this.handleVideoDimensionsSet);
    this.handleVideoDimensionsSet();
  }

  handleVideoDimensionsSet = () => {
    var elWidth = document.body.clientWidth;
    var elHeight = elWidth * 0.5625;
    this.element.style.width = elWidth + "px";
    this.element.style.height = elHeight + "px";
  }
}
