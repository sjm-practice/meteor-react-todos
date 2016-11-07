import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { ValidatedMethod } from "meteor/mdg:validated-method";

const Tasks = new Mongo.Collection("tasks");
export default Tasks;

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

export const setChecked = new ValidatedMethod({
  name: "tasks.setChecked",

  validate: new SimpleSchema({
    taskId: { type: String },
    setChecked: { type: Boolean },
  }).validator(),

  run({ taskId, setChecked }) {
    Tasks.update(taskId, { $set: { checked: setChecked } });
  },
});

// Providing methods definition on both client and server, supports optimistic UI updates
export const remove = new ValidatedMethod({
  name: "tasks.remove",

  validate: new SimpleSchema({
    taskId: { type: String },
  }).validator(),

  run({ taskId }) {
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

    if (task.owner !== this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    Tasks.update(taskId, { $set: { private: setToPrivate } });
  },
});
