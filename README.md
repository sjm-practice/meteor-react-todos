# meteor-react-todos
Coding along with the Meteor React Todos tutorial.

## Notes
* deviating from tutorial a little bit
    * using a slightly different directory structure to more strictly organize containers and components
    * using React-Komposer instead of react-meteor-data
* NOW SWITCHING TO ultimatejs:tracker-react
    * NOTE didn't see an easy / straightforward pattern with react-komposer, for event handling (passing handlers via props); will give tracker-react a try
* Also, adding mdg:validated-methods and aldeed:simple-schema, for practice with schema validation
    * was also looking for opportunity to use the created schema with PropTypes (still exploring a good way or package to do so)
    * note, punted on using any sort of schema for propTypes shape; YOU ONLY NEED to list the propTypes of object properties being used via props, not all of the properties that may be in the passed in object
* NOTE: had initially coded the completed checkbox to be a controlled component, but this had a defect. The tutorial had this as an uncontrolled component, and directly manipulating the control (produces a react warning). I switch to the tutorial method, which is less code, and functions as intended/expected, but I believe breaks react coding paradigm. May research this further and correct down the road.
    

## Testing Methods & ValidatedMethods
* The tests around Tasks methods, test a variety of scenarios. Depending on how the meteor method is call, and from where (client, server), the behaviour of the responses can vary, namely in the error conditions different exceptions are thrown
* Even though the application code only calls the methods in one manner, ValidatedMethod from the client, the other manners are tested as well to ensure they are secure
    * ie, a malicious user could call the different manners from the client console
* Variations to consider, test, and understand behaviour...
    * from the server - Method.call("setCompleted", )
    * from the client
    * using Method.call
        * with a callback
        * without a callback
    * using ValidatedMethod.call
    * using ValidatedMethod._execute (from test code)
* Each of the variations that could be used on the client were tested to understand any security vulnerabilities, and have the test fail in the event a code change exposed a vulnerability
* Each of the server side variations were done to understand behaviour, and test that code if called from the server (make sure that behaviour doesn't change with code changes)

