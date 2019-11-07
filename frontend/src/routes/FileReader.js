
import React, { Component } from 'react';
//import ReactFileReader from 'react-file-reader';
import { CSVReader } from 'react-papaparse';
//import axios from 'axios';
//import {Progress} from 'reactstrap';
//import { ToastContainer, toast } from 'react-toastify'
//import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';


//#########################################################################################################
// Refer the below link for more reference on upload file and storing file in server folder - /Public
// https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/
// https://github.com/krissnawat/simple-react-upload/blob/master/src/App.js
//##########################################################################################################

class FileReader extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();

    this.state = {

    };

    // this.handleImportOffer = this.handleImportOffer.bind(this);
    this.handleReadCSV = this.handleReadCSV.bind(this);

  }


  handleReadCSV = (data) => {

    console.log("After selecting the file");

    // Actual data ARRAY DETAILS
    console.log("Actual Data:", data);
    // to find the list of array
    console.log("valid rows in Data Array:", data.data.length);
    //  data from array list 
    console.log("Display Name value from first row of the array", data.data[0].name);
    // meta data , will have the key fields details - header :like name, job, pet
    console.log("Display Key filed/Header value from the array", data.meta.fields[0]);


    // ERROR ARRAY 
    console.log(" Error array details:", data.errors);
    console.log("how many error rows:", data.errors.length);       // how may errors
    console.log("which row number is having error in the csv file: Rownumber:", data.errors[0].row);  // which row is having error in the csv file
    console.log("Error message in the csv file of the first error record:", data.errors[0].message);// error message in the csv file of the first error record..
    //console.log(data.length);


    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data.data)
    }

    fetch('/test_app/api/post/FileReader', options).then(res => res.json())
      .then(result => {
        this.setState({ status: result.message });
      }, error => {
        this.setState({
          error: error
        });
      }
      );

  }



  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  }

  handleImportOffer = () => {
    this.fileInput.current.click();
    console.log("On click of import!");
  }

  // reset the webpage
  resetForm = () => {
    window.location.reload();
  }


  render() {
    return (
      <div>
        <div class="container">
          <div class="row">
            <div class="offset-md-3 col-md-6">
              <div class="form-group files">
                {/* <label>Import CSV File to Add in Table </label> */}
                <label align="center"><b>Import CSV File to Add data into USER Table</b></label>
              </div>

              <CSVReader
                onFileLoaded={this.handleReadCSV}
                inputRef={this.fileInput}
                style={{ display: 'none' }}
                onError={this.handleOnError}
                configOptions={{ header: true /* Header row support */ }}
              />

              <button type="button" class="btn btn-success  btn-block" onClick={this.handleImportOffer}>Import</button>
              <br />
              <button type="button" value="Refresh Page" className="btn btn-info" onClick={this.resetForm}>Refresh Page</button>
              <br />
              < div align="center" class="alert-success"><strong>{this.state.status}</strong></div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default FileReader;
