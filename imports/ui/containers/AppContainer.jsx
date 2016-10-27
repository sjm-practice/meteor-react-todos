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
        tasks={Tasks.find().fetch()}
        onUpdateTask={event => this.handleUpdateTask(event)}
        onSubmitTask={event => this.handleSubmitTask(event)}
      />
    );
  }
}

export default AppContainer;
