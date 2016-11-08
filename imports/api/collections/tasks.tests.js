/* eslint-env mocha */

import { Meteor } from "meteor/meteor";

if (Meteor.isServer) {
  describe("Tasks", () => {
    describe("methods", () => {
      it("can delete owned task", () => {
      });

      it("can not delete someone else's task", () => {
      });
    });
  });
}
