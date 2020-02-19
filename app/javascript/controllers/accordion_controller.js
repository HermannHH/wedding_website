import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "item" ]

  connect() {

  }

  toggleItem(event) {
    const panel = event.currentTarget.querySelector('.accordion-panel');
    if(panel.classList.contains('h-0')) {
      panel.classList.remove('h-0');
      panel.classList.add('h-auto');
    } else {
      panel.classList.add('h-0');
      panel.classList.remove('h-auto');
    }

  }
}
