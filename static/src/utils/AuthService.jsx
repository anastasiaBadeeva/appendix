import _ from 'lodash';
import auth0 from 'auth0-js';
import jwt_decode from 'jwt-decode';

import { AppConfig } from '../config';

const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';

const CLIENT_ID = 'msHijQUkbdPGrkTBAAUXmIERtGdzAMkT';
const CLIENT_DOMAIN = 'login.markerr.com';
const REDIRECT = AppConfig.appUrl + '/callback.html';
const SCOPE = 'openid profile email';
const AUDIENCE = 'https://markerr-dev.us.auth0.com/api/v2/';
const DATABASE = 'Username-Password-Authentication';
const CONFIGBASEURL = 'https://cdn.auth0.com';

const auth = new auth0.WebAuth({
	clientID: CLIENT_ID,
	domain: CLIENT_DOMAIN,
	audience: AUDIENCE,
	responseType: 'token id_token',
	redirectUri: REDIRECT,
	scope: SCOPE,
	connection: DATABASE,
	configurationBaseUrl: CONFIGBASEURL,
});

export function silentLogin(params) {
	const authSilent = new auth0.WebAuth({
		clientID: params.cliendId,
		domain: CLIENT_DOMAIN
	});

	authSilent.authorize({
		responseType: params.responseType ? params.responseType : 'token id_token',
		redirectUri: params.redirectUri,
		scope: SCOPE,
		audience: AUDIENCE,
		configurationBaseUrl: CONFIGBASEURL,
		prompt: 'none',
		connection: DATABASE,
	});
}

export function login() {
	auth.authorize();
}

export function getIdToken() {
	return localStorage.getItem(ID_TOKEN_KEY);
}

export function getAccessToken() {
	return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getUserEmail() {
	const idToken = getIdToken();
	const jwt = idToken ? jwt_decode(getIdToken()) : { email: ''};

	return jwt.email;
}

export function getUser() {
	const idToken = getIdToken();
	const user = idToken ? jwt_decode(idToken) : { name: '', email: '' };

	return user;
}

function checkGroups(groups) {
	const jwt = jwt_decode(getAccessToken());
	return _.intersection(jwt['https://markerr.com/groups'] || [], groups || []).length > 0;
}

export function isUserInGroup(label, groupsType) {
	const groups = AppConfig[groupsType];
	const group = groups[label];

	return checkGroups(group);
}

export function hasUserSomeGroup(groupsType) {
	const groups = AppConfig[groupsType];
	const groupsValue = Object.keys(groups).map(key => groups[key][0]);
	
	return checkGroups(groupsValue);
}

function removeTokens() {
	const keysToRemove = [ID_TOKEN_KEY, ACCESS_TOKEN_KEY];
	keysToRemove.forEach(key => localStorage.removeItem(key));
}

export function logout() {
	removeTokens();
	auth.logout({ returnTo: AppConfig.appUrl });
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
	let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Get and store access_token in local storage
export function setAccessToken() {
	let accessToken = getParameterByName('access_token');
	localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

// Get and store id_token in local storage
export function setIdToken() {
	let idToken = getParameterByName('id_token');
	localStorage.setItem(ID_TOKEN_KEY, idToken);
}

function getTokenExpirationDate(encodedToken) {
	const token = jwt_decode(encodedToken);
	if (!token.exp) {
		return null;
	}

	const date = new Date(0);
	date.setUTCSeconds(token.exp);

	return date;
}

function isTokenExpired(token) {
	const expirationDate = getTokenExpirationDate(token);
	return expirationDate < new Date();
}

export function isLoggedIn() {
	const idToken = getIdToken();
	return !!idToken && !isTokenExpired(idToken);
}
