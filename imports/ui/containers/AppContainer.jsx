import { Meteor } from "meteor/meteor";
import { composeWithTracker } from "react-komposer";

import Tasks from "../../api/tasks";
import App from "../components/App";

const composer = (props, onData) => {
  const subscription = Meteor.subscribe("tasks");

  if (subscription.ready()) {
    const tasks = Tasks.find().fetch();
    onData(null, { tasks });
  }
};

const AppContainer = composeWithTracker(composer)(App);

export default AppContainer;
