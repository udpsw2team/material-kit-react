import { combineReducers } from "redux";
import siteApi from "./todos";
import AuthApi from "./auth";
import UserApi from './users';
import CustomerApi from "./customer";

export default combineReducers({
  siteApi,
  UserApi,
  AuthApi,
  CustomerApi
});