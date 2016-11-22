/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import React from "react";
import { shallow } from "enzyme";
import chai, { expect } from "chai";
import chaiEnzyme from "chai-enzyme";
import Task from "../../../imports/ui/components/Task";

chai.use(chaiEnzyme());

describe("<Task />", function () {
  it("should render without private button", function () {
    const task = {
      username: "testGuy",
      text: "this test task",
      private: false,
      checked: false,
    };

    const stubFunc = function () { };

    const renderedTask = shallow(
      <Task
        task={task}
        onToggleCheckedTask={() => stubFunc()}
        onDeleteTask={() => stubFunc()}
        showPrivateButton={false}
        onTogglePrivate={() => stubFunc()}
      />
    );

    expect(renderedTask).to.not.have.className("checked");
    expect(renderedTask).to.not.have.className("private");
    expect(renderedTask).to.have.descendants("button.delete");
    expect(renderedTask).to.not.have.descendants("button.toggle-private");
  });
});
