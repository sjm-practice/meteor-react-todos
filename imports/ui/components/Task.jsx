import React, {
  PropTypes,
} from "react";

const Task = (props) => {
  const taskClassName = props.checked ? "checked" : "";

  return (
    <li className={taskClassName}>
      <button className="delete" onClick={props.onDeleteTask}>
        &times;
      </button>
      <input
        type="checkbox"
        readOnly
        id={props.task._id}
        checked={props.checked}
        onClick={props.onToggleCheckedTask}
      />
      <span className="text">
        <strong>{props.task.username}</strong>: {props.task.text}
      </span>
    </li>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  checked: PropTypes.bool.isRequired,
  onToggleCheckedTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default Task;
