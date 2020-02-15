import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "item" ]

  connect() {

  }

  toggleItem(event) {
    const panel = event.currentTarget.querySelector('.accordion-panel');
    // TODO: Check if has hidden class
    panel.classList.toggle('hidden');

  }
}
