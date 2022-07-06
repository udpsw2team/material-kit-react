import * as _ from 'lodash';
import * as authEnv from "./authEnv";
// action type
const GET_DASHBOARDS_REQUEST = 'GET_DASHBOARDS_REQUEST';
const GET_DASHBOARDS_SUCCESS = 'GET_DASHBOARDS_SUCCESS';
const GET_DASHBOARDS_FAILED = 'GET_DASHBOARDS_FAILED';

const DOMAIN = authEnv._DOMAIN
// let requestOptions = authEnv._requestOptions;

function setReqMethodOption(method) {
	const reqOptions = _.cloneDeep(authEnv.getRequestOption());
	reqOptions.method = method;
	return reqOptions;
}


// Customer API
function getDashboards() {
	const requestOptions = setReqMethodOption('GET');
	const url = `${DOMAIN  }dashboards`
	// const url = 'https://console-api.uverifier.com/console/v1/sites'
	return (dispatch) => {
		dispatch({ type: GET_DASHBOARDS_REQUEST })
		return fetch(url, requestOptions)
			.then(res => res.json())
			.then((data) => dispatch({ type: GET_DASHBOARDS_SUCCESS, data }))
			.catch((err) => dispatch({ type: GET_DASHBOARDS_FAILED }))
	}
}

export {
	GET_DASHBOARDS_REQUEST,
	GET_DASHBOARDS_SUCCESS,
	GET_DASHBOARDS_FAILED,
	getDashboards
}