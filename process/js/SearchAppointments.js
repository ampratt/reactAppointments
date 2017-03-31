var React = require('react');

var SearchAppointments = React.createClass({

	handleSort: function(e) {
		//e.target.id = id="aptTitle"
		this.props.onReOrder(e.target.id, this.props.orderDir);
	}, //handleSort

	handleOrder: function(e) {
		//e.target.id = id="aptTitle"
		this.props.onReOrder(this.props.orderBy, e.target.id);
	}, //handleSort

	handleSearch: function(e) {
		// pass the value of our target (input) to our parent's props
		this.props.onSearch(e.target.value);
	}, //handleSearch

	render: function() {
		return(

			<div className="row search-appointments">
			  <div className="col-sm-offset-3 col-sm-6">
			    <div className="input-group">
			      <input id="SearchApts"
			      		 onChange={ this.handleSearch } 
			      		 placeholder="Search" 
			      		 type="text" 
			      		 className="form-control" 
			      		 aria-label="Search Appointments" />
			      <div className="input-group-btn">
			        <button type="button" 
			        		className="btn btn-primary dropdown-toggle"
			      			data-toggle="dropdown" 
			      			aria-haspopup="true" 
			      			aria-expanded="false">Sort by: <span className="caret"></span></button>
			          
	                <ul className="dropdown-menu dropdown-menu-right">
	                  <li><a href="#" id="aptTitle" onClick={ this.handleSort }>Title { (this.props.orderBy === 'aptTitle') ? <span className="glyphicon glyphicon-ok"></span>: null }</a></li>
	                  <li><a href="#" id="aptDate" onClick={ this.handleSort }>Date { (this.props.orderBy === 'aptDate') ? <span className="glyphicon glyphicon-ok"></span>: null }</a></li>
	                  <li><a href="#" id="participants" onClick={ this.handleSort }>Participants { (this.props.orderBy === 'participants') ? <span className="glyphicon glyphicon-ok"></span>: null }</a></li>
	                  <li role="separator" className="divider"></li>
	                  <li><a href="#" id="asc" onClick={ this.handleOrder }>Asc { (this.props.orderDir === 'asc') ? <span className="glyphicon glyphicon-ok"></span>: null }</a></li>
	                  <li><a href="#" id="desc" onClick={ this.handleOrder }>Desc { (this.props.orderDir === 'desc') ? <span className="glyphicon glyphicon-ok"></span>: null }</a></li>
	                </ul>
			      </div>
			    </div>
			  </div>
			</div>
		) //return
	} //render
});

module.exports = SearchAppointments