/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai, assert } from "meteor/practicalmeteor:chai";
import { Meteor } from "meteor/meteor";

import { setCompleted } from "./methods";

// NOTE: many of these tests are to test potential security
// vulnerabilities, namely those that could be called from
// the console. see Readme for more explanation.

if (Meteor.isClient) {
  describe("Tasks", function () {
    describe("methods", function () {
      describe("setCompleted", function () {
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

        describe("ValidatedMethod ( _execute )", function () {
          it("can't find someone else's task to update, in client simulation / stub", function () {
            const context = { userId: "differentUserId" };  // aka this
            const args = { taskId, checked: true };
            assert.throws(() => {
              setCompleted._execute(context, args);
            }, /not-found/);
          });

          it.skip("(TBD) can't use ValidatedMethod._execute to update someone else's task", function () {
            // Security test: from the CONSOLE (or test env?), if you have the userId and a taskId
            // of another user, can you modfiy that task, when not logged in or logged
            // in as yourself
            // eslint-disable-next-line
            const hackedSetCompleted = require("/imports/api/tasks/methods.js").setCompleted;

            const context = { userId: "stolen_userId" };  // aka this
            const args = { taskId: "stolen_taskId", checked: true };
            // try turning off throwStubExceptions option, to have method execute even
            // when the stub / simulation fails on an exception
            hackedSetCompleted.applyOptions.throwStubExceptions = false;

            assert.throws(() => {
              setCompleted._execute(context, args);
            }, Error);  // please throw any error!
          });
        });

        describe("Meteor .call and .apply (circumvent ValidatedMethod)", function () {
          it("when userId not set can't update someone else's task", function (done) {
            Meteor.call("tasks.setCompleted", { taskId, checked: true }, function (err, res) {
              // NOTE: you need to wrap the assert, and be sure to call done, when in a callback
              //       for a Meteor method -see notes in readme for more info
              try {
                assert.isUndefined(res);
                assert.isDefined(err);
                assert.equal(err.error, "not-authorized");
              } catch (e) {
                done(e);
              }
              done();
            });
          });

          it("with throwStubExceptions option off can't update someone else's task", function (done) {
            // returnStubValue, throwStubExceptions
            Meteor.apply("tasks.setCompleted",
              [{ taskId, checked: true }],
              { throwStubExceptions: false },
              function (err, res) {
                try {
                  assert.isUndefined(res);
                  assert.isDefined(err);
                  assert.equal(err.error, "not-authorized");
                } catch (e) {
                  done(e);
                }
                done();
              }
            );
          });
        });
      });
    });
  });
}
