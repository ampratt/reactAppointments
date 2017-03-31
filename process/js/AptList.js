var React = require('react');

var AptList = React.createClass({

	handleDelete: function() {
		this.props.onDelete(this.props.whichItem)	//passes clicked item to event
	},

	 render: function() {
	 	const participants = this.props.singleItem.participants;

	 	return(
	 		<li className="pet-item media">
	 			<button className="pet-delete btn btn-xs btn-danger" onClick={this.handleDelete}>
	 				<span className="glyphicon glyphicon-remove"></span>
	 			</button>

	          <div className="pet-info media-body">
	            <div className="pet-head">
	              <span className="pet-name">{this.props.singleItem.aptTitle}</span>
	              <span className="apt-date pull-right">{this.props.singleItem.aptDate}</span>
	            </div>
	            <div className="owner-name"><span className="label-item">Participants: </span>
					{participants.map((person, index) =>
						(participants.indexOf(person) === (participants.length-1)) ?
							<span>{person}</span>:
							<span>{person}, </span>
					)}
	            </div>
	            <div className="apt-notes">{this.props.singleItem.aptNotes}</div>
	          </div>
	        </li>
		)//return
	 }//render
}); //AptList

module.exports=AptList;