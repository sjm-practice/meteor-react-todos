import { Meteor } from "meteor/meteor";
import Tasks from "../imports/api/collections/tasks";

Meteor.publish("tasks", function () {
  return Tasks.find({
    $or: [{ private: { $ne: true } }, { owner: this.userId }],
  });
});
