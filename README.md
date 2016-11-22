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
 * Ran in to some issues while writing tests, and identified some practices I'd like to follow for other projects
    * I have those notes on testing [here](https://gist.github.com/stevenjmarsh/26a1e5b703f19e5b70db377154feff8f)