/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { assert } from "meteor/practicalmeteor:chai";
import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { Factory } from "meteor/dburles:factory";

import Tasks from "./tasks";
import { removeTask } from "./methods";

if (Meteor.isServer) {
  describe("Tasks", function () {
    describe("schema validation", function () {
      const taskBadSchemaOrig = {
        text: "test bad task",
        createdAt: new Date(),
        owner: Random.id(),
        username: "testuser",
        private: true,
        nonSchemaField: "bad field",
      };

      // NOTE: this test is to learn the behavior of SimpleSchema
      it("(SimpleSchema) throws an exception when validating an object with a bad schema", function () {
        assert.throws(() => {
          Tasks.schema.validate(taskBadSchemaOrig);
        }, Error, /validation-error/);
      });

      // NOTE: this test is to learn the behavior of SimpleSchema
      //       -case in point, when collection2 cleans an object, it
      //       alters the original object (does not create a copy)
      it("(Collection2) cleans an object with a bad schema then inserts", function () {
        const taskBadSchemaCopy = Object.assign({}, taskBadSchemaOrig);
        const dirtyTaskId = Tasks.insert(taskBadSchemaCopy);
        const insertedTask = Tasks.findOne(dirtyTaskId);
        assert.notProperty(insertedTask, Object.keys(taskBadSchemaOrig)[5]);
      });

      // NOTE: this test is to learn the behavior of Factory
      it("(Factory) also gets objects with a bad schema cleaned then inserted", function () {
        Factory.define("taskSchemaTest", Tasks, taskBadSchemaOrig);
        const factoryTaskId = Factory.create("taskSchemaTest")._id;
        const factoryCreatedTask = Tasks.findOne(factoryTaskId);
        assert.notProperty(factoryCreatedTask, Object.keys(taskBadSchemaOrig)[5]);
      });
    });

    describe("methods", function () {
      const userId = Random.id();
      let taskId;

      describe("removeTask", function () {
        beforeEach(function () {
          Tasks.remove({});
          taskId = Tasks.insert({
            text: "test task",
            createdAt: new Date(),
            owner: userId,
            username: "testuser",
            private: true,
          });
        });

        it("can delete your own task", function () {
          const context = { userId };
          const args = { taskId };
          // NOTE: can execute a ValidatedMethod via _execute (per ValidateMethod docs)
          removeTask._execute(context, args); // eslint-disable-line no-underscore-dangle

          assert.equal(Tasks.find().count(), 0);
        });

        it("prevents deleting someone else's task", function () {
          const context = { userId: "differentUserId" };  // aka this
          const args = { taskId };
          // NOTE: can use this method handler lookup, or _execute style above
          const removeTaskMethod = Meteor.server.method_handlers["tasks.remove"];

          assert.throws(removeTaskMethod.bind(context, args), /not-authorized/);
        });
      });
    });
  });
}
