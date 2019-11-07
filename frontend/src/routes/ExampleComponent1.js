import React from 'react';
//import render from "react-dom";
import { Grid,Button } from 'semantic-ui-react'

class ExampleComponent1 extends React.Component {
  constructor(props) {
      super(props);
    this.state = {answer:"Ask a Question!"};
    this.getResponse = this.getResponse.bind(this);
  }

  async getResponse() {
    let question=1;
    const resp = await fetch(`/react-express-template/master/api/${question}`);
    var newAnswer = await resp.json();
    this.setState({answer:newAnswer.answer})
  }


    render() {
      return (
        <Grid columns={3} divided>
          <Grid.Row>
            <Button onClick={this.getResponse}>Question 1: What is the Meaning of Life?</Button>
          </Grid.Row>
          <Grid.Row>
            <h1> Answer: {this.state.answer} </h1>
          </Grid.Row>
        </Grid>
      )
    }

}





export default ExampleComponent1;
