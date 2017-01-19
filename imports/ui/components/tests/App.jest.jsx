/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions, import/imports-first */

import React from "react";
import { shallow } from "enzyme";

// TODO - figure out why we need to mock here (mdg:validated-methods stub should work instead)
jest.mock("../../../api/tasks/methods.js", () =>
  ({
    setCompleted: {
      call: jest.fn(),
    },
    removeTask: {
      call: jest.fn(),
    },
    setPrivate: {
      call: jest.fn(),
    },
  })
);

import App from "../App";

describe("<App />", function () {
  const testUser = {
    _id: "adfjf3242",
  };

  const testTasks = [
    { _id: "1", username: "tester1", text: "this task 1", private: false, checked: false },
    { _id: "2", username: "tester2", text: "this task 2", private: false, checked: false },
    { _id: "3", username: "tester3", text: "this task 3", private: false, checked: false },
  ];

  it("renders as a <div />", function () {
    const wrapper = shallow(<App
      newTask={"placeholder - test"}
      tasks={testTasks}
      incompleteCount={0}
      onUpdateTask={jest.fn()}
      onSubmitTask={jest.fn()}
      hideCompleted={false}
      onHideCompleted={jest.fn()}
      currentUser={testUser}
    />);

    expect(wrapper.type()).toEqual("div");
  });
});
