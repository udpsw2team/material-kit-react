import 'simplebar/src/simplebar.css';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import { Amplify } from 'aws-amplify';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';

import reducer from './reducers';

import awsconfig from './auth/aws-exports';
import DevTools from './utils/DevTools';

Amplify.configure(awsconfig);

const enhancer = compose(
	applyMiddleware(thunk),
	DevTools.instrument(),
	// window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(reducer, {}, enhancer);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  )
};


// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


store.subscribe(render);
render();