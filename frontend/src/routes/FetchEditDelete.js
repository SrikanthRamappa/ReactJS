// index.component.js
// Display the backend data
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
//import Button from '@material-ui/core/Button';
//import TableRow from './TableRow';
import CsvDownload from 'react-json-to-csv';



class FetchEditDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
        this.delete = this.delete.bind(this);
    }

    /* This is where data will be fetched from */
    componentDidMount() {
         fetch('/test_app/api/user/fetch/All')
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

    // tabRow(){
    //     return this.state.users.map(function(object, i){
    //         return <TableRow obj={object} key={i} />;
    //     });
    //   }

    // selectMode(mode) {
    //     var rowids= mode
    //     console.log(rowids)
    // }

    // 'rid' is Nothing but "items.rowid" which will be passed from the delete button
    // 
    async delete(rid) {
        let rowid = rid;
        console.log(rowid)
        const resp = await fetch(`/test_app/api/user/delete/${rowid}`);
        var newAnswer = await resp.json();
        this.setState({ status: newAnswer.message })
        console.log(this.setState.status)
        // for refreshing the screen by giving alert
        window.location.reload();
        window.alert(this.state.status);

    }

    // reset the webpage
    resetForm = () => {
        window.location.reload();
    }

    render() {
        const { error, users } = this.state;         //---- incase you just want to display in the table
        // const error = this.state.error;             // -- this can be removed incase you wna tto just display
        if (error) {
            return <div>Error: {error.message}</div>;
            //   } else if (!isLoaded) {
            //     return <div>Loading...</div>;
        } else {
            console.log(this.state.users);

            return (

                <div>

                    <div>
                        <h3 align="center"><b>All User Details</b></h3>

                        <div class="rightpadding">
                            <button align="Right" type="button" value="Refresh Page" className="btn btn-info"
                                onClick={this.resetForm}>Refresh Page</button> &nbsp; &nbsp; &nbsp;
                    <CsvDownload
                                data={users}
                                filename="UserList_data.csv"
                                type="button" class="btn btn-success" > Download User Data </CsvDownload>

                        </div>
                        <div class="container">
                            <h4 class="alert-success"><strong>{this.state.status}</strong></h4>
                        </div>

                        <table className="table table-striped" style={{ marginTop: 20 }}>

                            <thead>

                                <br />
                                <tr>
                                    <th>User Name</th>
                                    <th>User JOB</th>
                                    <th>User Pet</th>
                                    <th colSpan="2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* { this.tabRow() } */}
                                {users.map(item =>
                                    <tr>
                                        <td>{item.name} </td>
                                        <td>{item.job}</td>
                                        <td>{item.pet}</td>

                                        <td>
                                            <Link to={"/test_app/EditUserDetail/" + item.rowid}
                                                className="btn btn-primary">Edit</Link>
                                        </td>
                                        <td>
                                            <button onClick={this.delete.bind(this, item.rowid)} className="btn btn-danger">Delete</button>

                                        </td>

                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            );
        }
    }
}

export default FetchEditDelete;