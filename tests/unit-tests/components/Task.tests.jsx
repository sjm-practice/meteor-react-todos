/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import React from "react";
import { shallow } from "enzyme";
import chai, { expect } from "chai";
import chaiEnzyme from "chai-enzyme";
import td from "testdouble";
import Task from "../../../imports/ui/components/Task";

chai.use(chaiEnzyme());

describe("<Task />", function () {
  // NOT VERY USEFUL TESTS
  //  -just practice with enzyme and testdouble
  const task = {
    username: "testGuy",
    text: "this test task",
    private: false,
    checked: false,
  };
  const stubFunc = function () { };
  const handleToggleCheckedStub = td.function("handleToggleCheckedStub");

  const renderedTask = shallow(
    <Task
      task={task}
      onToggleCheckedTask={() => handleToggleCheckedStub()}
      onDeleteTask={() => stubFunc()}
      showPrivateButton={false}
      onTogglePrivate={() => stubFunc()}
    />
  );

  afterEach(function () {
    td.reset();
  });

  it("should render without private button", function () {
    expect(renderedTask).to.not.have.className("checked");
    expect(renderedTask).to.not.have.className("private");
    expect(renderedTask).to.have.descendants("button.delete");
    expect(renderedTask).to.not.have.descendants("button.toggle-private");
  });

  it("should update status when checked", function () {
    renderedTask.find("input[type='checkbox']").simulate("click");
    td.verify(handleToggleCheckedStub());
  });
});
