import React, { Component }from 'react';
import { Redirect } from 'react-router-dom'

import { setAccessToken, setIdToken } from '../../utils/AuthService';

export default class Callback extends Component {
	constructor() {
		super();
		this.state = {
			navigate: false,
		};
	}

	componentDidMount() {
		setAccessToken();
		setIdToken();
		this.setState({ navigate: '/' });
	}

	render() {
		const { navigate } = this.state;
		return navigate !== false ? <Redirect to="/" push={true}/> : <div/>;
	}
}
