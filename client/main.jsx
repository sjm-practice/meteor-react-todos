import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";

import "../imports/startup/accounts-config";
import AppContainer from "../imports/ui/containers/AppContainer";

Meteor.startup(() => {
  render(<AppContainer />, document.getElementById("render-target"));
});
