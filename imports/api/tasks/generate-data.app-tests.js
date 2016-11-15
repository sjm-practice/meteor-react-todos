/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from "meteor/meteor";
import { Factory } from "meteor/dburles:factory";
import { Promise } from "meteor/promise";
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
  generateFixtures() {
    Tasks.remove({});
    return Factory.create("task")._id;
  },
});

const denodeify = f => (...args) => new Promise((resolve, reject) => {
  f(...args, (err, val) => {
    if (err) {
      reject(err);
    } else {
      resolve(val);
    }
  });
});

let generateDataExport;
if (Meteor.isClient) {
  const testConnection = Meteor.connect(Meteor.absoluteUrl());

  generateDataExport = denodeify((cb) => {
    testConnection.call("generateFixtures", cb);
  });
}

const generateData = generateDataExport;

export { generateData };
