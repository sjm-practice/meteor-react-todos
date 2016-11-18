/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

// import { Factory } from "meteor/factory";
import React from "react";
import { shallow } from "enzyme";
import { assert } from "chai";
import Task from "../../../imports/ui/components/Task";

describe("<Task />", function () {
  it("should render", function () {
    const task = {
      username: "testguy",
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

    assert(!renderedTask.hasClass("checked"));
    assert(!renderedTask.hasClass("private"));
  });
});
