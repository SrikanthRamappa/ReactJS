import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
//import axios from 'axios';

class RunPythonScript extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: ' ',
            job: ' ',
            pet: ' '
        }
        this.ChangeHandler = this.ChangeHandler.bind(this);
        // this.ChangeHandler1 = this.ChangeHandler1.bind(this);
        // this.ChangeHandler2 = this.ChangeHandler2.bind(this);
        // this.ChangeHandler3 = this.ChangeHandler3.bind(this);
        this.SubmitHandler = this.SubmitHandler.bind(this);
    };

    // ## https://github.com/KrunalLathiya/ReactCRUDExample/blob/master/src/components/create.component.js
    // ## https://codereviewvideos.com/course/symfony-3-with-reactjs-and-angular/video/react-create-post 


    ChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    // ChangeHandler1 = (e) => {
    //     this.setState({name: e.target.value})
    // }
    // ChangeHandler2 = (e) => {
    //     this.setState({job: e.target.value})
    // }
    // ChangeHandler3 = (e) => {
    //     this.setState({pet: e.target.value})
    // }


    SubmitHandler(e) {
        e.preventDefault();                     // if you comment this line aftersubmission it will refresh the screen
        const obj = {
            "name": this.state.name,
            "job": this.state.job,
            "pet": this.state.pet
        };


        fetch('/test_app/api/RunPythonScript', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            //  body: JSON.stringify({"name": this.state.name, "job": this.state.job, "pet": this.state.pet})
            body: JSON.stringify(obj)

        }).then(res => res.json())
            .then(result => {
                this.setState({ status: result.message });
                // this.setState({ status: result.arguments});
            }, error => {
                this.setState({
                    //     isLoaded: true,
                    error: error
                });
            }

            );

    }



    render() {
        //    const {name, job, pet} = this.state
        return (
            <div class="container-fluid">
                <div class="row">
                <div class=" col-sm-offset-1 col-sm-4">
                    <h3 align="center"><b>Pass the user details to PythonScript and execute in Node Js</b></h3>
                    <br/>

                    <form
                        action={this.props.action}
                        method={this.props.method}
                        onSubmit={this.SubmitHandler}>

                        <div className="form-group">
                            <label><h5>Name: </h5></label>
                            <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.ChangeHandler} />
                        </div>
                        <div className="form-group">
                            <label><h5>Job Description: </h5></label>
                            <input type="text" className="form-control" name="job" value={this.state.job} onChange={this.ChangeHandler} />
                        </div>
                        <div className="form-group">
                            <label><h5>Pet Name: </h5></label>
                            <input type="text" className="form-control" name="pet" value={this.state.pet} onChange={this.ChangeHandler} />
                        </div>
                        <br />
                        <div className="form-group">
                            <button type="submit" className="btn btn-success">Submit Python Script</button>
                        </div>

                        <div>
                            {/* // this Link will refer to the App.js , where we mentioned the switch} */}
                            <Link to={"/test_app/FileListDownload"} className="btn btn-info">FileListDownload</Link>
                        </div>
                        <br/><br/>
                        <div class="alert-success">
                            <strong>{this.state.status}</strong>
                        </div>

                        <div class="alert-success">
                            <strong>{this.state.error}</strong>
                        </div>

                    </form>
                </div>
                </div>

            </div>
        );
    }

}


export default RunPythonScript;

