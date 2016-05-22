import { Route, IndexRoute } from 'react-router'
import React from 'react'
import App from './container/App'
import NotFoundPage from './components/NotFoundPage'
import PostContainer from './container/PostContainer/PostContainer'
import PostDetailView from './container/PostDetailView/PostDetailView';
import RedirectView from './container/PostDetailView/RedirectView';

const routes = (
	<Route path="/" component={App}>
		<IndexRoute component={PostContainer}/>
		<Route path="/url/:hash" component={PostDetailView}/>
		<Route path="/u/:hash" component={RedirectView}/>
		<Route path="*" component={NotFoundPage}/>
	</Route>
);

export default routes;
