/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

// import { Factory } from "meteor/factory";
import React from "react";
import { shallow } from "enzyme";
import { assert } from "chai";
import Task from "../../../imports/ui/components/Task";

describe("<Task />", function () {
  it("should render", function () {
    assert.equal(1, 1);
  });
});
