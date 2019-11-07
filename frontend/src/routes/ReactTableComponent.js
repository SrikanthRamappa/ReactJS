
import React, { Component } from 'react';
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

//   refer :https://codesandbox.io/s/r40ovqp5jq
// import { makeData, Logo, Tips } from"./Utils";
// import {Tips } from"./Utils";
import matchSorter from 'match-sorter';
import CsvDownload from 'react-json-to-csv';


const columns = [
  {
    Header: "Name",
    columns: [
      {
        Header: "First Name",
        accessor: "name",
        filterMethod: (filter, row) =>
          // row[filter.id].startsWith(filter.value) &&
          // row[filter.id].endsWith(filter.value)
          matchSorter(row, filter.value, { keys: ["name"] }),
        filterAll: true

      }
      ,
      {
        Header: "JOB",
        id: "job",
        accessor: d => d.job,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["job"] }),
        filterAll: true
      }
    ]
  },
  {
    Header: "Info",
    columns: [
      {
        Header: "Pet",
        accessor: "pet"
      },
      {
        Header: "Over 18 Years",
        accessor: "pet",
        id: "over",
        Cell: ({ value }) => (value >= 18 ? "Yes" : "No"),
        filterMethod: (filter, row) => {
          if (filter.value === "all") {
            return true;
          }
          if (filter.value === "true") {
            return row[filter.id] >= 18;
          }
          return row[filter.id] < 18;
        },
        Filter: ({ filter, onChange }) =>
          <select
            onChange={event => onChange(event.target.value)}
            style={{ width: "100%" }}
            value={filter ? filter.value : "all"}
          >
            <option value="all">Show All</option>
            <option value="true">Can Vote</option>
            <option value="false">Can't Vote</option>
          </select>
      }
    ]
  }
];

class ReactTableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],

    };
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

  render() {
    const { error, users } = this.state;         //---- incase you just want to display in the table
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      console.log(this.state.users);


      return (
        <div>
          <div>
            <h3 align="center">ALL User Details React table with filter</h3>
            <ReactTable
              data={users}
              filterable
              defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value}
              columns={columns}
              defaultPageSize={5}
              className="-striped -highlight  "

            />
            {/* <br />  
                    <Tips />
                    <Logo /> */}
          </div>

          <br />
          <div>
            <CsvDownload
              data={users}
              filename="UserList_data.csv"
              type="button" class="btn btn-success" > Download User Data </CsvDownload>
          </div>
        </div>
      );
    }
  }
}

export default ReactTableComponent;