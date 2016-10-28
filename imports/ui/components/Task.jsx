import React, {
  PropTypes,
} from "react";

const Task = (props) => {
  const taskClassName = props.task.checked ? "checked" : "";

  return (
    <li className={taskClassName}>
      <input
        type="checkbox"
        readOnly
        id={props.task._id}
        checked={props.task.checked}
        onClick={props.onToggleCheckedTask}
      />
      <span className="text">{props.task.text}</span>
    </li>
  );
};

Task.propTypes = {
  task: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onToggleCheckedTask: PropTypes.func.isRequired,
};

export default Task;
