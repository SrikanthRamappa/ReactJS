import React from 'react';
//import render from "react-dom";
import { Grid,Button } from 'semantic-ui-react'

class ExampleComponent3 extends React.Component {
    constructor(props) {
        super(props);
      //this.state = {answer:"Ask a Specific user details"};
      //this.state = {answer:[ { name:'name' , job : 'job',pet :'pet.mpg'}]}
      //this.state = {answer:[ { name:'' , job : '',pet :''}]}
      this.state = {answer:[]}
      this.getResponse = this.getResponse.bind(this);
    }
  
    async getResponse() {
     let question='John';
      const resp = await fetch(`/react-express-template/master/api/user/${question}`);
      var newAnswer = await resp.json();
      // var clist = newAnswer.map => 
      // this.setState({answer:clist})
      //const clist= () => JSON.stringify(this.state.newAnswer, ["Name", "job","pet"], '  ')
      // console.log( newAnswer);
      // console.log(JSON.stringify(this.state.newAnswer, ["Name", "job","pet"], '  '));
      this.setState({answer:newAnswer})
      

    }
  
      // to view or store the data from array use map
      render() {
        return (
          <Grid columns={3} divided>
            <Grid.Row>
              <Button onClick={this.getResponse}>Question 3: Click to get the details of Specific users?</Button>
            </Grid.Row>
            <Grid.Row>
            <h1> Answer : { this.state.answer.map((dynamicData,i)  =>
                    <div> 
                        <span> {dynamicData.name} </span>
                        <span>{dynamicData.job} </span>
                        <span>{dynamicData.pet} </span>
                    </div>
                    )
                }
                </h1>
            </Grid.Row>
          </Grid>      
         
          
        )
      }
  
  }
  
   export default ExampleComponent3;