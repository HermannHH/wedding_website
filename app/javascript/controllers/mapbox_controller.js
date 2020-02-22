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
  // static targets = [ "output" ]

  connect() {
    window.addEventListener("resize", this.handleVideoDimensionsSet);
    this.handleVideoDimensionsSet();
    L.mapbox.accessToken = 'pk.eyJ1IjoiaGVybWFubmhoIiwiYSI6ImNqdjhjMm1heTBlOXU0NG55c3ZqbmlvaTMifQ.TJXMyMhgTFQ_HIeiyZsIzA';
    var map = L.mapbox.map(this.element)
    .setView([30.5, 50.5], 9)
    .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));
    L.marker([30.5, 50.5]).addTo(map);
    if (map.scrollWheelZoom) {
      map.scrollWheelZoom.disable();
    }
  }

  handleVideoDimensionsSet = () => {
    var elWidth = document.body.clientWidth;
    var elHeight = elWidth * 0.5625;
    this.element.style.width = elWidth + "px";
    this.element.style.height = elHeight + "px";
  }
}
