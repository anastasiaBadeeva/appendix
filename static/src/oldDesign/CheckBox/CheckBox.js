import React, {Component} from 'react';
// import React from 'react';

// const CheckBox = ({txt, checked, onChange}) => (
// 	<span><input type='checkbox' checked={checked} onChange={() => onChange(txt)}>{`   ${txt}`}</input></span>
// 	);

class CheckBox extends Component {
	constructor() {
		super();
		this.state = {
			isChecked: false,
		};
		this.handleChecked = this.handleChecked.bind(this);
	}

	handleChecked () {
		this.setState({isChecked: !this.state.isChecked}, this.props.handler(this.props.txt));
	}

	render () {
		return (
			<div>
				<input type="checkbox" onChange={this.handleChecked} />
				{`   ${this.props.txt}`}
			</div>
			)
	}
}

export default CheckBox;