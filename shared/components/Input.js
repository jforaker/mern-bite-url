import React from 'react';

export default class Input extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {

		return (
			<input value={this.props.text}
				   autoComplete="off"
				   type="text"
				   id="setter"
				   onKeyDown={this.props.move}
				   onChange={this.props.write}/>
		);
	}
}
