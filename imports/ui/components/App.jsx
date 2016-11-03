import React, {
  PropTypes,
} from "react";

import TaskContainer from "../containers/TaskContainer";
import AccountsUIWrapper from "./AccountsUIWrapper";

const App = (props) => {
  let filteredTasks = props.tasks;
  if (props.hideCompleted) {
    filteredTasks = filteredTasks.filter(task => !task.checked);
  }

  const renderedTasks = filteredTasks.map(task => (
    <TaskContainer key={task._id} task={task}/>
  ));

  return (
    <div className="container">
      <header>
        <h1>Todo List - {props.incompleteCount}</h1>

        <label htmlFor="hideCompleted" className="hide-completed">
          <input
            id="hideCompleted"
            type="checkbox"
            readOnly
            checked={props.hideCompleted}
            onClick={props.onHideCompleted}
          />
          Hide Completed Tasks
        </label>

        <AccountsUIWrapper />

        { props.currentUser ?
          <form className="new-task" onSubmit={props.onSubmitTask}>
            <input
              type="text"
              placeholder="Type to add new tasks"
              value={props.newTask}
              onChange={props.onUpdateTask}
            />
          </form> : ""
        }
      </header>

      <ul>
        {renderedTasks}
      </ul>
    </div>
  );
};

App.propTypes = {
  newTask: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  incompleteCount: PropTypes.number.isRequired,
  onUpdateTask: PropTypes.func.isRequired,
  onSubmitTask: PropTypes.func.isRequired,
  hideCompleted: PropTypes.bool.isRequired,
  onHideCompleted: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
};

export default App;
