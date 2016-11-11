import React, {
  Component,
  PropTypes,
} from "react";

import { setCompleted, removeTask, setPrivate } from "../../api/tasks/methods";

import Task from "../components/Task";

class TaskContainer extends Component {
  handleToggleChecked() {
    setCompleted.call({ taskId: this.props.task._id, checked: !this.props.task.checked },
      (err) => {
        if (err) {
          alert(err);
        }
      });
  }

  handleDeleteTask() {
    removeTask.call({ taskId: this.props.task._id }, (err) => {
      if (err) {
        alert(err);
      }
    });
  }

  handleTogglePrivate() {
    setPrivate.call({ taskId: this.props.task._id, setToPrivate: !this.props.task.private },
      (err) => {
        if (err) {
          alert(err);
        }
      });
  }

  render() {
    return (
      <Task
        task={this.props.task}
        onToggleCheckedTask={() => this.handleToggleChecked()}
        onDeleteTask={() => this.handleDeleteTask()}
        showPrivateButton={this.props.showPrivateButton}
        onTogglePrivate={() => this.handleTogglePrivate()}
      />
    );
  }
}

TaskContainer.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    private: PropTypes.bool,
  }).isRequired,
  showPrivateButton: PropTypes.bool.isRequired,
};

export default TaskContainer;
