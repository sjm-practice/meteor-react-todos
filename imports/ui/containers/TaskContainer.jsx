import React, {
  Component,
  PropTypes,
} from "react";

import { Meteor } from "meteor/meteor"; // eslint-disable-line import/extensions

import Task from "../components/Task";

class TaskContainer extends Component {

  handleToggleChecked(e) {
    Meteor.call("tasks.setChecked", this.props.task._id, e.target.checked);
  }

  render() {
    return (
      <Task
        task={this.props.task}
        onToggleCheckedTask={event => this.handleToggleChecked(event)}
      />
    );
  }
}

TaskContainer.propTypes = {
  task: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default TaskContainer;
