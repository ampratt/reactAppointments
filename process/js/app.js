var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

var AptList = require('./AptList');
var AddAppointment = require('./AddAppointment');


var MainInterface = React.createClass({
  getInitialState: function() {
    return {
    	aptBodyVisible: false, 
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

  render: function() {
    var filteredApts = this.state.myAppointments;
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
        <ul className="item-list media-list">{filteredApts}</ul>
      </div>
    ) //return
  } //render
}); //MainInterface



ReactDOM.render(
  <MainInterface />,
  document.getElementById('petAppointments')
); //render
