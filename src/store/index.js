const { thunk } = require('redux-thunk');
const { createStore, applyMiddleware } = require("redux");
const myReducers = require('../reducers');

// const initState = {
// 	getSitesStatus: 0,
// 	sites: [],
// }

export default function configureStore(reducer) {
	const store = createStore(reducer, applyMiddleware(thunk));

	// Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
	if (module.hot) {
		module.hot.accept('../reducers', () =>
			store.replaceReducer(
				myReducers /* .default if you use Babel 6+ */
			)
		);
	}

	return store;
}
