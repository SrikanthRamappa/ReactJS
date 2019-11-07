
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
//import axios from 'axios';

class EditDetails extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeJobName = this.onChangeJobName.bind(this);
    this.onChangePetNumber = this.onChangePetNumber.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      rowid: '',                       // Pass the Rowid, while Edit or delete
      name: '',
      job: '',
      pet: ''
    }
  }

  componentDidMount() {
    console.log("Inside EditDetails.js");
    fetch('/test_app/api/user/edit/' + this.props.match.params.id)
      .then(res => res.json())
      .then(result => {
        this.setState({
          name: result.name,
          job: result.job,
          pet: result.pet,
          rowid: result.rowid
        });
      }, error => {
        this.setState({
          //     isLoaded: true,
          error: error
        });
      }

      );
  }


  //   axios.get('/react-express-template/master/api/user/edit/'+this.props.match.params.id)
  //       .then(response => {
  //           this.setState({ 
  //             name: response.data.name, 
  //             job: response.data.job,
  //             pet: response.data.pet });
  //       })
  //       .catch(function (error) {
  //           console.log(error);
  //       })
  // }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeJobName(e) {
    this.setState({
      job: e.target.value
    })
  }
  onChangePetNumber(e) {
    this.setState({
      pet: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      name: this.state.name,
      job: this.state.job,
      pet: this.state.pet,
      rowid: this.state.rowid
    };
    fetch('/test_app/api/user/update/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      //  body: JSON.stringify({"name": this.state.name, "job": this.state.job, "pet": this.state.pet})
      body: JSON.stringify(obj)
    })
      .then(res => res.json())
      .then(result => {
        this.setState({ status: result.message });
      }, error => {
        this.setState({
          //     isLoaded: true,
          error: error
        });
      }

      );

    // axios.post('/react-express-template/master/api/user/update/'+this.props.match.params.id, obj)
    //     .then(res => console.log(res.data));

    // this.props.history.push('/DisplayBackendData');
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3 align="center">Update User details</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>User Name:  </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Job Description: </label>
            <input type="text"
              className="form-control"
              value={this.state.job}
              onChange={this.onChangeJobName}
            />
          </div>
          <div className="form-group">
            <label>Pet Number: </label>
            <input type="text"
              className="form-control"
              value={this.state.pet}
              onChange={this.onChangePetNumber}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Update UserDetails" className="btn btn-primary" />
          </div>

          <div>
            {/* // this Link will refer to the App.js , where we mentioned the switch} */}
            <Link to={"/test_app/FetchEditDelete"} className="btn btn-secondary">Back </Link>
          </div>

          <div class="alert-success">
            <strong>{this.state.status}</strong>
          </div>



        </form>
      </div>
    )
  }
}

export default EditDetails;