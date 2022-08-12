// import { Auth } from 'aws-amplify';
// import { Hub } from "@aws-amplify/core";
import * as _ from 'lodash';
import * as authEnv from "./authEnv";
// action type
const ADD_TODO = 'ADD_TODO'
const COMPLETE_TODO = 'COMPLETE_TODO'
const GET_SITES_REQUEST = 'GET_SITES_REQUEST'
const GET_SITES_SUCCESS = 'GET_SITES_SUCCESS'
const GET_SITES_FAILED = 'GET_SITES_FAILED'
const GET_SITE = 'GET_SITE'
const CREATE_SITE_REQUEST = 'CREATE_SITE_REQUEST'
const CREATE_SITE_SUCCESS = 'CREATE_SITS_SUCCESS'
const CREATE_SITE_FAILED = 'CREATE_SITE_FAILED'
const UPDATE_SITE_REQUEST = 'UPDATE_SITE_REQUEST'
const UPDATE_SITE_SUCCESS = 'UPDATE_SITE_SUCCESS'
const UPDATE_SITE_FAILED = 'UPDATE_SITE_FAILED'
const DELETE_SITE_REQUEST = 'DELETE_SITE_REQUEST'
const DELETE_SITE_SUCCESS = 'DELETE_SITE_SUCCESS'
const DELETE_SITE_FAILED = 'DELETE_SITE_FAILED'
const GET_LICENSES_REQUEST = 'GET_LICENSES_REQUEST'
const GET_LICENSES_SUCCESS = 'GET_LICENSES_SUCCESS'
const GET_LICENSES_FAILED = 'GET_LICENSES_FAILED'
const GET_LICENSE_REQUEST = 'GET_LICENSE_REQUEST'
const GET_LICENSE_SUCCESS = 'GET_LICENSE_SUCCESS'
const GET_LICENSE_FAILED = 'GET_LICENSE_FAILED'
const CREATE_LICENSE_REQUEST = 'CREATE_LICENSE_REQUEST'
const CREATE_LICENSE_SUCCESS = 'CREATE_LICENSE_SUCCESS'
const CREATE_LICENSE_FAILED = 'CREATE_LICENSE_FAILED'
const GET_LICENSE = 'GET_LICENSE'
const CREATE_LICENSE = 'CREATE_LICENSE'
const UPDATE_LICENSE_REQUEST = 'UPDATE_LICENSE_REQUEST'
const UPDATE_LICENSE_SUCCESS = 'UPDATE_LICENSE_SUCCESS'
const UPDATE_LICENSE_FAILED = 'UPDATE_LICENSE_FAILED'
const DELETE_LICENSE_REQUEST = 'DELETE_LICENSE_REQUEST'
const DELETE_LICENSE_SUCCESS = 'DELETE_LICENSE_SUCCESS'
const DELETE_LICENSE_FAILED = 'DELETE_LICENSE_FAILED'
const TOGGLE_LICENSE = 'TOGGLE_LICENSE'
const GET_LICENSE_CODES_REQUEST = 'GET_LICENSE_CODES_REQUEST'
const GET_LICENSE_CODES_SUCCESS = 'GET_LICENSE_CODES_SUCCESS'
const GET_LICENSE_CODES_FAILED = 'GET_LICENSE_CODES_FAILED'
const GET_LICENSE_CODE_CONNECTION_REQUEST = 'GET_LICENSE_CODE_CONNECTION_REQUEST'
const GET_LICENSE_CODE_CONNECTION_SUCCESS = 'GET_LICENSE_CODE_CONNECTION_SUCCESS'
const GET_LICENSE_CODE_CONNECTION_FAILED = 'GET_LICENSE_CODE_CONNECTION_FAILED'
const GET_SITE_CORE_CONNECTIONS_REQUEST = 'GET_SITE_CORE_CONNECTIONS_REQUEST'
const GET_SITE_CORE_CONNECTIONS_SUCCESS = 'GET_SITE_CORE_CONNECTIONS_SUCCESS'
const GET_SITE_CORE_CONNECTIONS_FAILED = 'GET_SITE_CORE_CONNECTIONS_FAILED'
const GET_SITE_CORE_CONNECTION_CHECKOUTS_REQUEST = 'GET_SITE_CORE_CONNECTION_CHECKOUTS_REQUEST'
const GET_SITE_CORE_CONNECTION_CHECKOUTS_SUCCESS = 'GET_SITE_CORE_CONNECTION_CHECKOUTS_SUCCESS'
const GET_SITE_CORE_CONNECTION_CHECKOUTS_FAILED = 'GET_SITE_CORE_CONNECTION_CHECKOUTS_FAILED'

const GET_ME_REQUEST = 'GET_ME_REQUEST'
const GET_ME_SUCCESS = 'GET_ME_SUCCESS'
const GET_ME_FAILED = 'GET_ME_FAILED'
const GET_USERS_REQUEST = 'GET_USERS_REQUEST'
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS'
const GET_USERS_FAILED = 'GET_USERS_FAILED'
const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST'
const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
const CREATE_USER_FAILED = 'CREATE_USER_FAILED'
const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST'
const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED'
const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST'
const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS'
const DELETE_USER_FAILED = 'DELETE_USER_FAILED'

const DOMAIN = authEnv._DOMAIN

function setReqMethodOption(method) {
	const reqOptions = _.cloneDeep(authEnv.getRequestOption());
	reqOptions.method = method;
	return reqOptions;
}

// action creators
function addTodo(text) {
	return { type: ADD_TODO, text };
}

function addTodo2() {
	return (dispatch) => fetch("../api/add.json").then(
			res => res.json().then(data => dispatch(addTodo(data.status)))
		);
}


function complete({ complete, id }) {
	return { type: COMPLETE_TODO, complete, id };
}

function complete2(data2) {
	return (dispatch) => fetch("../api/add.json").then(
			res => res.json().then(data => dispatch(complete(data2)))
		);
}

// Site API
function getSites() {
	const requestOptions = setReqMethodOption('GET');
	const url = `${DOMAIN}sites`
	return (dispatch) => {
		dispatch({ type: GET_SITES_REQUEST })
		return fetch(url, requestOptions)
			.then(res => res.json())
			.then((data) => dispatch({ type: GET_SITES_SUCCESS, data }))
			.catch(() => dispatch({ type: GET_SITES_FAILED }))
	}
}
function getSite(siteId) {
	const requestOptions = setReqMethodOption('GET');
	const url = `${DOMAIN}sites/${siteId}`
	return fetch(url, requestOptions)
		.then(res => res.json())
		.then((data) => console.log('Get Site', data))
		.catch(console.log)
}
function createSite(data) {
	const requestOptions = setReqMethodOption('POST');
	requestOptions.body = JSON.stringify(data);
	const url = `${DOMAIN}sites`
	return (dispatch) => {
		dispatch({ type: CREATE_SITE_REQUEST })
		return fetch(url, requestOptions)
			.then((response) => {
				if (!response.ok) throw new Error(response.status);
				else return response.json();
			})
			.then(res => res.json())
			.then((data) => dispatch({ type: CREATE_SITE_SUCCESS, data }))
			.catch(() => dispatch({ type: CREATE_SITE_FAILED }))
	}
}
function updateSite(siteId, data) {
	const requestOptions = setReqMethodOption('PUT');
	requestOptions.body = JSON.stringify(data);
	const url = `${DOMAIN}sites/${siteId}`;
	return (dispatch) => {
		dispatch({ type: UPDATE_SITE_REQUEST })
		return fetch(url, requestOptions)
			.then((response) => {
				if (!response.ok) throw new Error(response.status);
				else return response.json();
			})
			.then(res => res.json())
			.then((data) => dispatch({ type: UPDATE_SITE_SUCCESS, data }))
			.catch(e => dispatch({ type: UPDATE_SITE_FAILED }))
	}
}
function deleteSite(siteId) {
	const requestOptions = setReqMethodOption('DELETE');
	const url = `${DOMAIN}sites/${siteId}`
	return (dispatch) => {
		dispatch({ type: DELETE_SITE_REQUEST })
		return fetch(url, requestOptions)
			.then((response) => {
				if (!response.ok) throw new Error(response.status);
				else return response.json();
			})
			.then(res => res.json())
			.then((data) => dispatch({ type: DELETE_SITE_SUCCESS }))
			.catch(e => dispatch({ type: DELETE_SITE_FAILED }))
	}
}

const getSiteCoreConnections = (siteId) => {
	const requestOptions = setReqMethodOption('GET');
	const url = `${DOMAIN}sites/${siteId}/core-connections`
	return (dispatch) => {
		dispatch({ type: GET_SITE_CORE_CONNECTIONS_REQUEST })
		return fetch(url, requestOptions)
			.then(res => res.json())
			.then((data) => dispatch({ type: GET_SITE_CORE_CONNECTIONS_SUCCESS, data }))
			.catch(() => dispatch({ type: GET_SITE_CORE_CONNECTIONS_FAILED }))
	}
}

const getSiteCoreConnectionCheckouts = (siteId, connectionId) => {
	const requestOptions = setReqMethodOption('GET');
	const url = `${DOMAIN}sites/${siteId}/core-connections/${connectionId}/checkouts`
	return (dispatch) => {
		dispatch({ type: GET_SITE_CORE_CONNECTION_CHECKOUTS_REQUEST })
		return fetch(url, requestOptions)
			.then(res => res.json())
			.then((data) => dispatch({ type: GET_SITE_CORE_CONNECTION_CHECKOUTS_SUCCESS, data }))
			.catch(() => dispatch({ type: GET_SITE_CORE_CONNECTION_CHECKOUTS_FAILED }))
	}
}

// License API
function getLicenses(siteId) {
	const requestOptions = setReqMethodOption('GET');
	const url = `${DOMAIN}sites/${siteId}/licenses`
	return (dispatch) => {
		dispatch({ type: GET_LICENSES_REQUEST })
		return fetch(url, requestOptions)
			.then(res => res.json())
			.then((data) => dispatch({ type: GET_LICENSES_SUCCESS, data }))
			.catch((err) => dispatch({ type: GET_LICENSES_FAILED }))
	}
}
function getLicense(siteId, licenseId, licenseCode) {
	const requestOptions = setReqMethodOption('GET');
	const url = `${DOMAIN}sites/${siteId}/licenses/${licenseId}/codes/${licenseCode}`
	return (dispatch) => {
		dispatch({ type: GET_LICENSE_REQUEST })
		return fetch(url, requestOptions)
			.then(res => res.json())
			.then((data) => dispatch({ type: GET_LICENSE_SUCCESS, data }))
			.catch(err => dispatch({ type: GET_LICENSE_FAILED }))
	}
}
function createLicense(siteId, data) {
	const requestOptions = setReqMethodOption('POST');
	requestOptions.body = JSON.stringify(data);
	const url = `${DOMAIN}sites/${siteId}/licenses`
	return (dispatch) => {
		dispatch({ type: CREATE_LICENSE_REQUEST })
		return fetch(url, requestOptions)
			.then((response) => {
				if (!response.ok) throw new Error(response.status);
				else return response.json();
			})
			.then(res => res.json())
			.then((data) => dispatch({ type: CREATE_LICENSE_SUCCESS, data }))
			.catch((err) => dispatch({ type: CREATE_LICENSE_FAILED }))
	}
}
function updateLicense(siteId, licenseId, licenseCode, data) {
	const requestOptions = setReqMethodOption('PUT');
	requestOptions.body = JSON.stringify(data);
	const url = `${DOMAIN}sites/${siteId}/licenses/${licenseId}/codes/${licenseCode}`;
	return (dispatch) => {
		dispatch({ type: UPDATE_LICENSE_REQUEST })
		return fetch(url, requestOptions)
			.then((response) => {
				if (!response.ok) throw new Error(response.status);
				else return response.json();
			})
			.then(res => res.json())
			.then((data) => dispatch({ type: UPDATE_LICENSE_SUCCESS, data }))
			.catch((err) => dispatch({ type: UPDATE_LICENSE_FAILED }))
	}
}
function deleteLicense(siteId, licenseId, licenseCode) {
	const requestOptions = setReqMethodOption('DELETE');
	const url = `${DOMAIN}sites/${siteId}/licenses/${licenseId}/codes/${licenseCode}`
	return (dispatch) => {
		dispatch({ type: DELETE_LICENSE_REQUEST })
		return fetch(url, requestOptions)
			.then((response) => {
				if (!response.ok) throw new Error(response.status);
				else return response.json();
			})
			.then(res => res.json())
			.then((data) => dispatch({ type: DELETE_LICENSE_SUCCESS, data }))
			.catch((err) => dispatch({ type: DELETE_LICENSE_FAILED }))
	}
}

function getLicenseCodes(siteId) {
	const requestOptions = setReqMethodOption('GET');
	const url = `${DOMAIN}sites/${siteId}/licenseCodes`
	return (dispatch) => {
		dispatch({ type: GET_LICENSE_CODES_REQUEST })
		return fetch(url, requestOptions)
			.then(res => res.json())
			.then((data) => dispatch({ type: GET_LICENSE_CODES_SUCCESS, data }))
			.catch((err) => dispatch({ type: GET_LICENSE_CODES_FAILED }))
	}
}

function getLicenseCodeConnection(siteId, tokenId, licenseCode) {
	const requestOptions = setReqMethodOption('GET');
	const url = `${DOMAIN}sites/${siteId}/licenses/${tokenId}/codes/${licenseCode}/connects`
	return (dispatch) => {
		dispatch({ type: GET_LICENSE_CODE_CONNECTION_REQUEST })
		return fetch(url, requestOptions)
			.then(res => res.json())
			.then((data) => dispatch({ type: GET_LICENSE_CODE_CONNECTION_SUCCESS, data }))
			.catch((err) => dispatch({ type: GET_LICENSE_CODE_CONNECTION_FAILED }))
	}
}

function fetchLicenseCodeConnection(siteId, tokenId, licenseCode) {
	const requestOptions = setReqMethodOption('GET');
	const url = `${DOMAIN}sites/${siteId}/licenses/${tokenId}/codes/${licenseCode}/connects`
	return fetch(url, requestOptions)
		.then(res => res.json())
		.catch((err) => err)
}

function toggleLicense(licenseId) {
	return { type: TOGGLE_LICENSE, licenseId };
}

// User API
function getMe() {
	const requestOptions = setReqMethodOption('GET');
	const url = `${DOMAIN}members/me`
	return (dispatch) => {
		dispatch({ type: GET_ME_REQUEST })
		return fetch(url, requestOptions)
			.then(res => res.json())
			.then((data) => dispatch({ type: GET_ME_SUCCESS, data }))
			.catch((err) => dispatch({ type: GET_ME_FAILED }))
	}
}

function getUsers() {
	const requestOptions = setReqMethodOption('GET');
	const url = `${DOMAIN}members`
	return (dispatch) => {
		dispatch({ type: GET_USERS_REQUEST })
		return fetch(url, requestOptions)
			.then(res => res.json())
			.then((data) => dispatch({ type: GET_USERS_SUCCESS, data }))
			.catch((err) => dispatch({ type: GET_USERS_FAILED }))
	}
}

function createUser(bodyData) {
	const requestOptions = setReqMethodOption('POST');
	requestOptions.body = JSON.stringify(bodyData);
	const url = `${DOMAIN}members`
	return (dispatch) => {
		dispatch({ type: CREATE_USER_REQUEST })
		return fetch(url, requestOptions)
			.then((response) => {
				if (!response.ok) throw new Error(response.status);
				else return response.json();
			})
			.then(res => res.json())
			.then((data) => dispatch({ type: CREATE_USER_SUCCESS, data }))
			.catch((err) => dispatch({ type: CREATE_USER_FAILED }))
	}
}

function updateUser(bodyData) {
	const requestOptions = setReqMethodOption('PUT');
	requestOptions.body = JSON.stringify(bodyData);
	const url = `${DOMAIN}members`
	return (dispatch) => {
		dispatch({ type: UPDATE_USER_REQUEST })
		return fetch(url, requestOptions)
			.then((response) => {
				if (!response.ok) throw new Error(response.status);
				else return response.json();
			})
			.then((data) => {
				dispatch({ type: UPDATE_USER_SUCCESS, data })
			})
			.catch((err) => {
				dispatch({ type: UPDATE_USER_FAILED })
			})
	}
}


function deleteUser(bodyData) {
	const requestOptions = setReqMethodOption('DELETE');
	requestOptions.body = JSON.stringify(bodyData);
	const url = `${DOMAIN}members`
	return (dispatch) => {
		dispatch({ type: DELETE_USER_REQUEST })
		return fetch(url, requestOptions)
			.then((response) => {
				if (!response.ok) throw new Error(response.status);
				else return response.json();
			})
			.then(res => res.json())
			.then((data) => dispatch({ type: DELETE_USER_SUCCESS, data }))
			.catch((err) => dispatch({ type: DELETE_USER_FAILED }))
	}
}



export {
	ADD_TODO,
	COMPLETE_TODO,
	GET_SITES_REQUEST,
	GET_SITES_SUCCESS,
	GET_SITES_FAILED,
	GET_SITE,
	CREATE_SITE_SUCCESS,
	CREATE_SITE_REQUEST,
	CREATE_SITE_FAILED,
	UPDATE_SITE_REQUEST,
	UPDATE_SITE_SUCCESS,
	UPDATE_SITE_FAILED,
	DELETE_SITE_REQUEST,
	DELETE_SITE_SUCCESS,
	DELETE_SITE_FAILED,
	GET_LICENSES_REQUEST,
	GET_LICENSES_SUCCESS,
	GET_LICENSES_FAILED,
	GET_LICENSE_REQUEST,
	GET_LICENSE_SUCCESS,
	GET_LICENSE_FAILED,
	GET_LICENSE,
	CREATE_LICENSE,
	UPDATE_LICENSE_REQUEST,
	UPDATE_LICENSE_SUCCESS,
	UPDATE_LICENSE_FAILED,
	DELETE_LICENSE_REQUEST,
	DELETE_LICENSE_SUCCESS,
	DELETE_LICENSE_FAILED,
	CREATE_LICENSE_REQUEST,
	CREATE_LICENSE_SUCCESS,
	CREATE_LICENSE_FAILED,
	TOGGLE_LICENSE,
	GET_LICENSE_CODES_REQUEST,
	GET_LICENSE_CODES_SUCCESS,
	GET_LICENSE_CODES_FAILED,
	GET_LICENSE_CODE_CONNECTION_REQUEST,
	GET_LICENSE_CODE_CONNECTION_SUCCESS,
	GET_LICENSE_CODE_CONNECTION_FAILED,
	GET_SITE_CORE_CONNECTIONS_REQUEST,
	GET_SITE_CORE_CONNECTIONS_SUCCESS,
	GET_SITE_CORE_CONNECTIONS_FAILED,
  GET_SITE_CORE_CONNECTION_CHECKOUTS_REQUEST,
	GET_SITE_CORE_CONNECTION_CHECKOUTS_SUCCESS,
	GET_SITE_CORE_CONNECTION_CHECKOUTS_FAILED,
	GET_ME_REQUEST,
	GET_ME_SUCCESS,
	GET_ME_FAILED,
	GET_USERS_REQUEST,
	GET_USERS_SUCCESS,
	GET_USERS_FAILED,
	CREATE_USER_REQUEST,
	CREATE_USER_SUCCESS,
	CREATE_USER_FAILED,
	UPDATE_USER_REQUEST,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_FAILED,
	DELETE_USER_REQUEST,
	DELETE_USER_SUCCESS,
	DELETE_USER_FAILED,
	addTodo,
	addTodo2,
	complete,
	complete2,
	getSites,
	getSite,
	createSite,
	updateSite,
	deleteSite,
	getSiteCoreConnections,
	getSiteCoreConnectionCheckouts,
	getLicenses,
	getLicense,
	createLicense,
	updateLicense,
	deleteLicense,
	getLicenseCodes,
	toggleLicense,
	getLicenseCodeConnection,
	fetchLicenseCodeConnection,
	getMe,
	getUsers,
	createUser,
	updateUser,
	deleteUser
}