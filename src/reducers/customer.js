import todoAction from '../actions/index';

const {
  GET_DASHBOARDS_REQUEST, GET_DASHBOARDS_SUCCESS, GET_DASHBOARDS_FAILED } = todoAction.customer;

const initialState = {
  // users
  customerLicenses: [],
  customerUsedLicenses: [],
  customerCores: [],
  dashboardData: {},
  totalLicense: 0,
  totalUsedLicense: 0,
  totalCore: 0,
  // user status
  getDashboardsStatus: null,
  getCustomerLicensesStatus: null,
  getCustomerUsedLicensesStatus: null,
  getCustomerCoresStatus: null,
}

const CustomerApi = (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARDS_REQUEST:
      return { ...state, getDashboardsStatus: 0 }
    case GET_DASHBOARDS_SUCCESS:
      {
      const tmpDashboardData = action.data;
      const tmpLicenses = tmpDashboardData.licenses || [];
      const tmpCores = tmpDashboardData.cores || [];
      let tmpTotalLicense = 0
      let tmpTotalUseLicense = 0
      let tmpTotalCore = 0
      tmpLicenses.forEach((license, idx) => {
        if (license.totalChannels) tmpTotalLicense += parseInt(`${license.totalChannels  }`, 10)
        if (license.totalUsingChannels) tmpTotalUseLicense += parseInt(`${license.totalUsingChannels  }`, 10)
      })
      tmpCores.forEach((core, idx) => {
        if (core.connections) tmpTotalCore += parseInt(`${core.connections  }`, 10)
      })
      return {
        ...state,
        dashboardData: tmpDashboardData,
        totalLicense: tmpTotalLicense,
        totalUsedLicense: tmpTotalUseLicense,
        totalCore: tmpTotalCore,
        getDashboardsStatus: 1
      }
    }
    case GET_DASHBOARDS_FAILED:
      return { ...state, getDashboardsStatus: -1 }
    default:
      return state;
  }
}

export default CustomerApi;