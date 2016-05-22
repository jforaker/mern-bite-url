import * as ActionTypes from '../constants/constants';
import Config from '../../../server/config';
import fetch from 'isomorphic-fetch';

const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : '';

export function addPost(post) {
	return { type: ActionTypes.ADD_POST, post };
}

export function changeSelectedPost(slug) {
	return { type: ActionTypes.CHANGE_SELECTED_POST, slug };
}

export function addPostRequest(post) {
	return (dispatch) => {
		fetch(`${baseURL}/api/addUrl`, {
			method: 'post',
			body: JSON.stringify({url: { url: post.url } }),
			headers: new Headers({ 'Content-Type': 'application/json' })
		})
			.then((res) => res.json())
			.then(res => dispatch(addPost(res.url)));
	};
}

export function addSelectedPost(post) {
	return { type: ActionTypes.ADD_SELECTED_POST, post };
}

export function getPostRequest(post) {
	console.log('post getPostRequest action', post);
	return (dispatch) => {
		return fetch(`${baseURL}/api/getUrl?hash=${post}`, {
			method: 'get',
			headers: new Headers({ 'Content-Type': 'application/json' })
		})
			.then((response) => response.json())
			.then(res => dispatch(addSelectedPost(res.post)));
	};
}

export function deletePost(post) {
	return { type: ActionTypes.DELETE_POST, post };
}

export function addPosts(posts) {
	return { type: ActionTypes.ADD_POSTS, posts };
}

export function fetchPosts() {
	dispatch(addPosts([]));
	//return (dispatch) => {
	//	return fetch(`${baseURL}/api/getUrls`)
	//		.then((response) => response.json())
	//		.then((response) => dispatch(addPosts(response.posts)));
	//};
}

export function deletePostRequest(post) {
	return (dispatch) => {
		fetch(`${baseURL}/api/deletePost`, {
			method: 'post',
			body: JSON.stringify({ postId: post._id }),
			headers: new Headers({ 'Content-Type': 'application/json' })
		}).then(() => dispatch(deletePost(post)));
	};
}
