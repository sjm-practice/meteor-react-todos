# meteor-react-todos
Coding along with the Meteor React Todos tutorial.

## Notes
* deviating from tutorial a little bit
    * using a slightly different directory structure to more strictly organize containers and components
    * using React-Komposer instead of react-meteor-data
* NOW SWITCHING TO ultimatejs:tracker-react
    * NOTE didn't see an easy / straightforward pattern with react-komposer, for event handling (passing handlers via props); will give tracker-react a try
    * tracker-react seemed like the easiest way to write the most natural react code, following react best practices
* Also, adding mdg:validated-methods and aldeed:simple-schema, for practice with schema validation
    * was also looking for opportunity to use the created schema with PropTypes (still exploring a good way or package to do so)
    * note, punted on using any sort of schema for propTypes shape; YOU ONLY NEED to list the propTypes of object properties being used via props, not all of the properties that may be in the passed in object
* NOTE: had initially coded the completed checkbox to be a controlled component, but this had a defect. The tutorial had this as an uncontrolled component, and directly manipulating the control (produces a react warning). I switch to the tutorial method, which is less code, and functions as intended/expected, but I believe breaks react coding paradigm. May research this further and correct down the road.
 
 
## Testing

### Notes
* The intention is to be able to use...
    + 'jest / enzyme' for unit testing
    + 'meteor test' for complex integration testing
    + 'chimp' for end to end testing
    
### Test Runner File Naming Conventions

#### Default test file naming conventions for Meteor and Jest
* ['meteor test'](https://guide.meteor.com/testing.html#test-modes):  `"*.test[s].js[x]"` or `"*.spec[s].js[x]"`
* ['meteor test --full-app'](https://guide.meteor.com/testing.html#test-modes): `"*.app-test[s].js"` or `"*.app-spec[s].js"`
    +  NOTE: 'meteor build' and 'meteor test' ignore files in [any 'tests' directories](https://guide.meteor.com/testing.html#test-modes), so tests from other test runners can be kept within the project directory structure
* [jest](http://facebook.github.io/jest/docs/configuration.html#testregex-string): `(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$)`

#### Project test file naming convention
 * The following convention allows you to keep all test file types in the same or an adjacent directory of the system under test, without the test runners picking up the incorrect test file
    + place all meteor test files in the same directory as the module / system under test
    + place all jest unit tests in 'tests' sub directory of the module / system under test
        - [OPTIONAL] set [jest test filenames (testRegex)](http://facebook.github.io/jest/docs/configuration.html#testregex-string) to `(/__tests__/.*|(\\.|/)(test|spec|jest))\\.jsx?$`
    + place all chimp tests in 'tests' sub directory of the project root
        - NOTE: create additional sub directories in this directory to organize tests
 * example:
    + `<project-root>/.../system-under-test/tests/AppContainer.jest.jsx` (tests run by __jest__ only)
    + `<project-root>/.../system-under-test/AppContainer.tests.jsx` (tests run by __'meteor test'__ only)
    + `<project-root>/tests/calledMethods.app-tests.js` (tests run by __'meteor test --full-app'__ only)

### Notes on Mocking

#### Mocking Meteor packages
* [jest issue / question (way to mock Meteor packages)](https://github.com/facebook/jest/issues/1388)
* [Meteor Forum, mocking Meteor package imports in jest (with example)](https://forums.meteor.com/t/mocking-meteor-package-imports-in-jest/27780/2)
* [jest configuration docs, moduleNameMapper](http://facebook.github.io/jest/docs/configuration.html#modulenamemapper-object-string-string)
* [example jest meteor mocks (usable samples)](https://github.com/Astrocoders/jest-meteor-mocks)
