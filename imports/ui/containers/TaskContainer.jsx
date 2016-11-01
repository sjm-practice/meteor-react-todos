import React, {
  Component,
  PropTypes,
} from "react";

import { Meteor } from "meteor/meteor"; // eslint-disable-line import/extensions

import Task from "../components/Task";

class TaskContainer extends Component {

  // TODO: manage value of checkbox via state
  constructor() {
    super();
    this.state = {
      checked: false,
    };
  }

  componentWillMount() {
    this.setState({
      checked: !!this.props.task.checked,
    });
  }


  handleToggleChecked(e) {
    this.setState({
      checked: e.target.checked,
    });

    // NOTE: passing this.state.checked to this method will result in an
    //  incorrect value. the setState change may have not completed by this time.
    Meteor.call("tasks.setChecked", this.props.task._id, e.target.checked);
  }

  handleDeleteTask(e) {
    Meteor.call("tasks.remove", this.props.task._id);
  }

  render() {
    return (
      <Task
        task={this.props.task}
        checked={this.state.checked}  // some
        onToggleCheckedTask={event => this.handleToggleChecked(event)}
        onDeleteTask={event => this.handleDeleteTask(event)}
      />
    );
  }
}

TaskContainer.propTypes = {
  task: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default TaskContainer;
