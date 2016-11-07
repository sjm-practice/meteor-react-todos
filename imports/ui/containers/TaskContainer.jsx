import React, {
  Component,
  PropTypes,
} from "react";

import { setCompleted, remove, setPrivate } from "../../api/collections/tasks";

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
    setCompleted.call({ taskId: this.props.task._id, setChecked: e.target.checked }, (err) => {
      if (err) {
        alert(err);
      }
    });
  }

  handleDeleteTask(e) {
    remove.call({ taskId: this.props.task._id }, (err) => {
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
        checked={this.state.checked}  // some
        onToggleCheckedTask={event => this.handleToggleChecked(event)}
        onDeleteTask={event => this.handleDeleteTask(event)}
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
