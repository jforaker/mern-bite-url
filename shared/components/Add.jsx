import React, { Component, PropTypes } from 'react';
import Input from './Input';
import Cursor from './Cursor';
import Writer from './Writer';
import Validator from './Validator';

class Add extends Component {

	constructor(props, context) {
		super(props, context);
		this.addPost = this.addPost.bind(this);
		this.focus = this.focus.bind(this);
		this.write = this.write.bind(this);
		this.move = this.move.bind(this);
		this.setValid = this.setValid.bind(this);
		this.state = {
			cursorLeft: 0,
			cursorVisible: 'hidden',
			val: '',
			isValid: false
		};
	}

	componentDidMount () {
		setTimeout(() => this.focus(), 1000);
		setInterval(() => this.focusListener(), 250);
	}

	componentWillUnmount () {
		clearInterval(this.focusListener)
	}

	focusListener () {
		var x = document.getElementById('setter');
		if (!x) return;
		if (x === document.activeElement) {
			this.setState({ cursorVisible: 'visible' })
		} else {
			this.setState({ cursorVisible: 'hidden' })
		}
	}

	addPost(e) {
		e.preventDefault();
		if (this.state.isValid) {
			this.props.addPost(this.state.val);
			this.setState({ val: '' })
		}
	}

	focus () {
		const s = document.getElementById('setter');
		if (s) {
			s.focus();
			this.setState({cursorVisible: 'visible'})
		}
	}

	write (e) {
		this.setState({ val: e.target.value })
	}

	move (e) {
		const keycode = e.keyCode || e.which;
		const cursor = document.getElementById('cursor');
		const left = parseInt(cursor.style.left);
		const setLeft = (val) => this.setState({ cursorLeft: val });
		const FILL = 3;
		const WIDTH = 15;
		const count = e.target.value.length + FILL;

		if (keycode === 37 && left >= (0 - (count * WIDTH))) {
			setLeft(left - WIDTH + 'px');
		} else if (keycode === 39 && ((left + WIDTH) <= 0)) {
			setLeft(left + WIDTH + 'px');
		}
	}

	setValid (tf) {
		this.setState({ isValid:tf })
	}

	render() {
		const {cursorVisible, cursorLeft} = this.state;
		return (
			<div>
				<h5>enter a url to bite-size</h5>
				<form onSubmit={this.addPost}>
					<div className="form-content">
						<div id="terminal" onClick={this.focus}>
							<Input text={this.state.val} move={this.move} write={this.write}/>
							<div id="wrap">
								<Writer text={this.state.val}/>
								<Cursor cursorLeft={cursorLeft} cursorVisible={cursorVisible}/>
							</div>
							<Validator text={this.state.val} setValid={this.setValid}/>
						</div>
						<button type="submit" className={`btn ${this.state.isValid}`} disabled={!this.state.isValid}>
							Submit
						</button>
					</div>
				</form>
			</div>

		);
	}
}

Add.propTypes = {
	addPost: PropTypes.func.isRequired
};

export default Add;
