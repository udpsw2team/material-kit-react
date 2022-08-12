import React, { useState, useCallback, useEffect , Component } from 'react';
import { useSelector, useDispatch, connect } from "react-redux";
import './Sidebar.scss';
import { IoClose } from "react-icons/io5";
import { Auth } from 'aws-amplify';
import { Hub } from "@aws-amplify/core";
import Modal from 'react-modal';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Typography, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { countBy, find } from 'lodash';
import { Compress } from '@mui/icons-material';
import { AppWidgetSummary } from '../sections/@dashboard/app';
import SiteQuota from './SiteQuota';

import {
  getSiteCoreConnections,
  getSiteCoreConnectionCheckouts,
  getMe
} from '../actions/todo';

Modal.setAppElement('#root');

const core1 = {
  tokenId: 7,
  name: 'First Core',
  licenses: [{
    code: '1486',
    name: 'Count',
    channels: 100,
    usingChannels: 10
  },{
    code: '1901',
    name: 'Presence Enterprise',
    channels: 200,
    usingChannels: 40
  },{
    code: '1984',
    name: 'Pro Enterprise',
    channels: 150,
    usingChannels: 9
  },{
    code: '1987',
    name: 'ProAI Enterprise',
    channels: 100,
    usingChannels: 99
  }]
};

const core2 = [{
	"siteId": 116,
	"customerId": 1,
	"siteName": "LEO TEST SITE 1121",
	"address1": "Seoul, Korea",
	"address2": "717",
	"tokenId": 104,
	"token": "90855399-cb30-498f-bebd-2ad29995395c",
	"tokenName": "LEO TEST SITE Token",
	"id": "1",
	"name": "TEST CONNECTION",
	"machineId": null,
	"publicIp": "1.1.1.1",
	"pingCount": 1,
	"updatedAt": "2022-07-11T09:29:06.000Z",
	"createdAt": "2022-02-18T01:31:32.000Z",
	"checkouts": [{
		"id": "1238",
		"connectionId": "1",
		"tokenId": 104,
		"licenseCode": "1486",
		"channels": 9,
		"updatedAt": "2022-07-11T09:29:06.000Z",
		"createdAt": "2022-07-08T07:38:01.000Z"
	}, {
		"id": "1239",
		"connectionId": "1",
		"tokenId": 104,
		"licenseCode": "1901",
		"channels": 7,
		"updatedAt": "2022-07-11T09:29:06.000Z",
		"createdAt": "2022-07-08T07:44:57.000Z"
	}]
}];
const core3 = core2;
const core4 = core2;

export default function Core(id) {
  const dispatch = useDispatch();
  const siteId = id.id;
  // console.log(`siteId : ${siteId}`);

  const [isCoreConnectionLoading, setIsCoreConnectionLoading] = useState(false);
  const [cores, setCoreConnection] = useState({});
  const [coreId, setCoreId] = useState(null);
  const [coreCheckouts, setCoreCheckouts] = useState([]);
  const siteCoreConnections = useSelector(state => state.siteApi.siteCoreConnections)
  const getSiteCoreConnectionsStatus = useSelector(state => state.siteApi.getSiteCoreConnectionsStatus)

  const _getSiteCoreConnections = useCallback(() => {
    if (siteId) {
      dispatch(getSiteCoreConnections(siteId))
    }
  }, [dispatch, siteId]);

  useEffect(() => {
    _getSiteCoreConnections();
    console.log(`_getSiteCoreConnections : siteId=${siteId}, coreId=${coreId}`);
  }, [_getSiteCoreConnections, siteId])

  useEffect(() => {
    if (getSiteCoreConnectionsStatus === 0) {
      setIsCoreConnectionLoading(true);
    } else if (getSiteCoreConnectionsStatus === 1){
      setIsCoreConnectionLoading(false);

      setCoreConnection(siteCoreConnections);
      const mCoreId = siteCoreConnections.length === 0 ? null : siteCoreConnections[0].id;
      setCoreId(mCoreId);
      // if (siteId && mCoreId) {
      //   dispatch(getSiteCoreConnectionCheckouts(siteId, mCoreId));
      // } else {
      //   setCoreCheckouts([]);
      // }
    }
  }, [getSiteCoreConnectionsStatus]);

  const [isCoreConnectionCheckouts, setIsCoreConnectionCheckouts] = useState({});
  const siteCoreConnectionCheckouts = useSelector(state => state.siteApi.siteCoreConnectionCheckouts)
  const getSiteCoreConnectionCheckoutsStatus = useSelector(state => state.siteApi.getSiteCoreConnectionCheckoutsStatus)

  // const _getSiteCoreConnectionCheckouts = useCallback(() => {
  //   console.log(`siteId : ${siteId}`);
  //   console.log(`coreId : ${coreId}`);

  //   if (siteId && coreId && getSiteCoreConnectionsStatus === 1) {
  //     dispatch(getSiteCoreConnectionCheckouts(siteId, coreId))
  //   }
  // }, []);

  // useEffect(() => {
  //   _getSiteCoreConnectionCheckouts();
  //   console.log(`_getSiteCoreConnectionCheckouts : siteId=${siteId}, coreId=${coreId}`);
  // }, [_getSiteCoreConnectionCheckouts, siteId, coreId])

  useEffect(() => {
    if (getSiteCoreConnectionCheckoutsStatus === 0) {
      setIsCoreConnectionCheckouts(true);
    } else {
      setIsCoreConnectionCheckouts(false);
      console.log(`siteCoreConnectionCheckouts : ${JSON.stringify(siteCoreConnectionCheckouts)}`);
      setCoreCheckouts(siteCoreConnectionCheckouts);
    }
  }, [getSiteCoreConnectionCheckoutsStatus]);

  // const logout = () => {
  //   Auth.signOut().then(() => {
  //     Hub.dispatch("UI Auth", {
  //       event: "AuthStateChange",
  //       message: "signedout",
  //     });
  //   });
  // };

  // DisplayCore.propTypes = {
  //   cores: PropTypes.node.isRequired
  // };

  const DisplayCore = ({ cores }) => (
    <>
      {
        cores.map((item) => (
          <Grid item xs={7} sm={6} md={3} key={item.id}>
            <AppWidgetSummary
              key={item.id}
              title={item.name}
              licenses={item.checkouts}
              quota={item.quota}
            />
          </Grid>
        ))
      }
    </>
  );

  const data = [{
		"tokenId": 104,
		"licenseCode": "1486",
		"channels": 0,
		"usingChannels": 10,
		"updatedAt": "2022-07-18T06:02:24.000Z",
		"createdAt": "2022-02-16T07:08:14.000Z",
		"licenseCodeName": "Count",
		"totalChannels": 0,
		"connectionId": null
	}, {
		"tokenId": 104,
		"licenseCode": "1901",
		"channels": 0,
		"usingChannels": 9,
		"updatedAt": "2022-07-18T06:02:24.000Z",
		"createdAt": "2022-02-22T10:18:38.000Z",
		"licenseCodeName": "Presence Enterprise",
		"totalChannels": 0,
		"connectionId": null
	}, {
		"tokenId": 104,
		"licenseCode": "1984",
		"channels": 0,
		"usingChannels": 0,
		"updatedAt": "2022-02-17T08:13:31.000Z",
		"createdAt": "2022-02-17T08:13:31.000Z",
		"licenseCodeName": "Pro Enterprise",
		"totalChannels": 0,
		"connectionId": null
	}];
  return (
    <div>
      <SiteQuota quota={data} />
      <Box disablePadding
      visible={isCoreConnectionLoading && siteId}
      sx={{
        minWidth: '300px',
        minHeight: '300px',
        height: '200px'
      }}
      >
        <Grid className="core" item xs={7} sm={6} md={3} sx={{
          width:'100%', height: '100%',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flext-start'
          }}>
          <DisplayCore
          cores={siteCoreConnections}
          // checkouts={coreCheckouts}
          key="coreList"/>
        </Grid>
      </Box>
    </div>
  );
}