import React, {
  PropTypes,
} from "react";

import TaskContainer from "../containers/TaskContainer";

const App = (props) => {
  const renderedTasks = props.tasks.map(task => (<TaskContainer
    key={task._id}
    task={task}
  />));

  return (
    <div className="container">
      <header>
        <h1>Todo List</h1>
      </header>

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
};

export default App;
