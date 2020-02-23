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
  // https://docs.mapbox.com/mapbox.js/api/v3.2.1/l-mapbox-map/

  connect() {
    window.addEventListener("resize", this.handleVideoDimensionsSet);
    this.handleVideoDimensionsSet();
    var latLng = [-34.036053, 18.801706];
    var html = `
      <div>
        <a target="_blank" href="https://goo.gl/maps/2gkZbN7ndL2JsWtH9" class="bg-gray-300 w-full my-2 font-bold py-2 px-4 rounded flex justify-center items-center">
          Open in Google Maps
        </a>
        <a target="_blank" href="https://m.uber.com/ul/?action=setPickup&client_id=ycyh-QdfEzc3PDM8id7OO08z0n-tYAr-&pickup=my_location&dropoff[formatted_address]=Winery%20Road%20Forest%2C%20Winery%20Road%2C%20Firgrove%2C%20South%20Africa&dropoff[latitude]=-34.037031&dropoff[longitude]=18.801770" class="bg-gray-300 w-full my-2 font-bold py-2 px-4 rounded flex justify-center items-center">
          Book an Uber
        </a>

    `;
    L.mapbox.accessToken = 'pk.eyJ1IjoiaGVybWFubmhoIiwiYSI6ImNqdjhjMm1heTBlOXU0NG55c3ZqbmlvaTMifQ.TJXMyMhgTFQ_HIeiyZsIzA';
    var map = L.mapbox.map(this.element)
    .setView(latLng, 13)
    .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));
    L.marker(latLng).addTo(map);
    var popup = L.popup({ closeButton: false })
    .setLatLng(latLng)
    .setContent(html)
    .openOn(map);
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
