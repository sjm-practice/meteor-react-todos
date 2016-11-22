/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import React from "react";
import { shallow } from "enzyme";
import chai, { expect } from "chai";
import chaiEnzyme from "chai-enzyme";
import td from "testdouble";

chai.use(chaiEnzyme());

describe("<TaskContainer />", function () {


  beforeEach(function () {
    td.replace("../../api/tasks/methods");

    import TaskContainer from "../../../imports/ui/containers/TaskContainer";
  });

  afterEach(function () {
    td.reset();
  });

  it("should render the task component", function () {
    const task = {
      username: "testGuy",
      text: "this test task",
      private: false,
      checked: false,
    };

    const wrapper = shallow(
      <TaskContainer
        task={task}
        showPrivateButton={false}
      />
    );

    expect(wrapper).to.not.have.className("checked");
    expect(wrapper).to.not.have.className("private");
    expect(wrapper).to.have.descendants("button.delete");
    expect(wrapper).to.not.have.descendants("button.toggle-private");
  });

  it("should update status when checked", function () {
    // follow guide testing example
  });
});
