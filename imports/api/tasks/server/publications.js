import { Meteor } from "meteor/meteor";
import Tasks from "../tasks";

Meteor.publish("tasks", function publishTasks() {
  return Tasks.find({
    $or: [{ private: { $ne: true } }, { owner: this.userId }],
  });
});
