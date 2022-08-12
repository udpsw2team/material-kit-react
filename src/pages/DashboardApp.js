import { useState, useCallback, useEffect } from 'react';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Box } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { Auth } from 'aws-amplify';

// components
import { useSelector, useDispatch } from "react-redux";
import Page from '../components/Page';
import Core from '../components/Core';

import {
  getSites,
  getMe
} from '../actions/todo';

export default function DashboardApp({ setLocale }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const sites = useSelector(state => state.siteApi.sites)
  const getSitesStatus = useSelector(state => state.siteApi.getSitesStatus)
  
  const [isLoading, setIsLoading] = useState(false);
  const [totalSite, setTotalSite] = useState(0);

  const [curIndex, siteIndex] = useState(2);
  const [isUserLoading, userLoading] = useState(false);
  const [userInfo, authAttr] = useState({});

  const _getSites = useCallback(() => {
    dispatch(getSites())
  }, [dispatch]);

  
  useEffect(() => {
    console.log('currentAuthenticatedUser');
    Auth.currentAuthenticatedUser().then(info => {
      console.log('authAttr');
      console.log(JSON.stringify(info.attributes));
      if (info) {
        if (info.attributes) {
          authAttr({ userInfo: info.attributes });
          userLoading(true);
        }
      }
    })
    return () => {}      
  },[]);

  useEffect(() => {
    _getSites();
  }, [_getSites])

  useEffect(() => {
    setTotalSite(sites.length);
  }, [sites])

  useEffect(() => {
    if (getSitesStatus === 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [getSitesStatus]);

  const onClickSiteList = (index, site) => {
    console.log(`onClickSiteList : ${index} - ${JSON.stringify(site)}`);
    siteIndex(index);
  }

  return (
    <Page theme={theme} title="Dashboard1" style={{display: 'flex', flex:1, flexDirection: 'row'}}>
      <Container style={{display: 'flex', flex: 1, flexDirection: 'row', border: '1px solid', padding: '1px', width: 300}}>
        <Box
        disablePadding
        visible={isLoading}
        >
          <List
          style={{left: '0px', width: '100%', height: '100%'}}
          dense
          sx={{bgcolor: 'background.paper' }}
          >
            <ListItem>
              <ListItemButton>
                <PersonRoundedIcon />
                <ListItemText primary={isUserLoading ? userInfo.userInfo.email : ''} />
              </ListItemButton>
            </ListItem>
            {
              sites.map((site, index) => (
                <ListItem
                key={`menu-site-${site.id}`}
                title={site.address1}
                data-index={index}
                selected={curIndex === index}
                onClick={() => onClickSiteList(index, site)}>
                  <ListItemButton>
                    <ListItemIcon sx={{left: '0px', minWidth: '20px'}}>
                      <LocationOnRoundedIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText
                      primary={site.name || 'No Name'}
                      primaryTypographyProps={{fontSize: '0.8rem'}}
                    />
                  </ListItemButton>
                </ListItem>
              ))
            }
          </List>
        </Box>
        <Box>
          <Core
          id={sites[curIndex]?.id ? sites[curIndex].id : null}
          />
        </Box>
      </Container>
      {/* <Container maxWidth="xl" style={{}}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          What???
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={7} sm={6} md={3}>
            <AppWidgetSummary title={core1.name} licenses={core1} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={7} sm={6} md={3}>
            <AppWidgetSummary title={core2.name} licenses={core2} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={7} sm={6} md={3}>
            <AppWidgetSummary title={core3.name} licenses={core2} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={7} sm={6} md={3}>
            <AppWidgetSummary title={core4.name} licenses={core4} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} height={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} height={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} height={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} height={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid>
        </Grid>
      </Container> */}
    </Page>
  );
}
