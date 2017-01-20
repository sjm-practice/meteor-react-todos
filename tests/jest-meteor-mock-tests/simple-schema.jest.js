/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions, import/imports-first */

import { SimpleSchema } from "meteor/aldeed:simple-schema";
import Tasks from "../../imports/api/tasks/tasks";

describe("SimpleSchema Mock", function () {
  afterEach(function () {
    SimpleSchema.validator.mockReset();
    // console.log("num calls", SimpleSchema.validator.mock.calls.length);
  });

  it("SimpleSchema should have pick, validator mocks", function () {
    const testSchema = new SimpleSchema();

    // console.log(testSchema);
    testSchema.pick();

    // console.log(SimpleSchema);
    SimpleSchema.validator();

    expect(testSchema.pick).toHaveBeenCalledTimes(1);
    expect(SimpleSchema.validator).toHaveBeenCalled();
  });

  it("successfully calls validate from pick mock", function () {
    Tasks.schema.pick().validator();
    const newSS = Tasks.schema.pick();
    newSS.validator();

    expect(newSS.validator).toHaveBeenCalledTimes(2);
  });


  it("successfully assigns instantiated validator mock to a local object", function () {
    const localSS = new SimpleSchema();
    const testObj = {
      validate: localSS.validator,
    };

    testObj.validate();
    expect(testObj.validate).toHaveBeenCalledTimes(1);
  });

  it("successfully assigns, directly from new, validator mock to a local variable", function () {
    const directValidate = new SimpleSchema().validator();

    directValidate();
    expect(directValidate).toHaveBeenCalledTimes(1);
  });

  it("successfully assigns, directly from new, validator mock to a local object", function () {
    const testObj = {
      validate: new SimpleSchema().validator(),
    };

    testObj.validate();
    expect(testObj.validate).toHaveBeenCalledTimes(1);
  });
});

