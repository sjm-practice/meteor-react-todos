/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { expect } from "meteor/practicalmeteor:chai";
import { Meteor } from "meteor/meteor";
import { generateData } from "./generate-data.app-tests";

import { setCompleted } from "./methods";

describe("Tasks", function () {
  if (Meteor.isClient) {
    describe("client method call", function () {
      let taskId;

      before(function (done) {
        generateData()
          .then((val) => {
            taskId = val;
            console.log("success:", val);
            done();
          })
          .catch((reason) => { console.log("error:", reason); });
        console.log("taskId:", taskId);
      });

      it("prevent updating 'completed' of someone else's task", function () {
        console.log("test called.");
        const context = { userId: "differentUserId" };  // aka this
        const args = { taskId, checked: true };
        expect(() => { setCompleted._execute(context, args); }).to.throw(/not-authorized/);
      });
    });
  }
});
