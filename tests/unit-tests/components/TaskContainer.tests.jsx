/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, global-require */

import React from "react";
import { mount, shallow } from "enzyme";
import chai, { expect } from "chai";
import chaiEnzyme from "chai-enzyme";
import td from "testdouble";
import tdChai from "testdouble-chai";

chai.use(chaiEnzyme());
chai.use(tdChai(td));

describe("<TaskContainer />", function () {
  // NOT VERY USEFUL TESTS
  //  -just practice with enzyme and testdouble
  let TaskContainer;

  const task = {
    _id: "test_task_id",
    username: "testGuy",
    text: "this test task",
    private: false,
    checked: false,
  };

  const setCompleted = td.object(["call"]);
  const removeTask = td.object(["call"]);
  const setPrivate = td.object(["call"]);

  beforeEach(function () {
    td.replace("../../../imports/api/tasks/methods", { setCompleted, removeTask, setPrivate });
    TaskContainer = require("../../../imports/ui/containers/TaskContainer").default;
  });

  afterEach(function () {
    td.reset();
  });

  it("should render the <Task /> component", function () {
    const wrapper = shallow(<TaskContainer task={task} showPrivateButton={false} />);
    expect(wrapper.find("Task")).to.have.prop("task").deep.equal(task);
  });

  it("should call setCompleted method when clicking task", function () {
    const wrapper = mount(<TaskContainer task={task} showPrivateButton={false} />);
    wrapper.find("input[type='checkbox']").simulate("click");

    const methodArg = { taskId: task._id, checked: !task.checked };
    const methodCallBack = td.matchers.isA(Function);

    expect(setCompleted.call).to.have.been.calledWith(methodArg, methodCallBack);
  });
});
