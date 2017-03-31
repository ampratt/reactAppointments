var React = require('react');

var AddAppointment = React.createClass({

	//state has to be controlled from main component, 
	//so props have to be passed to current component
	toggleAptDisplay: function() {
		this.props.handleToggle();
	},

	handleAdd: function(e) {
		var tempItem = {
		  aptTitle: this.refs.inputAptTitle.value,
		  participants: this.refs.inputParticipants.value,
		  aptDate: this.refs.inputAptDate.value + ' ' +
		    this.refs.inputAptTime.value,
		  aptNotes: this.refs.inputAptNotes.value
		} //tempItem
		//prevent JS reload and sending info to server
		e.preventDefault();
		//execute a prop in main component
		this.props.addApt(tempItem);
	}, //handleAdd

	render: function() {

	    var displayAptBody = {
	      // var: bodyVisible is passed from parent through props
	      display: this.props.bodyVisible ? 'block' : 'none'
	    };

	    return(
	      <div className="panel panel-primary">
	        <div className="panel-heading apt-addheading" onClick={ this.toggleAptDisplay }>
	        <span className="glyphicon glyphicon-plus"></span> Add Appointment</div>
	        <div className="panel-body" style={ displayAptBody }>
	          <form className="add-appointment form-horizontal"
	          onSubmit={ this.handleAdd }>
	            <div className="form-group">
	              <label className="col-sm-2 control-label" for="aptTitle">Title</label>
	              <div className="col-sm-10">
	                <input type="text" className="form-control"
	                  id="aptTitle" ref="inputAptTitle" placeholder="Appointment Title" />
	              </div>
	            </div>
	            <div className="form-group">
	              <label className="col-sm-2 control-label" for="participants">Participants</label>
	              <div className="col-sm-10">
	                <input type="text" className="form-control"
	                  id="participants" ref="inputParticipants" placeholder="Participants" />
	              </div>
	            </div>
	            <div className="form-group">
	              <label className="col-sm-2 control-label" for="aptDate">Date</label>
	              <div className="col-sm-4">
	                <input type="date" className="form-control"
	                  id="aptDate" ref="inputAptDate" />
	              </div>
	              <label className="col-sm-2 control-label" for="aptTime">Time</label>
	              <div className="col-sm-4">
	                <input type="time" className="form-control"
	                  id="aptTime" ref="inputAptTime" />
	              </div>

	            </div>
	            <div className="form-group">
	              <label className="col-sm-2 control-label" for="aptNotes">Apt. Notes</label>
	              <div className="col-sm-10">
	                <textarea className="form-control" rows="4" cols="50"
	                  id="aptNotes" ref="inputAptNotes" placeholder="Appointment Notes"></textarea>
	              </div>
	            </div>
	            <div className="form-group">
	              <div className="col-sm-offset-2 col-sm-10">
	                <button type="submit" className="btn btn-primary pull-right">Add Appointment</button>
	              </div>
	            </div>
	          </form>
	        </div>
	      </div>
	    )//return
    } //render
}); // AddAppointment

module.exports = AddAppointment;