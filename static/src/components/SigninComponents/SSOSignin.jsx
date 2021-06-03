import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { AppConfig}  from '../../config';
import { silentLogin } from '../../utils/AuthService';


class SSOSignin extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { match: { params: { appName } } } = this.props;
		silentLogin(AppConfig.ssoAppConfig[appName]);
	}

	render() {
		const { match: { params: { appName } } } = this.props;
		return (<div>Redirecting to {appName}...</div>);
	}
}

SSOSignin.propTypes = {
	match: PropTypes.object,
};

export default withRouter(SSOSignin);
