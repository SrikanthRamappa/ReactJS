import React from 'react';
//import render from "react-dom";
import { Grid,Button } from 'semantic-ui-react'

class ExampleComponent2 extends React.Component {
    constructor(props) {
        super(props);
      this.state = {answer:"Ask a all the user list"};
      this.getResponse = this.getResponse.bind(this);
    }
  
    async getResponse() {
     let question='all';
      const resp = await fetch(`/react-express-template/master/api/user/${question}`);
      var newAnswer = await resp.json();
      this.setState({answer:newAnswer})
    }
  
  
      render() {
        return (
          <Grid columns={3} divided>
            <Grid.Row>
              <Button onClick={this.getResponse}>Question 2: Click to get the list of users?</Button>
            </Grid.Row>
            <Grid.Row>
              <h1> Answer: {this.state.answer} </h1>
            </Grid.Row>
          </Grid>
        )
      }
  
  }
  
   export default ExampleComponent2;