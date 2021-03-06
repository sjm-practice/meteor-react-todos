/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from "meteor/meteor";
import { Factory } from "meteor/dburles:factory";
import Tasks from "./tasks";
import { Random } from "meteor/random";

Factory.define("task", Tasks, {
  text: "do this test task",
  createdAt: new Date(),
  owner: Random.id(),
  username: "testOwnerUsername",
  private: true,
});

Meteor.methods({
  generateTaskFixture() {
    Tasks.remove({});
    return Factory.create("task")._id;
  },
});
