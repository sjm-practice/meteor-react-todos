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
* Default test file naming conventions for Meteor and Jest
    + [jest](http://facebook.github.io/jest/docs/configuration.html#testregex-string): `(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$)`
    + ['meteor test'](https://guide.meteor.com/testing.html#test-modes):  `"*.test[s].js[x]"` or `"*.spec[s].js[x]"`
    + ['meteor test --full-app'](https://guide.meteor.com/testing.html#test-modes): `"*.app-test[s].js"` or `"*.app-spec[s].js"`
    + **NOTE:** meteor test and build ignore files prepended with '.'
    + **NOTE:** eslint by default ignores files prepended with '.'
        - to lint such files, include `!.*.test*.js*` in a [.eslintignore file or --ignore-pattern option](http://eslint.org/docs/user-guide/configuring#ignoring-files-and-directories)
* The following convention allows you to keep all test file types in the same directory, without the test runners picking up the incorrect test file
    + `"*.js[x]"` (source, used in meteor build)
    + `".*.test.js[x]"` (tests run by jest only)
    + `"*.tests.js[x]"` (tests run by 'meteor test' only)
    + `"*.app-tests.js[x]"` (tests run by 'meteor test --full-app' only)
* example:
    + `AppContainer.jsx` (source, used in meteor build)
    + `.AppContainer.test.jsx` (tests run by jest only)
    + `AppContainer.tests.jsx` (tests run by 'meteor test' only)
    + `calledMethods.app-tests.js` (tests run by 'meteor test --full-app' only)
* You can easily adjust the [regex for jest test filenames](http://facebook.github.io/jest/docs/configuration.html#testregex-string) via jest configuration, but I did not see an easy to do so for 'meteor test' files
