import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from './components/Navbar'
import OrganisationProfile from './pages/OrganisationProfile';
import Home from './pages/Home';
import About from './pages/common/About';
import Project from './pages/common/Project';
import UserProfile from './pages/UserProfile';
import MyAccount from './pages/MyAccount';
import PersonalDetail from './pages/PersonalDetail';

import {auth} from "./config/Firebase";
import { useAuthState } from 'react-firebase-hooks/auth';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import VerifyDoc from './pages/VerifyDoc';
import ContactPage from './pages/common/ConactPage';



const App = () => {

  const [user] = useAuthState(auth);


  const theme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });


  return (
    <>
      <ThemeProvider theme={theme}>

        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/verify-docs" element={<VerifyDoc />} />
            <Route path="/project" element={<Project />} />
            <Route path='my-account' element={user ? <MyAccount /> : <Navigate to='/'/>}>
              <Route path="user-profile" element={<UserProfile />} />
              <Route path="org-profile" element={<OrganisationProfile />} />
              <Route path="personal-detail" element={<PersonalDetail />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
    // <div>App</div>
  )
}

export default App