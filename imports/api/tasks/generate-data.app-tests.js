/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from "meteor/meteor";
import { Factory } from "meteor/dburles:factory";
import Tasks from "./tasks";

export const testOwnerId = "ownerId";
export const testOwnerUsername = "ownerUsername";

Factory.define("task", Tasks, {
  text: "do this test task",
  createdAt: new Date(),
  owner: testOwnerId,
  username: testOwnerUsername,
  private: true,
});

Meteor.methods({
  generateTaskFixture() {
    Tasks.remove({});
    return Factory.create("task")._id;
  },
});
