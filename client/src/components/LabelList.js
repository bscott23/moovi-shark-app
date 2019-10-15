import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import CreateLabel from "./CreateLabel";

const Label = props => (
  <tr>
    <td>{props.label.label}</td>
    <td>
      <a
        href="#"
        onClick={() => {
          props.deleteLabel(props.label._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class LabelsList extends Component {
  constructor(props) {
    super(props);
    this.deleteLabel = this.deleteLabel.bind(this);
    this.state = { labels: [] };
  }

  componentDidMount() {
    axios
      .get("/labels/")
      .then(response => {
        this.setState({ labels: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteLabel(id) {
    axios
      .delete("/labels/" + id)
      .then(res => console.log(res.data));
    this.setState({
      labels: this.state.labels.filter(el => el._id !== id)
    });
  }

  labelList() {
    return this.state.labels.map(currentLabel => {
      return (
        <Label
          label={currentLabel}
          deleteLabel={this.deleteLabel}
          key={currentLabel._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <CreateLabel />
        <br />
        <br />
        <h3>Labels</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.labelList()}</tbody>
        </table>
      </div>
    );
  }
}