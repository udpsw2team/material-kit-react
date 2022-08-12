import todoAction from '../actions/index';

const { GET_SITES_REQUEST, GET_SITES_SUCCESS, GET_SITES_FAILED,
  CREATE_SITE_REQUEST, CREATE_SITE_SUCCESS, CREATE_SITE_FAILED,
  UPDATE_SITE_REQUEST, UPDATE_SITE_SUCCESS, UPDATE_SITE_FAILED,
  GET_LICENSES_REQUEST, GET_LICENSES_SUCCESS, GET_LICENSES_FAILED,
  GET_LICENSE_REQUEST, GET_LICENSE_SUCCESS, GET_LICENSE_FAILED,
  CREATE_LICENSE_REQUEST, CREATE_LICENSE_SUCCESS, CREATE_LICENSE_FAILED, TOGGLE_LICENSE,
  GET_LICENSE_CODES_REQUEST, GET_LICENSE_CODES_SUCCESS, GET_LICENSE_CODES_FAILED,
  UPDATE_LICENSE_REQUEST, UPDATE_LICENSE_SUCCESS, UPDATE_LICENSE_FAILED,
  DELETE_LICENSE_REQUEST, DELETE_LICENSE_SUCCESS, DELETE_LICENSE_FAILED,
  DELETE_SITE_REQUEST, DELETE_SITE_SUCCESS, DELETE_SITE_FAILED,
  GET_LICENSE_CODE_CONNECTION_REQUEST, GET_LICENSE_CODE_CONNECTION_SUCCESS, GET_LICENSE_CODE_CONNECTION_FAILED,
  GET_SITE_CORE_CONNECTIONS_REQUEST, GET_SITE_CORE_CONNECTIONS_SUCCESS, GET_SITE_CORE_CONNECTIONS_FAILED,
  GET_SITE_CORE_CONNECTION_CHECKOUTS_REQUEST, GET_SITE_CORE_CONNECTION_CHECKOUTS_SUCCESS, GET_SITE_CORE_CONNECTION_CHECKOUTS_FAILED
 } = todoAction.todo;

const initialState = {
  curSite: null,
  sites: [],
  siteIds: [],
  siteObject: {},
  licenses: [],
  licenseCodes: [],
  createLicenseResult: {},
  updateLicenseResult: {},
  lastCreatedLicense: {},
  checkouts: [],
  curLicenseCodeConnection: [],
  siteCoreConnections: [],
  siteCoreConnectionCheckouts: [],
  
  //  site status
  getSitesStatus: null,
  createSiteStatus: null,
  deleteSiteStatus: null,
  getLicensesStatus: null,
  getLicenseStatus: null,
  getLicenseCodesState: null,
  createLicenseStatus: null,
  updateLicenseStatus: null,
  deleteLicenseStatus: null,
  getLicenseCodeConnectionState: null,
  getSiteCoreConnectionsStatus: null,
  getSiteCoreConnectionCheckoutsStatus: null,
  authToken: null,
}

const siteApi = (state = initialState, action) => {
  switch (action.type) {
    case GET_SITES_REQUEST:
      return { ...state, getSitesStatus: 0 }
    case GET_SITES_SUCCESS:
      {
        const sites = action.data;
        const tmpSiteIds = [];
        const tmpSiteObject = {};
        sites.forEach(site => {
          tmpSiteIds.push(site.id);
          tmpSiteObject[site.id] = site;
        })
        return {
          ...state,
          sites,
          siteIds: tmpSiteIds,
          siteObject: tmpSiteObject,
          getSitesStatus: 1
        }
      }
    case GET_SITES_FAILED:
      return { ...state, getSitesStatus: -1 }
    case CREATE_SITE_REQUEST:
      return { ...state, createSiteStatus: 0 }
    case CREATE_SITE_SUCCESS:
      return { ...state, createSiteStatus: 1 }
    case CREATE_SITE_FAILED:
      return { ...state, createSiteStatus: -1 }
    case UPDATE_SITE_REQUEST:
      return { ...state, updateSiteStatus: 0 };
    case UPDATE_SITE_SUCCESS:
      return { ...state, updateSiteStatus: 1 };
    case UPDATE_SITE_FAILED:
      return { ...state, updateSiteStatus: -1 };
    case DELETE_SITE_REQUEST:
      return { ...state, deleteSiteStatus: 0 }
    case DELETE_SITE_SUCCESS:
      return { ...state, deleteSiteStatus: 1 }
    case DELETE_SITE_FAILED:
      return { ...state, deleteSiteStatus: -1 }
    case GET_LICENSES_REQUEST:
      return { ...state, getLicensesStatus: 0 }
    case GET_LICENSES_SUCCESS:
      {
        const licenses = action.data;
        licenses.forEach((license) => {
          license.isExpand = false;
          license.licenses.forEach(l => {
            l.cores = l.checkout || [];
            l.licenseType = state.licenseCodes.find(code => code.code === l.licenseCode).name || '';
          })
          // license.licenseCode = license.licenses[0].licenseCode
          // license.channels = license.licenses[0].channels
          // license.usingChannels = license.licenses[0].usingChannels
          // license.cores = license.checkout || [];
          // license.licenseType = state.licenseCodes.find(code => code.code === license.licenseCode).name || '';
          // license.licenses = license.licenses || [];
        })
        return {
          ...state,
          licenses,
          getLicensesStatus: 1
        }
      }
    case GET_LICENSES_FAILED:
      return { ...state, getLicensesStatus: -1 }
    case GET_LICENSE_REQUEST:
      return { ...state, getLicenseStatus: 0 }
    case GET_LICENSE_SUCCESS:
      {
        const license = action.data[0] || {};
        license.isExpand = false;
        license.licenseCode = license.licenses[0].licenseCode
        license.channels = license.licenses[0].channels
        license.usingChannels = license.licenses[0].usingChannels
        license.cores = license.checkout || [];
        license.licenseType = state.licenseCodes.find(code => code.code === license.licenses[0].licenseCode).name || '';
        license.licenses = license.licenses || [];
        return {
          ...state,
          lastCreatedLicense: license,
          getLicenseStatus: 1
        }
      }
    case GET_LICENSE_FAILED:
      return { ...state, getLicenseStatus: -1 }
    case CREATE_LICENSE_REQUEST:
      return { ...state, createLicenseStatus: 0 }
    case CREATE_LICENSE_SUCCESS:
      {
        const result = action.data;
        return { ...state, createLicenseResult: result, createLicenseStatus: 1 }
      }
    case CREATE_LICENSE_FAILED:
      return { ...state, createLicenseStatus: -1 }
    case UPDATE_LICENSE_REQUEST:
      return { ...state, updateLicenseStatus: 0 }
    case UPDATE_LICENSE_SUCCESS:
      return { ...state, updateLicenseResult: action.data, updateLicenseStatus: 1 }
    case UPDATE_LICENSE_FAILED:
      return { ...state, updateLicenseStatus: -1 }
    case DELETE_LICENSE_REQUEST:
      return { ...state, deleteLicenseStatus: 0 }
    case DELETE_LICENSE_SUCCESS:
      return { ...state, deleteLicenseStatus: 1 }
    case DELETE_LICENSE_FAILED:
      return { ...state, deleteLicenseStatus: -1 }
    case GET_LICENSE_CODES_REQUEST:
      return { ...state, getLicenseCodesState: 0 }
    case GET_LICENSE_CODES_SUCCESS:
      {
        const licenseCodes = action.data;
        return {
          ...state,
          licenseCodes,
          getLicenseCodesState: 1
        }
      }
    case GET_LICENSE_CODES_FAILED:
      return { ...state, getLicenseCodesState: -1 }
    case TOGGLE_LICENSE:
      {
        // const idx = state.licenses.findIndex(license => license.id === action.licenseId);
        const targetLicense = state.licenses.find(license => license.id === action.licenseId);
        // const targetLicense = state.licenses[idx];
        const {isExpand} = targetLicense;
        return {
          ...state,
          licenses: state.licenses.map(license => license.id === action.licenseId ?
            // transform the one with a matching id
            { ...license, isExpand: !isExpand } :
            // otherwise return original todo
            license
          )
        };
      }
    case GET_LICENSE_CODE_CONNECTION_REQUEST:
      return { ...state, getLicenseCodeConnectionState: 0 }
    case GET_LICENSE_CODE_CONNECTION_SUCCESS:
      {
        const curLicenseCodeConnection = action.data;
        return {
          ...state,
          curLicenseCodeConnection,
          getLicenseCodeConnectionState: 1
        }
      }
    case GET_LICENSE_CODE_CONNECTION_FAILED:
      return { ...state, getLicenseCodeConnectionState: -1 }
    case GET_SITE_CORE_CONNECTIONS_REQUEST:
      return { ...state, getSiteCoreConnectionsStatus: 0 }
    case GET_SITE_CORE_CONNECTIONS_SUCCESS:
      {
        const siteCoreConnections = action.data;
        return {
          ...state,
          siteCoreConnections,
          getSiteCoreConnectionsStatus: 1
        }
      }
    case GET_SITE_CORE_CONNECTIONS_FAILED:
      return { ...state, getSiteCoreConnectionsStatus: -1 }
    case GET_SITE_CORE_CONNECTION_CHECKOUTS_REQUEST:
      return { ...state, getSiteCoreConnectionCheckoutsStatus: -1}
    case GET_SITE_CORE_CONNECTION_CHECKOUTS_SUCCESS:
      {
        const siteCoreConnectionCheckouts = action.data;
        return {
          ...state,
          siteCoreConnectionCheckouts,
          getSiteCoreConnectionCheckoutsStatus: 1
        }
      }
    case GET_SITE_CORE_CONNECTION_CHECKOUTS_FAILED:
      return { ...state, getSiteCoreConnectionCheckoutsStatus: 0}
    default:
      return state;
  }
}

export default siteApi;