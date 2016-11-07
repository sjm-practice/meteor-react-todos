import React, {
  Component,
  PropTypes,
} from "react";

import { Meteor } from "meteor/meteor"; // eslint-disable-line import/extensions
import { setChecked } from "../../api/collections/tasks";

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
    setChecked.call({ taskId: this.props.task._id, setChecked: e.target.checked }, (err) => {
      if (err) {
        alert(err);
      }
    });
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
