import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

const Tasks = new Mongo.Collection("tasks");

Meteor.methods({
  "tasks.insert"(text) {
    check(text, String);

    Tasks.insert({
      text,
      createdAt: new Date(),
    });
  },
  "tasks.setChecked"(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    Tasks.update(taskId, { $set: { checked: setChecked } });
  },
});

export default Tasks;
