import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import orderBy from "lodash/orderBy";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";

import logo from "./logo.svg";
import "./App.css";
import Form from "./Form";
import Table from "./Table";

injectTapEventPlugin();

const invertDirection = {
  asc: "desc",
  desc: "asc"
};


class ParentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [
      {accountname:'foo', negotiatedcontractvalue:'bar'},
      {accountname:'monkey', negotiatedcontractvalue:'spank'},
      {accountname:'chicken', negotiatedcontractvalue:'dance'},
    ] };
    this.onSort = this.onSort.bind(this)
  }

  componentDidMount() {
    fetch("http://hostname:xxxx/yyyy/zzzz")
      .then(function(response) {
        return response.json();
      })
      .then(items => this.setState({ data: items }));
  }

  onSort(event, sortKey){
    /*
    assuming your data is something like
    [
      {accountname:'foo', negotiatedcontractvalue:'bar'},
      {accountname:'monkey', negotiatedcontractvalue:'spank'},
      {accountname:'chicken', negotiatedcontractvalue:'dance'},
    ]
    */
    const data = this.state.data;
    data.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
    this.setState({data})
  }

  render() {
    var newdata = this.state.data;

    return (
      <table className="m-table">
        <thead>
          <tr>
            <th onClick={e => this.onSort(e, 'accountname')}>AccountName</th>
            <th onClick={e => this.onSort(e, 'negotiatedcontractvalue')}>ContractValue</th>
          </tr>
        </thead>
        <tbody>
          {newdata.map(function(account, index) {
            return (
              <tr key={index} data-item={account}>
                <td data-title="Account">{account.accountname}</td>
                <td data-title="Value">{account.negotiatedcontractvalue}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
//
// export default ParentComponent;



class App extends Component {
  state = {
    data: [
      {
        firstName: "Tann",
        lastName: "Gounin",
        username: "tgounin0",
        email: "tgounin0@wordpress.com",
        passsword: "yJG2MuL5piY"
      },
      {
        firstName: "Elana",
        lastName: "Ricioppo",
        username: "ericioppo1",
        email: "ericioppo1@timesonline.co.uk",
        passsword: "S7p9ReUoQe"
      },
      {
        firstName: "Bentlee",
        lastName: "Decourt",
        username: "bdecourt2",
        email: "bdecourt2@about.me",
        passsword: "MWU9hc"
      }
    ],
    editIdx: -1,
    columnToSort: "",
    sortDirection: "desc",
    query: "",
    columnToQuery: "firstName"
  };

  handleRemove = i => {
    this.setState(state => ({
      data: state.data.filter((row, j) => j !== i)
    }));
  };

  startEditing = i => {
    this.setState({ editIdx: i });
  };

  stopEditing = () => {
    this.setState({ editIdx: -1 });
  };

  handleSave = (i, x) => {
    this.setState(state => ({
      data: state.data.map((row, j) => (j === i ? x : row))
    }));
    this.stopEditing();
  };

  handleSort = columnName => {
    this.setState(state => ({
      columnToSort: columnName,
      sortDirection:
        state.columnToSort === columnName
          ? invertDirection[state.sortDirection]
          : "asc"
    }));
  };

  render() {
    const lowerCaseQuery = this.state.query.toLowerCase();
    return (
      <MuiThemeProvider>
        <div className="App">
          <Table
            handleSort={this.handleSort}
            handleRemove={this.handleRemove}
            startEditing={this.startEditing}
            editIdx={this.state.editIdx}
            stopEditing={this.stopEditing}
            handleSave={this.handleSave}
            columnToSort={this.state.columnToSort}
            sortDirection={this.state.sortDirection}
            data={orderBy(
              this.state.query
                ? this.state.data.filter(x =>
                    x[this.state.columnToQuery]
                      .toLowerCase()
                      .includes(lowerCaseQuery)
                  )
                : this.state.data,
              this.state.columnToSort,
              this.state.sortDirection
            )}
            header={[
              {
                name: "First name",
                prop: "firstName"
              },
              {
                name: "Last name",
                prop: "lastName"
              },
              {
                name: "Username",
                prop: "username"
              },
              {
                name: "Email",
                prop: "email"
              }
            ]}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
