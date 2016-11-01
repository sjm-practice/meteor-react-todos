import React, {
  PropTypes,
} from "react";

import TaskContainer from "../containers/TaskContainer";

const App = (props) => {
  let filteredTasks = props.tasks;
  if (props.hideCompleted) {
    filteredTasks = filteredTasks.filter(task => !task.checked);
  }

  const renderedTasks = filteredTasks.map(task => (
    <TaskContainer key={task._id} task={task} />
  ));

  return (
    <div className="container">
      <header>
        <h1>Todo List</h1>
      </header>

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

      <form className="new-task" onSubmit={props.onSubmitTask}>
        <input
          type="text"
          placeholder="Type to add new tasks"
          value={props.newTask}
          onChange={props.onUpdateTask}
        />
      </form>

      <ul>
        {renderedTasks}
      </ul>
    </div>
  );
};

App.propTypes = {
  newTask: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onUpdateTask: PropTypes.func.isRequired,
  onSubmitTask: PropTypes.func.isRequired,
  hideCompleted: PropTypes.bool.isRequired,
  onHideCompleted: PropTypes.func.isRequired,
};

export default App;
