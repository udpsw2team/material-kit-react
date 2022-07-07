// // routes
// import Router from './routes';
// // theme
// // components

// export default function App() {
//   return (
//     <ThemeProvider>
//       <ScrollToTop />
//       <BaseOptionChartStyle />
//       <Router />
//     </ThemeProvider>
//   );
// }

// ----------------------------------------------------------------------
import React, { useState, useEffect } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { Hub } from "@aws-amplify/core";
import { useDispatch } from "react-redux";
import ScrollToTop from './components/ScrollToTop';
import ThemeProvider from './theme';
import {setAuthToken, setUserInfo} from './actions/authEnv';
import Router from './routes';
import './App.scss';

function App() {
  const [locale, setLocale] = useState('en');
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          getUser().then(() => setToken());
          break;
        case "signOut":
          break;
        case "signIn_failure":
          console.log("Sign in failure", data);
          break;
        default:
          break;
      }
    });

    getUser().then((userData) => {
      if (userData) {
        setToken();
      } 
    });
    // eslint-disable-next-line
  }, []);

  function getUser() {
    console.log('getUser -----------------');
    return Auth.currentAuthenticatedUser()
      .then((userData) => {
        const authToken = userData.signInUserSession?.idToken?.jwtToken;
        console.log(userData);
        dispatch(setUserInfo(userData));
        localStorage.setItem('authToken', authToken);
        dispatch(setAuthToken(authToken));
        setIsLoading(false);
      })
      .catch((err) => console.log(`Not signed in : err = ${err.toString()}`));
  }

  function setToken() {
    console.log('setToken -----------------');
    Auth.currentSession().then(session => {
      console.log('session', session);
      const authToken = session?.idToken?.jwtToken;
      localStorage.setItem('authToken', authToken);
      dispatch(setAuthToken(authToken));
      setIsLoading(false)
    })
    .catch(err => console.log(err));
  }

  return (
    <ThemeProvider>
      <ScrollToTop />
      {
        isLoading ? <div>Loading...</div> :<Router setLocale={setLocale}/>
      }
    </ThemeProvider>
  );
}

export default withAuthenticator(App);