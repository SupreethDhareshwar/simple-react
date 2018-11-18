//src/components/LeftArea.js

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';

import EnhancedTableToolbar from './Toolbar.js';

const columnData = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Brand Name' },
  { id: 'campaign_name', numeric: false, disablePadding: false, label: 'First Campaign Name' },
  { id: 'campaign_name_length', numeric: true, disablePadding: false, label: 'Count of Campaigns inside Brand' }
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}



const styles = theme => ({
  root: {
    width: '92%',
    marginTop: theme.spacing.unit * 3,
    marginLeft:theme.spacing.unit*3,
    paddingLeft:theme.spacing.unit*3,
    paddingRight:theme.spacing.unit*3,
    display:'inline-block'
  },
  floatLeft:{
    float:'left'
  },
  floatRight:{
    float:'right'
  },
  greetingStyle: {
    padding: '4px 56px 4px 24px',
    fontWeight: '450'
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 'asc',
      orderBy: 'name',
      data: [],
      filteredData:[],
      page: 0,
      rowsPerPage: 5,
      query:"",
      selectedTimeline:"",
      advertiserOptionsData:[]
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const filteredData =
      order === 'desc'
        ? this.state.filteredData.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.filteredData.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ filteredData, order, orderBy });
  };
handleKeySearch=(searchQuery)=>{
     //Filtering Data by searched Advertiser Name

  let completeData=JSON.parse(JSON.stringify(this.state.data));
  let searchedData=completeData.filter((obj)=>{
    return ((-1 !== obj.advertiserName.toLowerCase().indexOf(searchQuery.toLowerCase())));
 })
  this.setState({ 
    query:searchQuery,
    filteredData:searchedData
   });

}
handleTimelineSelect=(event)=>{
   //Filtering Data by selected timeline 
  //Not Implemented  since not mentioned / clear in assignment

this.setState({ 
  selectedTimeline:event.target.value
 });
}

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, rowsPerPage, page,filteredData } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <div>
      <Paper className={classes.root}>
        <EnhancedTableToolbar onRequestSearch={this.handleKeySearch} onRequestTimelineFilter={this.handleTimelineSelect} 
        advertiserData={this.state.advertiserOptionsData} />
      </Paper>
      <Paper className={classes.root} >
        <div className={classes.tableWrapper}>
        <h4 className={classes.greetingStyle}>
          <span className={classes.floatLeft}>
          { this.state.query.length>0? 'Hello '+this.state.query +" ! " : null }
          </span>
          <span className={classes.floatRight}>
          { this.state.selectedTimeline.length>0? 'Showing '+this.state.selectedTimeline +" data " : null }
          </span>
        </h4>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((n,indx) => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={indx}
                  >
                    <TableCell component="th" scope="row" >
                      {n.name}
                    </TableCell>
                    <TableCell>{n.campaigns.length>0?n.campaigns[0].name:null}</TableCell>
                    <TableCell numeric>{n.campaigns.length}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
      </div>
    );
  }
  componentDidMount(){
    fetch("http://hck.re/qmPuPD",
    {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors"
    }
  ) // Call the fetch function passing the url of the API as a parameter
    .then((response)=> {
        response.json().then((responseData)=>{
          
          const advertiserData = [...new Set(responseData.map(item => item.advertiserName))];
          let adData=[];
          advertiserData.forEach((val)=>{
            adData.push(
              {
                "label":val,
                "value":val
              }
            );
          });
           this.setState({
             data:responseData,
             filteredData:responseData,
             advertiserOptionsData:adData
           });
        });
     
        // Your code for handling the data you get from the API
    })
    .catch(function(error) {
        // This is where you run code if the server returns any errors
    });
  }
}




export default withStyles(styles)(EnhancedTable);
