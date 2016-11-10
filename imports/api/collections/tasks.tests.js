/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { expect } from "meteor/practicalmeteor:chai";

import Tasks, { removeTask } from "./tasks";

describe("Tasks", function () {
  if (Meteor.isServer) {
    describe("methods", function () {
      const userId = Random.id();
      let taskId;

      beforeEach(function () {
        Tasks.remove({});
        taskId = Tasks.insert({
          text: "test task",
          createdAt: new Date(),
          owner: userId,
          username: "testuser",
          private: true,
        });
      });

      it("can delete owned task", function () {
        const context = { userId };
        const args = { taskId };
        // NOTE: can execute a ValidatedMethod via _execute (per ValidateMethod docs)
        removeTask._execute(context, args);

        expect(Tasks.find().count()).to.equal(0);
      });

      it("prevent delete of someone else's task", function () {
        const context = { userId: "differentUserId" };  // aka this
        const args = { taskId };
        // NOTE: can use this method handler lookup, or _execute style above
        const removeTaskMethod = Meteor.server.method_handlers["tasks.remove"];

        expect(removeTaskMethod.bind(context, args)).to.throw(/not-authorized/);
      });
    });
  }

  if (Meteor.isClient) {
    describe("client method call", function () {
      it("prevent updating 'completed' of someone else's task", function () {
      });
    });
  }
});
