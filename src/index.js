// scroll bar
import 'simplebar/src/simplebar.css';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
//
import { legacy_createStore as createStore ,applyMiddleware } from 'redux';

import { createPromise } from 'redux-promise-middleware'
import thunk from 'redux-thunk';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';

import reducer from './reducers';

const { createLogger } = require('redux-logger').default;
// ----------------------------------------------------------------------

const pm = createPromise({
  promiseTypeSuffixes: [
    'PENDING', 'SUCCESS', 'FAILURE'
  ],
  typeDelimiter: '/'
});

const store = createStore(reducer, {});

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