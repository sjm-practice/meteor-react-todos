import React, { Component } from "react";

import App from "../components/App";

// App component, represents the whole app
class AppContainer extends Component {
  getTasks() {
    return [
      { _id: 1, text: "This is task 1" },
      { _id: 2, text: "This is task 2" },
      { _id: 3, text: "This is task 3" },
    ];
  }

  render() {
    return (
      <App tasks={this.getTasks()} />
    );
  }
}

export default AppContainer;
