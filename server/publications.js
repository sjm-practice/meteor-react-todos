import { Meteor } from "meteor/meteor";
import Tasks from "../imports/api/collections/tasks";

Meteor.publish("tasks", () => Tasks.find());
