import React, { Component } from "react";
import axios from "axios";
import { Button, Modal, Forms } from "react-bootstrap";

export default class CreateLabel extends Component {
  constructor(props) {
    super(props);
    this.onChangeLabel = this.onChangeLabel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      label: ""
    };
  }

  onChangeLabel(e) {
    this.setState({
      label: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const newLabel = {
      label: this.state.label
    };
    console.log(newLabel);

    axios
      .post("/labels/add", newLabel)
      .then(res => console.log(res.data));

    this.setState({
      label: ""
    });
  }

  render() {
    return (
      <div>
        <h3>Create New Label</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Label: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.label}
              onChange={this.onChangeLabel}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Label"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
