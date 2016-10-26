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
      subscription: {
        tasks: Meteor.subscribe('tasks'),
      },
    };
  }

  componentWillUnmount() {
    this.state.subscription.tasks.stop();
  }

  render() {
    return (
      <App tasks={Tasks.find().fetch()} />
    );
  }
}

export default AppContainer;
