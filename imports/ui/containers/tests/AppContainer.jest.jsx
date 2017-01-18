/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import React from "react";
import { shallow } from "enzyme";
import AppContainer from "../AppContainer";

describe("<AppContainer />", function () {
  it("renders as an <App /> component", function () {
    const wrapper = shallow(<AppContainer />);
    expect(wrapper.type()).toEqual("App");
  });
});
