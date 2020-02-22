import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "item" ]

  connect() {
    // this.setupExpandFunctionality();
  }

  setupExpandFunctionality = () => {
    var acc = this.element;
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  }

  toggleItem(event) {
    const panel = event.currentTarget.querySelector('.accordion-panel');
    // TODO: Close all item targets
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
    //  if(panel.classList.contains('active')) {
    //   panel.classList.remove('h-0');
    //   panel.classList.add('h-auto');
    // } else {
    //   panel.classList.add('h-0');
    //   panel.classList.remove('h-auto');
    // }
    // if(panel.classList.contains('h-0')) {
    //   panel.classList.remove('h-0');
    //   panel.classList.add('h-auto');
    // } else {
    //   panel.classList.add('h-0');
    //   panel.classList.remove('h-auto');
    // }
  }
}
