import { Mongo } from "meteor/mongo";
import { SimpleSchema } from "meteor/aldeed:simple-schema";

const Tasks = new Mongo.Collection("tasks");
export default Tasks;

Tasks.schema = new SimpleSchema({
  text: {
    type: String,
    max: 200,
  },
  createdAt: {
    type: Date,
  },
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  username: {
    type: String,
  },
  checked: {
    type: Boolean,
    optional: true,
    defaultValue: false,
  },
  private: {
    type: Boolean,
    optional: true,
    defaultValue: false,
  },
});

Tasks.attachSchema(Tasks.schema);
