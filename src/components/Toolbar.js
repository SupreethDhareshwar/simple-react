import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import TextField from '@material-ui/core/TextField';

import SearchIcon from '@material-ui/icons/Search';

import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import ReactSelect from 'react-select';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const toolbarStyles = theme => ({
    actions: {
      color: theme.palette.text.secondary,
      display:'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width:'100%'
    },

    selectBox:{
        minWidth:220
    },
    LeftDiv:{
        display: 'flex',
        alignItems: 'center'
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 150,
    },
      input: {
        display: 'flex',
        flex:3
      },
      valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
      },
    
      noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
      },
      singleValue: {
        fontSize: 16,
      },
      placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16,
      },
      paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
      },
  });
  function NoOptionsMessage(props) {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.noOptionsMessage}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );
  }
  
  function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
  }
  
  function Control(props) {
    return (
      <TextField
        fullWidth
        InputProps={{
          inputComponent,
          inputProps: {
            className: props.selectProps.classes.input,
            inputRef: props.innerRef,
            children: props.children,
            ...props.innerProps,
          },
        }}
        {...props.selectProps.textFieldProps}
      />
    );
  }
  
  function Option(props) {
    return (
      <MenuItem
        buttonRef={props.innerRef}
        selected={props.isFocused}
        component="div"
        style={{
          fontWeight: props.isSelected ? 500 : 400,
        }}
        {...props.innerProps}
      >
        {props.children}
      </MenuItem>
    );
  }
  
  function Placeholder(props) {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.placeholder}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );
  }
  
  function SingleValue(props) {
    return (
      <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
        {props.children}
      </Typography>
    );
  }
  
  function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
  }
  
  
  function Menu(props) {
    return (
      <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
        {props.children}
      </Paper>
    );
  }
  const components = {
    Control,
    Menu,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
  };
  export default withStyles(toolbarStyles, { withTheme: true })( class EnhancedTableToolbar extends React.Component {
    
  constructor(props){
    super(props)
    this.state={
        timelineValue : "",
        selectedOption:null
    }
  }

  handleChange = (selectedOption)=>{
    this.setState({ selectedOption });
    let val=selectedOption.value?selectedOption.value:"";
     this.props.onRequestSearch(val);
  }
  handleTimelineSelect=(evt)=>{
    this.setState({
        timelineValue:evt.target.value
    })
    this.props.onRequestTimelineFilter(evt);
  }
 
  render() {
      const { classes,theme } = this.props;
      const selectStyles = {
        input: base => ({
          ...base,
          color: theme.palette.text.primary,
        }),
      };
     return( <Toolbar  >
        <div className={classes.actions}>
        <div className={classes.LeftDiv}>
        <InputLabel>Advertiser</InputLabel>
           <IconButton aria-label="Filter list">
              <SearchIcon />
            </IconButton>
            <div className={classes.selectBox}>
            <ReactSelect
            classes={classes}
            styles={selectStyles}
            value={this.state.selectedOption}
            components={components}
            onChange={this.handleChange}
            placeholder="Enter Brand Name"
            options={this.props.advertiserData}>
            </ReactSelect>
            </div>
        </div>
            <FormControl className={classes.formControl}>
            <InputLabel>TimeLine</InputLabel>
            <Select
              onChange={this.handleTimelineSelect}
              value={this.state.timelineValue}>
              <MenuItem value="Today">Today</MenuItem>
              <MenuItem value="Last 7 days">Last 7 days</MenuItem>
              <MenuItem value="Last Quarter">Last Quarter</MenuItem>
              <MenuItem value="Last Month">Last Month</MenuItem>
              <MenuItem value="Last Year">Last Year</MenuItem>
              <MenuItem value="Custom Date">Custom Date</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Toolbar>
    );
  }
  })
  

  
