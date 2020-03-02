import { Controller } from "stimulus";
import Dropzone from 'dropzone';
import 'dropzone/dist/min/basic.min.css';
import 'dropzone/dist/min/dropzone.min.css';

export default class extends Controller {

  connect() {

    const options = Dropzone.options.myAwesomeDropzone = {
      paramName: "file", // The name that will be used to transfer the file
      headers: {
        'X-CSRF-Token': document.querySelector('[name=csrf-token]').content
      },
      maxFilesize: 2, // MB
      accept: function(file, done) {
        if (file.name == "justinbieber.jpg") {
          done("Naha, you don't.");
        }
        else { done(); }
      }
    };
    var myDropzone = new Dropzone(this.element, options);
  }
}
