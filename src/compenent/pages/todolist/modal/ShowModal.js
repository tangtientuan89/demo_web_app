import React, { Component } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
let Example = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="addNew"  onClick={handleShow}>
        <div className="modal-add" id="modal-add">
          <img
            className="icon"
            src="/images/icon/Apps-Dialog-Add-icon.png"
            alt=""
          />
        </div>
        <label htmlFor="modal-add">Add New</label>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
  <Modal.Title>{props.props.title}</Modal.Title>
  <Modal.Title><form><input type="text"></input></form></Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Body> <form><input type="text"></input></form></Modal.Body>
        <Modal.Body> {props.props.content}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default class ShowModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Example props={this.props} />
      </div>
    );
  }
}
