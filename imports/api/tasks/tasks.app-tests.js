/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { assert } from "meteor/practicalmeteor:chai";
import { Meteor } from "meteor/meteor";

import { setCompleted } from "./methods";

// NOTE: many of these tests are to test potential security
// vulnerabilities, namely those that could be called from
// the console. see Readme for more explanation.

if (Meteor.isClient) {
  describe("Tasks", function () {
    describe("methods", function () {
      describe("setCompleted", function () {
        describe("ValidatedMethod ( _execute )", function () {
          let taskId;

          before(function (done) {
            Meteor.call("generateTaskFixture", (err, res) => {
              if (err) {
                console.log("error:", err);
              } else {
                taskId = res;
              }
              done();
            });
          });

          it("client simulation can't find someone else's task", function () {
            const context = { userId: "differentUserId" };  // aka this
            const args = { taskId, checked: true };
            assert.throws(() => {
              setCompleted._execute(context, args);
            }, /not-found/);
          });
        });
      });
    });
  });
}
