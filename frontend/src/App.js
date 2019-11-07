import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ReactTableComponent from './routes/ReactTableComponent';
import AddDetails from './routes/AddDetails';
import EditDetails from './routes/EditDetails';
import UploadCsv from './routes/UploadCsv';
import FileReader from './routes/FileReader';
import FetchEditDelete from './routes/FetchEditDelete';
import D3Chart from './routes/D3Chart';
import FileListDownload from './routes/FileListDownload';
import RunPythonScript from './routes/RunPythonScript';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <div className="container"> */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link to={'/test_app/'} className="navbar-brand"><h4 class="text-primary">React LOGO</h4></Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={'/test_app/Home'} className="nav-link"><h5>Home</h5></Link>
              </li>
              <li className="nav-item">
                <Link to={'/test_app/AddUser'} className="nav-link"><h5>Add User</h5></Link>
              </li>
              <li className="nav-item">
                <Link to={'/test_app/Userslist'} className="nav-link"><h5>Users List</h5></Link>
              </li>
              {/* <li className="nav-item">
                <Link to={'/EditDeleteUsers'} className="nav-link"><h5>Edit/Delete User</h5></Link>
              </li> */}
              <li className="nav-item">
                <Link to={'/test_app/FetchEditDelete'} className="nav-link"><h5>Edit/Delete User</h5></Link>
              </li>
              <li className="nav-item">
                <Link to={'/test_app/UploadCsv'} className="nav-link"><h5>UploadCsv</h5></Link>
              </li>
              <li className="nav-item">
                <Link to={'/test_app/FileReader'} className="nav-link"><h5>CSVFile_AddUser</h5></Link>
              </li>
              <li className="nav-item">
                <Link to={'/test_app/Chart'} className="nav-link"><h5>D3Chart</h5></Link>
              </li>
              <li className="nav-item">
                <Link to={'/test_app/FileListDownload'} className="nav-link"><h5>FileListDownload</h5></Link>
              </li>
              <li className="nav-item">
                <Link to={'/test_app/RunPythonScript'} className="nav-link"><h5>RunPythonScript</h5></Link>
              </li>
            </ul>
          </div>
        </nav> <br />
        <h2><b>Welcome to Reactjs Test Screen</b></h2> <br />
        <Switch>
          <Route path='/test_app/AddUser' component={AddDetails} />
          <Route path='/test_app/EditUserDetail/:id' exact component={EditDetails} />
          <Route path='/test_app/UsersList' component={ReactTableComponent} />
          {/* <Route path='/EditDeleteUsers' component={ DisplayBackendData } /> */}
          <Route path='/test_app/FetchEditDelete' component={FetchEditDelete} />
          <Route path='/test_app/UploadCsv' component={UploadCsv} />
          <Route path='/test_app/FileReader' component={FileReader} />
          <Route path='/test_app/Chart' component={D3Chart} />
          <Route path='/test_app/FileListDownload' component={FileListDownload} />
          <Route path='/test_app/RunPythonScript' component={RunPythonScript} />
          {/* <Route path='/react-express-template/master/api/user/delete/:rowid' exact component={ TableRow } /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
