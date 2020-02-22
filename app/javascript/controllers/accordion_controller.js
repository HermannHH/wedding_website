import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "item" ]

  connect() {
    // this.setupExpandFunctionality();
  }

  toggleItem(event) {

    // console.log('this.itemTargets', this.itemTargets)
    const panel = event.currentTarget.querySelector('.accordion-panel');

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      this.itemTargets.forEach(element => {
        element.querySelector('.accordion-panel').style.maxHeight = null;
      });
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }
}
