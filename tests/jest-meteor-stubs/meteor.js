/* eslint-env jest */

module.exports = {
  Meteor: {
    Error: jest.fn(),
    methods: jest.fn(),
    call: jest.fn(),
    apply: jest.fn(),
    publish: jest.fn(),
    subscribe: jest.fn(),
  },
};
