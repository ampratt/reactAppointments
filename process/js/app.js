var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

var AptList = require('./AptList');
var AddAppointment = require('./AddAppointment');
var SearchAppointments = require('./SearchAppointments');

var MainInterface = React.createClass({
  getInitialState: function() {
    return {
    	aptBodyVisible: false, 
      orderBy: 'aptTitle',
      orderDir: 'asc',
      queryText: '',
      	myAppointments: []
    } //return
  }, //getInitialState

  componentDidMount: function() {
  	//get data from json file
    this.serverRequest = $.get('./js/data.json', function(result) {
      var tempApts = result;
      this.setState({
        myAppointments: tempApts 
      }); //setState
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  //simply modify state object, which automatically re-renders
  deleteMessage: function(item) {
  	var allApts = this.state.myAppointments;
  	//remove item from list of all apts
  	var newApts = _.without(allApts, item);
  	this.setState({
			myAppointments: newApts
  	}); // setstate
  }, //delete message

  //control state change to modify state variable
  toggleAddDisplay: function(){
  	var tempVisibility = !this.state.aptBodyVisible;
  	this.setState({
  		aptBodyVisible: tempVisibility
  	}); //setState
  }, //toggleAddDisplay

  addItem: function(tempItem) {
  	var tempApts = this.state.myAppointments;
  	tempApts.push(tempItem);
  	this.setState({
  		 myAppointments: tempApts
  	}); //setState
  }, //addItem

  reOrder: function(orderBy, orderDir) {
    this.setState({
      orderBy: orderBy,
      orderDir: orderDir
    }); //setState
  }, //reOrder

  searchApts(q) {
    // 1. receive query texts from subcomponent
    // 2. set state
    this.setState({
      queryText: q
    }); 
  }, //searchApts

  render: function() {
    var filteredApts = []; //this.state.myAppointments;
    var orderBy = this.state.orderBy;
    var orderDir = this.state.orderDir;
    var queryText = this.state.queryText;
    var myAppointments = this.state.myAppointments;


    myAppointments.forEach(function(item) {
      if(
        (item.aptTitle.toLowerCase().indexOf(queryText)!=-1) ||
        (item.participants.toLowerCase().indexOf(queryText)!=-1) ||
        (item.aptDate.toLowerCase().indexOf(queryText)!=-1) ||
        (item.aptNotes.toLowerCase().indexOf(queryText)!=-1)
      ) {
        filteredApts.push(item);  //if any hits a match, push to filtered array
      }
    }); //forEach


    // 1)what to order, 2)order by what 3) direction
    filteredApts = _.orderBy(filteredApts, function(item) {
      return item[orderBy].toLowerCase();
    }, orderDir);//orderBy


    filteredApts = filteredApts.map(function(item, index) {
      return(
        <AptList key = {index}
        		 singleItem = { item } 
        		 whichItem = { item }	//stores current item clicked on
        		 onDelete = { this.deleteMessage }/>	//executes delet funtion which changes state
      ) //return
    }.bind(this)); //filteredApts.map
    return (
      <div className="interface">
        <AddAppointment
	          bodyVisible = { this.state.aptBodyVisible }
	          handleToggle = { this.toggleAddDisplay }
	          addApt = { this.addItem }
        />
        <SearchAppointments 
          orderBy = { this.state.orderBy }
          orderDir = { this.state.orderDir }
          onReOrder = { this.reOrder }
          onSearch = { this.searchApts }
        />
        <ul className="item-list media-list">{filteredApts}</ul>
      </div>
    ) //return
  } //render
}); //MainInterface



ReactDOM.render(
  <MainInterface />,
  document.getElementById('appointments')
); //render
