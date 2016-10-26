import React, {
  PropTypes,
} from "react";

import Task from "../components/Task";

const App = (props) => {
  const renderedTasks = props.tasks.map((task) => {
    return (
      <Task key={task._id} task={task} />
    );
  });

  return (
    <div className="container">
      <header>
        <h1>Todo List</h1>
      </header>

      <form className="new-task" >
        <input
          type="text"
          placeholder="Type to add new tasks"
        />
      </form>

      <ul>
        {renderedTasks}
      </ul>
    </div>
  );
};

App.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default App;
