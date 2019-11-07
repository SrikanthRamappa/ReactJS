// TableRow.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import DisplayBackendData from './DisplayBackendData';


class TableRow extends Component {
  constructor(props) {
    super(props);
    this.state = { business: [] };
    this.delete = this.delete.bind(this);
  }

  async delete() {
    let rowid = this.props.obj.rowid;
    const resp = await fetch(`/react-express-template/master/api/user/delete/${rowid}`);
    var newAnswer = await resp.json();
    this.setState({ status: newAnswer.message })
    console.log(this.setState.status)

  }
  // delete() {
  //     axios.get('/react-express-template/master/api/user/delete/'+this.props.obj.rowid)
  //         .then(console.log('Deleted'))
  //         .catch(err => console.log(err))
  // }

  //<td>
  //           {/* {this.props.obj.rowid} */}
  //           {/* { This is the row id from the table whihc will used for EDit/Delete} */}
  //         </td> 


  render() {
    return (

      <tr>

        <td>
          {this.props.obj.name}
        </td>
        <td>
          {this.props.obj.job}
        </td>
        <td>
          {this.props.obj.pet}
        </td>

        <td>
          {/* <button className="btn btn-primary">Edit</button> */}
          <Link to={"/test_app/api/user/edit/" + this.props.obj.rowid}
            className="btn btn-primary">Edit</Link>
        </td>
        {/* <td>
            <button className="btn btn-danger">Delete</button>
          </td> */}
        <td>
          <button onClick={this.delete} className="btn btn-danger">Delete</button>
        </td>

        {/* <h3 class="alert-success">
                 <strong>{this.state.status}</strong>
            </h3> */}
      </tr>


    );
  }
}

export default TableRow;