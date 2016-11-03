import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { ValidatedMethod } from "meteor/mdg:validated-method";

const Tasks = new Mongo.Collection("tasks");

const TaskInsertSchema = new SimpleSchema({
  text: {
    type: String,
    label: "Text",
    max: 200,
  },
});

export const insertTask = new ValidatedMethod({
  name: "tasks.insert",
  validate: TaskInsertSchema.validator(),
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

// Providing methods definition on both client and server, supports optimistic UI updates
Meteor.methods({
  "tasks.setChecked"(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    Tasks.update(taskId, { $set: { checked: setChecked } });
  },
  "tasks.remove"(taskId) {
    check(taskId, String);
    Tasks.remove(taskId);
  },
});

export default Tasks;
