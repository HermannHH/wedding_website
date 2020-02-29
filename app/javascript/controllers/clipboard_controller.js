import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "source", "action" ]

  copy(event) {
    event.stopPropagation();
    this.sourceTarget.select()
    document.execCommand("copy");
    console.log('this.actionTarget', this.actionTarget)
    this.actionTarget.innerHTML = "Copied";
    setTimeout(() => {
      this.actionTarget.innerHTML = "Copy";
    }, 1500);
  }
}
