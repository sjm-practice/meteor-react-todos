import React, {
  Component,
  PropTypes,
} from "react";

class Task extends Component {
  render() {
    return (
      <li>{this.props.task.text}</li>
    );
  }
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
};

export default Task;
