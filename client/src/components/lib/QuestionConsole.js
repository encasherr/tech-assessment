import React, {Component} from 'react';

class QuestionConsole extends React.Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
       <div>
         Title
         <div>
           Question Description
         </div>
         <div>
           Choices
         </div>
         <div>
           Submit button
           Next button
           Previous button
         </div>
       </div>
    );
  }
}
