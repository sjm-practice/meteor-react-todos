import Tasks from "../imports/api/tasks";

Meteor.publish("tasks", function () {
  return Tasks.find();
});
