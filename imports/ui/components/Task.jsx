import React, {
  PropTypes,
} from "react";
import classnames from "classnames";

const Task = (props) => {
  const taskClassName = classnames({
    checked: props.task.checked,
    private: props.task.private,
  });

  return (
    <li className={taskClassName}>
      <button className="delete" onClick={props.onDeleteTask}>
        &times;
      </button>

      <input
        type="checkbox"
        readOnly
        checked={props.task.checked}
        onClick={props.onToggleCheckedTask}
      />

      { props.showPrivateButton ?
        (<button className="toggle-private" onClick={props.onTogglePrivate}>
          { props.task.private ? "Private" : "Public" }
        </button>) : ""
      }

      <span className="text">
        <strong>{props.task.username}</strong>: {props.task.text}
      </span>
    </li>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    username: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    private: PropTypes.bool,
    checked: PropTypes.bool,
  }).isRequired,
  onToggleCheckedTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  showPrivateButton: PropTypes.bool.isRequired,
  onTogglePrivate: PropTypes.func.isRequired,
};

export default Task;
