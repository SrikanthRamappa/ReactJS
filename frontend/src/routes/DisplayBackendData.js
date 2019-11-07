// index.component.js
// Display the backend data
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { Link } from 'react-router-dom';
//import Button from '@material-ui/core/Button';
import TableRow from './TableRow';

// refer  : https://appdividend.com/2018/11/11/react-crud-example-mern-stack-tutorial/#React_CRUD_Example

class DisplayBackendData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []

        };
    }

    /* This is where data will be fetched from */
    componentDidMount() {
        fetch('/react-express-template/master/api/user/fetch/All')
            .then(res => res.json())
            .then(result => {
                this.setState({ users: result });
            }, error => {
                this.setState({
                    //     isLoaded: true,
                    error: error
                });
            }

            );
    }

    tabRow() {
        return this.state.users.map(function (object, i) {
            console.log({ object }, { i })
            return <TableRow obj={object} key={i} />;
        });
    }

    render() {
        //const { error,users } = this.state;         //---- incase you just want to display in the table
        const error = this.state.error;             // -- this can be removed incase you wna tto just display
        if (error) {
            return <div>Error: {error.message}</div>;
            //   } else if (!isLoaded) {
            //     return <div>Loading...</div>;
        } else {
            console.log(this.state.users);

            return (

                <div>

                    <div>
                        <h3 align="center"> <b>Edit/Delete User Details</b> </h3>
                        <table className="table table-striped " style={{ marginTop: 20 }}>
                            <thead>
                                <tr className="table-primary">
                                    <th><b>User Name</b></th>
                                    <th><b>User JOB</b></th>
                                    <th><b>User Pet</b></th>
                                    <th colSpan="2"><b>Action</b></th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.tabRow()}
                                {/* {users.map(item =>               
                         <tr key={item.id}>
                         <td>{item.name} </td>
                         <td>{item.job}</td>
                         <td>{item.pet}</td>
                         
                            <td>
                            <button className="btn btn-primary">Edit</button>
                                    <Link to={"/edit/"+item.id} className="btn btn-primary">Edit</Link>
                            </td>
                            <td>
                                <button className="btn btn-danger">Delete</button>
                            </td>
                         
                         </tr>
                        )} */}

                            </tbody>
                        </table>
                    </div>
                </div>


            );
        }
    }
}

export default DisplayBackendData;