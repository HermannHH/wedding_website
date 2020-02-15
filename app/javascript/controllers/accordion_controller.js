import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "item" ]

  connect() {

  }

  toggleItem(event) {
    console.log('event', event)
  }
}
