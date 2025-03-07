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
  static targets = [ "panel", "openEl", "closeEl" ]

  connect() {
  }

  toggle(event) {
    event.preventDefault();
    var panel = this.panelTarget;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
    this.openElTarget.classList.toggle('hidden');
    this.closeElTarget.classList.toggle('hidden');
  }
}
