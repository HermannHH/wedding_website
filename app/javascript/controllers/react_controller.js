import { Controller } from 'stimulus';
import React from 'react';
import ReactDOM from 'react-dom';

export default class extends Controller {
  connect() {

    const appName = this.data.get('component');
    const Component = require(`../apps/${appName}/index`).default;

    let props = this.data.get('props') || {};
    if (typeof props === 'string') {
      props = JSON.parse(props);
    }

    ReactDOM.render(
      <Component { ...props } />,
      this.element
    );

    document.addEventListener('turbolinks:before-cache', this.unmountComponent);
  }

  disconnect() {
    document.removeEventListener('turbolinks:before-cache', this.unmountComponent);
  }

  unmountComponent = () => {
    ReactDOM.unmountComponentAtNode(this.element);
  }
}
