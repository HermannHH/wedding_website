import { Controller } from "stimulus";
import { Notyf } from "notyf";

export default class extends Controller {
  connect() {
    const notyf = new Notyf;
    if(this.data.get('type') === 'success') {
      notyf.success(this.data.get('message'));
    } else {
      notyf.error(this.data.get('message'));
    }
    this.element.remove();
  }
}
