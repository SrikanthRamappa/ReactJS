import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class FileListDownload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
        this.download = this.download.bind(this);
    }

    /* This is where data will be fetched from */
    componentDidMount() {
        fetch('/test_app/api/files')
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

    resetForm = () => {
        window.location.reload();
    }


    // Selectfile download - this will all to download the file whihc you send the file name in the request.
    // from the folder:  backend\lib\UploadeFileList 
    // localhost:3000/react-express-template/master/api/filesDownload/DACI.csv ( pass the filename in the request)



    async download(SelectedFile) {
        let filename = SelectedFile;
        console.log(filename)

        fetch(`/test_app/api/filesDownload/${filename}`)
            .then(resp => resp.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                // the filename you want download
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                alert('your file has downloaded!'); // or you know, something with better UX...
            })
            .catch(() => alert('oh no! file is not available now'));

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
                        <h3 align="center"><b>All File list to download</b></h3>

                        <div class="rightpadding">
                            <button align="Right" type="button" value="Refresh Page" className="btn btn-info"
                                onClick={this.resetForm}>Refresh Page</button> &nbsp; &nbsp; &nbsp;

                        </div>
                            <table className="table table-striped" style={{ marginTop: 20 }}>
                              <thead>
                                <br />
                                <tr>
                                    <th>List of File Name</th>
                                    <th colSpan="1">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* { this.tabRow() } */}
                                {users.map(item =>
                                    <tr>
                                        <td>{item}</td>
                                        <td>
                                            <button onClick={this.download.bind(this, item)} className="btn btn-primary">Download</button>
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
export default FileListDownload;











