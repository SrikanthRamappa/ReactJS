import React, { Component } from 'react';
//import axios from 'axios';

class PostForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: ' ',
            job: ' ',
            pet: ' '
        }
        this.ChangeHandler = this.ChangeHandler.bind(this);
        // this.ChangeHandler2 = this.ChangeHandler2.bind(this);
        // this.ChangeHandler3 = this.ChangeHandler3.bind(this);
        this.SubmitHandler = this.SubmitHandler.bind(this);
    };

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
        e.preventDefault();

        fetch('/test_app/api/post', {

            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "name": this.state.name, "job": this.state.job, "pet": this.state.pet })
        });
    }



    render() {
        //    const {name, job, pet} = this.state
        return (
            <div>
                <form
                    action={this.props.action}
                    method={this.props.method}
                    onSubmit={this.SubmitHandler}>

                    <div>
                        <label>Name           : </label>
                        <input type="text" name="name" value={this.state.name} onChange={this.ChangeHandler} />
                    </div>
                    <div>
                        <label>Job Description: </label>
                        <input type="text" name="job" value={this.state.job} onChange={this.ChangeHandler} />
                    </div>
                    <div>
                        <label>Pet Name       : </label>
                        <input type="text" name="pet" value={this.state.pet} onChange={this.ChangeHandler} />
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }

}

// PostForm.defaultProps = {
//     action: '/react-express-template/master/api/user',
//     method: 'post'
// };


export default PostForm;

