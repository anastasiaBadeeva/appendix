import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { AppConfig } from '../../config';

class NoAccess extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { match: { params: { appName } } } = this.props;
		return (
			<div className="bg-fill">
				 <div className="container fill app-choose-container">
				   <div className="row">
							<Alert bsStyle="warning" className="greetings">
								<p>
								 {'We’re sorry, but your account does not have permission to access ' +
								 AppConfig.appNames[appName] || 'this site' + '.' }.</p>
								<br/>

								<p>Please email <a href="mailto:support@markerr.com">support@markerr.com</a> to gain access. Thank you.</p>
							</Alert>
				   </div>
				 </div>
			</div>
		)
	}
}

NoAccess.propTypes = {
	match: PropTypes.object,
};

export default withRouter(NoAccess);
