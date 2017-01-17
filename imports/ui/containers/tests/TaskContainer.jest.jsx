/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, global-require */

import React from "react";
import { mount, shallow } from "enzyme";

// import THis from "../../api/tasks/methods";

jest.mock("../../api/tasks/methods.js");
// import TaskContainer from "./TaskContainer";
let  TaskContainer = require("../TaskContainer").default;

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

  // const setCompleted = td.object(["call"]);
  // const removeTask = td.object(["call"]);
  // const setPrivate = td.object(["call"]);

  // beforeEach(function () {
  //   td.replace("../../../imports/api/tasks/methods", { setCompleted, removeTask, setPrivate });
  // });

  // afterEach(function () {
  //   td.reset();
  // });

  it("should render the <Task /> component", function () {
    const wrapper = shallow(<TaskContainer task={task} showPrivateButton={false} />);
    expect(wrapper.prop("task")).toEqual(task);
    expect(wrapper.prop("showPrivateButton")).toEqual(true);
  });

  // it("should call setCompleted method when clicking task", function () {
  //   const wrapper = mount(<TaskContainer task={task} showPrivateButton={false} />);
  //   wrapper.find("input[type='checkbox']").simulate("click");
  //
  //   const methodArg = { taskId: task._id, checked: !task.checked };
  //   const methodCallBack = td.matchers.isA(Function);
  //
  //   expect(setCompleted.call).to.have.been.calledWith(methodArg, methodCallBack);
  // });
});
