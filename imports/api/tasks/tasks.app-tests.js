/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { expect } from "meteor/practicalmeteor:chai";
import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";

import Tasks, { setCompleted } from "./tasks";

const testInsertTask = new ValidatedMethod({
  name: "test.tasks.insert",
  validate: Tasks.schema.pick(["text", "owner", "username"]).validator(),
  run({ text, owner, username }) {
    Tasks.remove({});
    return Tasks.insert({
      text,
      createdAt: new Date(),
      owner,
      username,
    });
  },
});

describe("Tasks", function () {
  if (Meteor.isClient) {
    describe("client method call", function () {
      let taskId;

      before(function (done) {
        const testTask = {
          text: "test task",
          owner: "testId",
          username: "testUsername",
        };

        testInsertTask.call(testTask, (err, res) => {
          if (err) {
            console.log("err:", err);
            done(err);
          } else {
            console.log("result:", res);
            taskId = res;
            done();
          }
        });
      });

      it("prevent updating 'completed' of someone else's task", function () {
        console.log("test called.");
        const context = { userId: "differentUserId" };  // aka this
        const args = { taskId, checked: true };
        expect(() => { setCompleted._execute(context, args); }).to.throw(/not-authorized/);
      });
    });
  }
});
