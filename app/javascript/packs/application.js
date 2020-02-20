// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")
require("css/application.scss")

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

import "controllers";
import Glide, { Controls, Breakpoints, Swipe } from '@glidejs/glide/dist/glide.modular.esm';



// document.addEventListener("turbolinks:load", function() {
//   new Glide('.glide').mount({ Controls, Breakpoints, Swipe });
// });
// import React from 'react';
// import ReactDOM from 'react-dom';
// import Carousel from '../apps/carousel';

// document.addEventListener("turbolinks:load", function() {
//   var element = document.getElementById('tester');
//   console.log('tester', tester)
//   if(typeof(element) != 'undefined' && element != null){
//     ReactDOM.render(
//       <Carousel />,
//       element.appendChild(document.createElement('div')),
//     )
//   }
// });

import axios from 'axios';


document.addEventListener("turbolinks:load", function() {
  const csrfToken = document.querySelector('[name=csrf-token]').content;
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
});
