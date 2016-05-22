import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import PostCreateView from '../../components/Add';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import * as Actions from '../../redux/actions/actions';

class PostContainer extends Component {

	constructor(props, context) {
		super(props, context);
		this.add = this.add.bind(this);
	}

	add(url) {
		this.props.dispatch(Actions.addPostRequest({url}));
	}

	render() {
		return (
			<div>
				<div className="container">
					<PostCreateView addPost={this.add}/>
				</div>
			</div>
		);
	}
}

function mapStateToProps(store) {
	return {
		posts: store.posts,
		post: store.post
	};
}

PostContainer.propTypes = {
	dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(PostContainer);
