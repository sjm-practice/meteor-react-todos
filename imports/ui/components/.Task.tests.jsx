/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import React from "react";
import { shallow } from "enzyme";
import chai, { expect } from "chai";
import chaiEnzyme from "chai-enzyme";
import td from "testdouble";
import tdChai from "testdouble-chai";
import Task from "./Task";

chai.use(chaiEnzyme());
chai.use(tdChai(td));

describe("<Task />", function () {
  // NOT VERY USEFUL TESTS
  //  -just practice with enzyme and testdouble
  let task;
  let stubFunc;
  let handleToggleCheckedStub;
  let wrapper;

  beforeEach(function () {
    task = {
      username: "testGuy",
      text: "this test task",
      private: false,
      checked: false,
    };
    stubFunc = function () { };
    handleToggleCheckedStub = td.function("handleToggleCheckedStub");

    wrapper = shallow(
      <Task
        task={task}
        onToggleCheckedTask={() => handleToggleCheckedStub()}
        onDeleteTask={() => stubFunc()}
        showPrivateButton={false}
        onTogglePrivate={() => stubFunc()}
      />
    );
  });

  afterEach(function () {
    td.reset();
  });

  it("should render without private button", function () {
    expect(wrapper).to.not.have.className("checked");
    expect(wrapper).to.not.have.className("private");
    expect(wrapper).to.have.descendants("button.delete");
    expect(wrapper).to.not.have.descendants("button.toggle-private");
  });

  it("should update status when checked", function () {
    wrapper.find("input[type='checkbox']").simulate("click");
    td.verify(handleToggleCheckedStub());
    expect(handleToggleCheckedStub).to.have.been.called; // same as td.verify (using tdChai)
  });
});
