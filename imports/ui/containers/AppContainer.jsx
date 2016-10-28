import React from "react";

import { Meteor } from "meteor/meteor"; // eslint-disable-line import/extensions
import TrackerContainerComponent from "./TrackerContainerComponent";

import Tasks from "../../api/tasks";
import App from "../components/App";

class AppContainer extends TrackerContainerComponent {
  constructor() {
    super();
    this.state = {
      newTask: "",
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
      newTask: e.target.value,
    });
  }

  handleSubmitTask(e) {
    e.preventDefault();
    const newTask = this.state.newTask.trim();
    this.setState({
      newTask: "",
    });

    Meteor.call("tasks.insert", newTask);
  }

  render() {
    return (
      <App
        newTask={this.state.newTask}
        tasks={Tasks.find({}, { sort: { createdAt: -1 } }).fetch()}
        onUpdateTask={event => this.handleUpdateTask(event)}
        onSubmitTask={event => this.handleSubmitTask(event)}
      />
    );
  }
}

export default AppContainer;
