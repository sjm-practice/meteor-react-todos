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
      hideCompleted: false,
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

  handleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  render() {
    return (
      <App
        newTask={this.state.newTask}
        tasks={Tasks.find({}, { sort: { createdAt: -1 } }).fetch()}
        incompleteCount={Tasks.find({ checked: { $ne: true } }).count()}
        onUpdateTask={event => this.handleUpdateTask(event)}
        onSubmitTask={event => this.handleSubmitTask(event)}
        hideCompleted={this.state.hideCompleted}
        onHideCompleted={() => this.handleHideCompleted()}
      />
    );
  }
}

export default AppContainer;
