import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import DevTools from '../../container/DevTools/DevTools';
import rootReducer from '../reducers/reducer';
const reduxLogger = require('redux-logger')({level: 'info', collapsed: true});

let middleware = [
	thunk
];

export function configureStore(initialState = {}) {
	let enhancerClient;
	middleware.push(reduxLogger);
	if (process.env.CLIENT) {

		enhancerClient = compose(
			applyMiddleware(...middleware),
			window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
		);
	}


	const enhancerServer = applyMiddleware(thunk);

	let store;

	if (process.env.CLIENT) {
		store = createStore(rootReducer, initialState, enhancerClient);
	} else {
		store = createStore(rootReducer, initialState, enhancerServer);
	}

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers/reducer', () => {
			const nextReducer = require('../reducers/reducer').default;
			store.replaceReducer(nextReducer);
		});
	}

	return store;
}
