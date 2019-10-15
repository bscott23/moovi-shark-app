import React, { Component } from "react";
import axios from "axios";
import { Button, Modal, Forms } from "react-bootstrap";

export default class CreateLabelModal extends Component {
  constructor(props) {
    super(props);
    this.onChangeLabel = this.onChangeLabel.bind(this);
    this.onModalShow = this.onModalShow.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      label: "",
      modalShow: false
    };
  }

  onChangeLabel(e) {
    this.setState({
      label: e.target.value
    });
  }

  onModalShow(e) {
    this.setState({
      modalShow: true
    });
  }

  onModalClose(e) {
    this.setState({
      modalShow: false
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const newLabel = {
      label: this.state.label
    };

    console.log(newLabel);

    axios.post("/labels/add", newLabel).then(res => console.log(res.data));

    this.setState({
      label: ""
    });
  }

  render() {
    return (
      <div>
        <Button variant="primary" onClick={this.onModalShow}>
          Manage Labels
        </Button>

        <Modal show={this.state.modalShow} onHide={this.onModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Labels</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.onModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.onModalClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
