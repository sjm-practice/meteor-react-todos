import React, {
  Component,
} from "react";

import { Meteor } from "meteor/meteor";
import TrackerReact from "meteor/ultimatejs:tracker-react";

import Tasks from "../../api/tasks";
import App from "../components/App";

class AppContainer extends TrackerReact(Component) {
  constructor() {
    super();
    this.state = {
      task: "",
      subscription: {
        tasks: Meteor.subscribe("tasks"),
      },
    };
  }

  componentWillUnmount() {
    this.state.subscription.tasks.stop();
  }

  handleUpdateTask(e) {
    this.setState({
      task: e.target.value.trim(),
    });
  }

  handleSubmitTask(e) {
    e.preventDefault();
    const { task } = this.state;
    this.setState({ task: "" });

    Meteor.call("tasks.insert", task);
  }

  render() {
    return (
      <App
        tasks={Tasks.find().fetch()}
        onUpdateTask={event => this.handleUpdateTask(event)}
        onSubmitTask={event => this.handleSubmitTask(event)}
      />
    );
  }
}

export default AppContainer;
