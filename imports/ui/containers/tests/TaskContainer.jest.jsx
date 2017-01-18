/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, global-require, import/imports-first */

import React from "react";
import { mount, shallow } from "enzyme";

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

import TaskContainer from "../TaskContainer";
import { setCompleted, removeTask, setPrivate } from "../../../api/tasks/methods";

describe("<TaskContainer />", function () {
  // NOT VERY USEFUL TESTS, or over exaggerated
  //  -just practice with jest expect, mock and enzyme

  const task = {
    _id: "test_task_id",
    username: "testGuy",
    text: "this test task",
    private: false,
    checked: false,
  };

  afterAll(function () {
    jest.resetModules();
  });

  it("should render the <Task /> component", function () {
    const wrapper = shallow(<TaskContainer task={task} showPrivateButton={false} />);

    // testing some simple aspects of the container
    expect(wrapper.prop("task")).toEqual(task);
    expect(wrapper.prop("showPrivateButton")).toEqual(false);
    expect(wrapper.find("Task").length).toEqual(1);
  });

  it("should call setCompleted method when clicking task", function () {
    const wrapper = mount(<TaskContainer task={task} showPrivateButton={false} />);
    wrapper.find("input[type='checkbox']").simulate("click");

    const methodArg = { taskId: task._id, checked: !task.checked };
    const methodCallBack = expect.any(Function);

    expect(setCompleted.call).toHaveBeenCalledWith(methodArg, methodCallBack);
  });

  it("should call removeTask method when clicking delete", function () {
    const wrapper = mount(<TaskContainer task={task} showPrivateButton={false} />);
    wrapper.find("button.delete").simulate("click");

    const methodArg = { taskId: task._id };
    const methodCallBack = expect.any(Function);

    expect(removeTask.call).toHaveBeenCalledWith(methodArg, methodCallBack);
  });

  it("should call setPrivate method when clicking private button", function () {
    const wrapper = mount(<TaskContainer task={task} showPrivateButton />);
    wrapper.find("button.toggle-private").simulate("click");

    const methodArg = { taskId: task._id, setToPrivate: !task.private };
    const methodCallBack = expect.any(Function);

    expect(setPrivate.call).toHaveBeenCalledWith(methodArg, methodCallBack);
  });
});
