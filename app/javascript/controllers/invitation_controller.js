import Rails from '@rails/ujs';
import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "acceptPath", "declinePath", "actionArea" ]

  connect() {
    // if(this.data.get("hasConfirmed")) {
    //   this.actionAreaTarget.innerHTML = this.confirmedBanner();
    // } else if (this.data.get("hasDeclined")) {
    //   this.actionAreaTarget.innerHTML = this.declinedBanner();
    // } else {
    //   this.actionAreaTarget.innerHTML = this.actionButtons();
    // }

  }

  // Public
  accept() {
    Rails.ajax({
      type: "PATCH",
      url: this.acceptPathTarget.dataset.value,
      success: (data) => {
        this.actionAreaTarget.innerHTML = this.confirmedBanner();
      },
      error: (error) => {
        console.error('error', error)
      }
    });
  }

  decline() {
    Rails.ajax({
      type: "PATCH",
      url: this.declinePathTarget.dataset.value,
      success: (data) => {
        this.actionAreaTarget.innerHTML = this.declinedBanner();
      },
      error: (error) => {
        console.error('error', error)
      }
    });
  }

  // Private
  actionButtons = () => {
    return `
      <div>
        <button class="bg-green-200 hover:bg-green-300 text-green-500 hover:text-green-600 font-bold my-2 py-2 px-4 rounded w-full" data-action="click->invitation#accept">
          Accept invitation
        </button>
        <button class="bg-red-200 hover:bg-red-300 text-red-500 hover:text-red-600 font-bold my-2 py-2 px-4 rounded w-full" data-action="click->invitation#decline">
          Decline invitation
        </button>
      </div>
    `;
  }

  confirmedBanner = () => {
    return `
      <div class="w-full flex">
        <span class="text-base w-full text-center font-medium bg-green-100 py-1 px-2 rounded text-green-500 align-middle">Thank you for accepting your invitation</span>
      </div>
    `
  }

  declinedBanner = () => {
    return `
      <div class="w-full flex">
        <span class="text-base w-full font-medium  text-center bg-red-100 py-1 px-2 rounded text-red-500 align-middle">Sorry that you could not join us</span>
      </div>
    `
  }


}
