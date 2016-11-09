/* eslint-env mocha */

import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { expect } from "meteor/practicalmeteor:chai";

import Tasks from "./tasks";

if (Meteor.isServer) {
  describe("Tasks", () => {
    describe("methods", () => {
      const userId = Random.id();
      let taskId;
      const deleteTask = Meteor.server.method_handlers["tasks.remove"];

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
        const thisArg = { userId };
        deleteTask.call(thisArg, { taskId });

        expect(Tasks.find().count()).to.equal(0);
      });

      it("can not delete someone else's task", () => {
        const thisArg = { userId: "differentUserId" };

        expect(deleteTask.bind(thisArg, { taskId })).to.throw(/not-authorized/);
      });
    });
  });
}
