/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, global-require, import/imports-first */

import React from "react";
import { mount, shallow } from "enzyme";

const methods = {
  setCompleted: {
    call: jest.fn(),
  },
  removeTask: {
    call: jest.fn(),
  },
  setPrivate: {
    call: jest.fn(),
  },
};

jest.mock("../../../api/tasks/methods.js", () => {
  return methods;
}
);

import TaskContainer from "../TaskContainer";

describe("<TaskContainer />", function () {
  // NOT VERY USEFUL TESTS
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
    expect(wrapper.prop("task")).toEqual(task);
    expect(wrapper.prop("showPrivateButton")).toEqual(false);
    // TODO  - check task is rendered correctly (ie no private button)
  });

  it("should call setCompleted method when clicking task", function () {
    const wrapper = mount(<TaskContainer task={task} showPrivateButton={false} />);
    wrapper.find("input[type='checkbox']").simulate("click");

    const methodArg = { taskId: task._id, checked: !task.checked };
    // const methodCallBack = td.matchers.isA(Function);

    expect(setCompleted.call).to.have.been.calledWith(methodArg, methodCallBack);
    // expect(setCompleted.call).to.have.been.calledWith(methodArg, methodCallBack);
  });
});
