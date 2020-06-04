import React from "react";
import ReactQuill, { Quill } from "react-quill"; // ES6
import { ImageUpload } from "quill-image-upload";
import "react-quill/dist/quill.snow.css";
import Host from "../../../../config/Host"
// import {withStyles} from "@material-ui/core/styles/index";
Quill.register("modules/imageUpload", ImageUpload);
//React JS - Quill editor Image upload plugin. + Imgur image upload API + Code uses "react": "16.3.0", quill-image-upload": "^0.1.3

class QuillEditorImageUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      body: "",
    };
    this.modules = {
      imageUpload: {
        url: Host+"/upload", // server url. If the url is empty then the base64 returns
        method: "POST", // change query method, default 'POST'
        name: "image", // custom form name
        withCredentials: false, // withCredentials
        headers: {
          Authorization: `Bearer ${document.cookie}`,
        },
        // personalize successful callback and call next function to insert new url to the editor
        callbackOK: (serverResponse, next) => {
          console.log("serverResponse", serverResponse);
          next(serverResponse.data.link);
        },
        // personalize failed callback
        callbackKO: (serverError) => {
          alert(serverError);
        },
        // optional
        // add callback when a image have been chosen
        checkBeforeSend: (file, next) => {
          console.log(file);
          next(file); // go back to component and send to the server
        },
      },
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }, { font: [] }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image", "video"],
          ["clean"],
        ],
      },
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
    };
    //Formatting option buttons for stereotypes :)
    this.formats = [
      "header",
      "font",
      "size",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "indent",
      "link",
      "image",
      "video",
    ];
  }

  // ES6 syntax can be used here
  handleChange = (html) => {
    this.setState({ body: html });
    console.log(this.state.body);
  };
  render() {
    return (
      <ReactQuill
        style={{ padding: "6rem", background: "#fff" }}
        value={this.state.body}
        theme="snow"
        formats={this.formats}
        modules={this.modules}
        onChange={this.handleChange}
      />
    );
  }
}

export default QuillEditorImageUpload;
