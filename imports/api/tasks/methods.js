import { Meteor } from "meteor/meteor";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import Tasks from "./tasks";

// Providing method definitions on both client and server, supports optimistic UI updates

export const insertTask = new ValidatedMethod({
  name: "tasks.insert",

  validate: Tasks.schema.pick(["text"]).validator(),

  run({ text }) {
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
});

export const setCompleted = new ValidatedMethod({
  name: "tasks.setCompleted",

  validate: new SimpleSchema({
    taskId: { type: String },
    checked: { type: Boolean }, // NOTE 'checked' not optional here, unlike schema
  }).validator(),

  run({ taskId, checked }) {
    if (Meteor.isServer) {
      console.log("requested id:", taskId);
    }
    const task = Tasks.findOne(taskId);
    console.log("task:", task);
    if (!task) {
      console.log("for real?");
      throw new Meteor.Error("not-found");
    }

    if (task.private && task.owner !== this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    Tasks.update(taskId, { $set: { checked } });
  },
});

export const removeTask = new ValidatedMethod({
  name: "tasks.remove",

  validate: new SimpleSchema({
    taskId: { type: String },
  }).validator(),

  run({ taskId }) {
    const task = Tasks.findOne(taskId);
    if (!task) {
      throw new Meteor.Error("not-found");
    }

    if (task.private && task.owner !== this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    Tasks.remove(taskId);
  },
});

export const setPrivate = new ValidatedMethod({
  name: "tasks.setPrivate",

  validate: new SimpleSchema({
    taskId: { type: String },
    setToPrivate: { type: Boolean },
  }).validator(),

  run({ taskId, setToPrivate }) {
    const task = Tasks.findOne(taskId);
    if (!task) {
      throw new Meteor.Error("not-found");
    }

    if (task.owner !== this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    Tasks.update(taskId, { $set: { private: setToPrivate } });
  },
});
