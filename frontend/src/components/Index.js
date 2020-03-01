// Index.js

import React, { Component } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import cookie from 'react-cookie';

export default class Index extends Component {

  constructor(props) {
    super(props);

    
    this.state = {
      design_records: [],
      columns: [{
        dataField: 'id',
        text: 'ID'
      }, {
        dataField: 'support_type',
        text: 'Support Type',
        filter: textFilter({placeholder: 'Support'}),
        style: { backgroundColor: '	#90EE90' }
      }, {
        dataField: 'service',
        text: 'Service',
        filter: textFilter({placeholder: 'Service'}),
         style: { backgroundColor: '	#90EE90' }
      }, {
        dataField: 'requestor',
        text: 'Requestor',
        style: { backgroundColor: '	#90EE90' },
      }, {
        dataField: 'short_description',
        text: 'Short Description',
        filter: textFilter(),
        style: { backgroundColor: '	#90EE90' },
        editor: {
          type: Type.TEXTAREA,
        }
      }, {
        dataField: 'rejected',
        text: 'Rejected',
        editor: {
          type: Type.CHECKBOX,
          value: 'true:false'
        }
      }, {
        dataField: 'done',
        text: 'Completed',
        editor: {
          type: Type.CHECKBOX,
          value: 'true:false'
        }
      }, {
        dataField: 'ee_notes',
        text: 'EE Notes',
        filter: textFilter(),
        editor: {
          type: Type.TEXTAREA,
        }
      }, {
        dataField: 'ee_tech',
        text: 'EE Tech',
        editor: {
          type: Type.SELECT,
          getOptions: (setOptions, { row, column }) => {
            console.log(`current editing row id: ${row.id}`);
            console.log(`current editing column: ${column.dataField}`);
            return [{
              value: 'Carson Bunnell',
              label: 'Carson Bunnell'
            }, {
              value: 'Jon Doe',
              label: 'Jon Doe'
            }, {
              value: 'Mean Joe Green',
              label: 'Mean Joe Green'
            }, {
              value: 'Nancy Bell',
              label: 'Nancy Bell'
            }, {
              value: 'Jack the ripper',
              label: 'Jack the ripper'
            }];
          }
        }
      }]
    }

    let token = cookie.load('token');
    console.log(`token: ${token}`);

    this.handleChange = this.handleChange.bind(this);
    //bind the handleGetSelectedData to "this" of component so that setState happens against the proper object.
    this.handleGetSelectedData = this.handleGetSelectedData.bind(this);
//    this.refreshTable = this.refreshTable(this);
  }


  componentDidMount() {
    let token = cookie.load('token');
    axios.get('http://localhost:3200/design', { headers: {"Authorization" : `${token}`} })
      .then(response => {
        this.setState({ design_records: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }



  render() {
    //the following object is used to configure row selection. NOTICE the clickToSelectAndEditCell
    //property. It allows both in line editing and row selection to work together. Also notice
    //that this is passed to the "selectRow" property of the <BootstrapTable> element.
    const selectRow = {
      mode: 'checkbox',
      clickToSelectAndEditCell: true
    };

    return (
      <div className="container">
        <button className="btn btn-default" onClick={this.handleGetSelectedData}>Delete Selected Rows</button>
        <BootstrapTable
          ref={n => this.node = n}
          striped
          hover
          keyField='id'
          data={this.state.design_records}
          columns={this.state.columns}
          cellEdit={cellEditFactory({ mode: 'click', blurToSave: true, afterSaveCell: this.handleChange })}
          pagination={paginationFactory()}
          filter={filterFactory()}
          selectRow={selectRow}
        />

      </div>
    );
  }

  //This handler is called by button "Delete Selected Rows" onClick handler
  //NOTICE - in order to reference the "this.node.selectionContext.selected" object
  //I had to add "ref={ n => this.node = n }" as a property to the <BootstrapTable> element.
  //I don't fully understand what this doing other than it makes the selected items available.
  handleGetSelectedData = () => {
    console.log(this.node.selectionContext.selected);

    console.log(`calling axios.get `);
    let token = cookie.load('token');

    axios.get('http://localhost:3200/design', { headers: {"Authorization" : `${token}`} })
    .then(response => {
      console.log(`response => ${response.data}`)
      //this.setState({ design_records: response.data });
    })
    .catch(function (error) {
      console.log(error);
    })      

    this.node.selectionContext.selected.map(function (i) { //map through array of selected rows. i=id of row
  
 
      let url = `http://localhost:3200/design/${i}`;
      console.log(`url to delete = ${url}`);
      //delete selected records
      axios.delete(url, { headers: {"Authorization" : `${token}`} })
        .then(res => 
          axios.get('http://localhost:3200/design', { headers: {"Authorization" : `${token}`} })
          .then(response => {
            this.props.refresh();
          })
          .catch(function (error) {
            console.log(error);
          }) 
          //console.log(`Delete Response: = ${res}`)
        );
     });
  }

  refreshTable = () => {
    console.log("refreshTable called!")
    let token = cookie.load('token');
    axios.get('http://localhost:3200/design', { headers: {"Authorization" : `${token}`} })
    .then(response => {
      this.setState({ design_records: response.data });
    })
    .catch(function (error) {
      console.log(error);
    })    
  }


  //This handler is called whenever a cell is edited and then exited. Look at the
  //cellEdit property of the <BootstrapTable> element. The blurToSave property coupled with
  //the afterSaveCell ensure this handler gets called. 

  handleChange(oldValue, newValue, row, column) {
    let pubObj = {};
    pubObj[column.dataField] = newValue;
    let url = `http://localhost:3200/design/${row.id}`

    let token = cookie.load('token');

    axios.put(url, pubObj, { headers: {"Authorization" : `${token}`} })
      .then(res => 
        
        console.log(res.data)
      );
  }

}


