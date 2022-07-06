// import * as _ from 'lodash';
const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN'
const SET_ME_INFO = 'SET_ME_INFO'
const PROD_DOMAIN = 'https://customer-api.analyticslicense.com/api/v1/';
const DEV_DOMAIN = 'https://vca-api.uverifier.com/api/v1/';
const _DOMAIN = process.env.REACT_APP_ENV === 'dev' ? DEV_DOMAIN: PROD_DOMAIN;
console.log('process.env');
console.log(process.env);

let AuthToken = '';

let userInfo = {};

const _requestOptions = {
	headers: {
		'Content-Type': 'application/json',
		// 'Authorization': 'Bearer ' + AuthToken 
	},
	// credentials: 'include'
};

function setAuthToken(authToken) {
	// const token = authToken;
	AuthToken = authToken;
	setReqAuthOptions(authToken);
	return { type: SET_AUTH_TOKEN, data: authToken };
}

function setReqAuthOptions(authToken) {
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${  authToken}`
	};
	_requestOptions.headers = headers
	// _requestOptions.credentials = 'include'
	// _requestOptions.withCredentials = true
}

function getRequestOption() {
	return _requestOptions;
}

function getAuthToken() {
	return AuthToken;
}

function setUserInfo(data) {
	userInfo = data.attributes || {};
	if (userInfo['custom:customerId']) userInfo.customerId = userInfo['custom:customerId'];
	return (dispatch) => {
		dispatch({ type: SET_ME_INFO, data: userInfo })
	}
}
function getUserInfo() {
	return userInfo;
}

export {
	SET_AUTH_TOKEN,
	SET_ME_INFO,
	_DOMAIN,
	setAuthToken,
	_requestOptions,
	getRequestOption,
	getAuthToken,
	setUserInfo,
	getUserInfo
}
