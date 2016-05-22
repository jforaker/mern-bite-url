import _ from 'lodash'
import * as ActionTypes from '../constants/constants';

const initialState = {
	posts: [],
	post: {}
};

const postReducer = (state = initialState, action) => {

	switch (action.type) {

		case ActionTypes.ADD_POST :
			console.log('action ', action);
			const url = _.assign({}, {
				url: action.post.url,
				hash: action.post.hash,
				cuid: action.post.cuid,
				_id: action.post._id
			});
			console.log('url  reducer', url);
			return {
				posts: [url, ...state.posts],
				post: url
			};

		case ActionTypes.CHANGE_SELECTED_POST :
			return {
				posts: state.posts,
				post: action.slug
			};

		case ActionTypes.ADD_POSTS :
			return {
				posts: action.posts,
				post: state.post
			};

		case ActionTypes.ADD_SELECTED_POST :
			return {
				post: action.post,
				posts: state.posts
			};

		case ActionTypes.DELETE_POST :
			return {
				posts: state.posts.filter((post) => post._id !== action.post._id)
			};

		default:
			return state;
	}
};

export default postReducer;
