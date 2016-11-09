/* eslint-env mocha */

import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { expect } from "meteor/practicalmeteor:chai";

import Tasks, { removeTask } from "./tasks";

describe("Tasks", () => {
  if (Meteor.isServer) {
    describe("methods", () => {
      const userId = Random.id();
      let taskId;

      beforeEach(() => {
        Tasks.remove({});
        taskId = Tasks.insert({
          text: "test task",
          createdAt: new Date(),
          owner: userId,
          username: "testuser",
          private: true,
        });
      });

      it("can delete owned task", () => {
        const context = { userId };
        const args = { taskId };
        // NOTE: can execute a ValidatedMethod via _execute (per ValidateMethod docs)
        removeTask._execute(context, args);

        expect(Tasks.find().count()).to.equal(0);
      });

      it("can not delete someone else's task", () => {
        const context = { userId: "differentUserId" };  // aka this
        const args = { taskId };
        // NOTE: can use this method handler lookup, or _execute style above
        const removeTaskMethod = Meteor.server.method_handlers["tasks.remove"];

        expect(removeTaskMethod.bind(context, args)).to.throw(/not-authorized/);
      });
    });
  }

  if (Meteor.isClient) {
    describe("client method call", () => {
      it("runs a test on the client", () => {
      });
    });
  }
});
