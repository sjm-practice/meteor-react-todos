/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import React from "react";
import { shallow } from "enzyme";
import Task from "../Task";

describe("<Task />", function () {
  // NOT REAL USEFUL TESTS
  //  -just practice with jest expect and mocks
  const task = {
    username: "testGuy",
    text: "this test task",
    private: false,
    checked: false,
  };

  const handleToggleCheckedStub = jest.fn();
  const unusedStubFunc = jest.fn();

  const wrapper = shallow(
    <Task
      task={task}
      onToggleCheckedTask={() => handleToggleCheckedStub()}
      onDeleteTask={() => unusedStubFunc()}
      showPrivateButton={false}
      onTogglePrivate={() => unusedStubFunc()}
    />
  );

  afterAll(function () {
    jest.resetAllMocks();
  });

  it("should render without private button", function () {
    expect(wrapper.hasClass("checked")).toBe(false);
    expect(wrapper.hasClass("private")).toBe(false);
    expect(wrapper.find("button.delete").length).toEqual(1);
    expect(wrapper.find("button.toggle-private").length).toEqual(0);
  });

  it("should update status when checked", function () {
    wrapper.find("input[type='checkbox']").simulate("click");
    expect(handleToggleCheckedStub.mock.calls.length).toBe(1);
  });
});
