
import React, { Component } from 'react';
//import axios from 'axios';
//import {Progress} from 'reactstrap';
//import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import 'bootstrap/dist/css/bootstrap.min.css';

//#########################################################################################################
// Refer the below link for more reference on upload file and storing file in server folder - /Public
// https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/
// https://github.com/krissnawat/simple-react-upload/blob/master/src/App.js
//##########################################################################################################

class UploadCsv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
      //    loaded:0
    }
  }

  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  onClickHandler = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile)
    console.log(data)
    console.log(this.state.selectedFile)

    const options = {
      method: 'POST',
      body: data,
      // If you add this, upload won't work
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // }
    };


    fetch('/test_app/api/post/Upload', options).then(res => res.json())
      .then(result => {
        this.setState({ status: result.message });
      }, error => {
        this.setState({
          //     isLoaded: true,
          error: error
        });
      }

      );

  }


  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="offset-md-3 col-md-6">
            <div class="form-group files">
              <label><h3>Save Your CSV File in Drive</h3></label>
              <input type="file" class="form-control" multiple onChange={this.onChangeHandler} />
            </div>
            {/* <div class="form-group">
              <ToastContainer />
              <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>
        
              </div>  */}

            <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>

          </div>
        </div>
        <br/>
        <div class="alert-success">
                        <strong>{this.state.status}</strong>
                    </div>


      </div>
    );
  }


};
export default UploadCsv;