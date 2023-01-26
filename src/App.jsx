import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar'
import OrganisationProfile from './pages/OrganisationProfile';
import Home from './pages/Home';
import About from './pages/common/About';
import Contact from './pages/common/Contact';
import Team from './pages/common/Team';
import Project from './pages/common/Project';
import UserProfile from './pages/UserProfile';
import MyAccount from './pages/MyAccount';
import PersonalDetail from './pages/PersonalDetail';

import { createTheme, ThemeProvider } from '@mui/material/styles';


const App = () => {



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
            <Route path="/contact" element={<Contact />} />
            <Route path="/team" element={<Team />} />
            <Route path="/project" element={<Project />} />
            <Route path='my-account' element={<MyAccount />}>
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