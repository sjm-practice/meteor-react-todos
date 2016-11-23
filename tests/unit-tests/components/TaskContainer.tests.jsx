/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, global-require */

import React from "react";
import { shallow } from "enzyme";
import chai, { expect } from "chai";
import chaiEnzyme from "chai-enzyme";
import td from "testdouble";

chai.use(chaiEnzyme());

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

  beforeEach(function () {
    const methods = td.object(["setCompleted", "removeTask", "setPrivate"]);
    td.replace("../../../imports/api/tasks/methods", methods);
    TaskContainer = require("../../../imports/ui/containers/TaskContainer").default;
  });

  afterEach(function () {
    td.reset();
  });

  it("should render the <Task /> component", function () {
    const wrapper = shallow(<TaskContainer task={task} showPrivateButton={false} />);
    expect(wrapper.find("Task")).to.have.prop("task").deep.equal(task);
  });

  it("should call setCompleted method when clicked", function () {
    TaskContainer.handleToggleChecked;
    // TODO td.verify(setCompleted);
  });
});
