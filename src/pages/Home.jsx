import { Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ShieldIcon from '@mui/icons-material/Shield';
import React from 'react';
import bg2 from "../img/bg2.svg"
import "../styles/Home.css";

const Home = () => {

  // console.log(process.env.REACT_APP_API_KEY )

  return (
    <>
      <div style={{backgroundImage:`url(${bg2})`}} id="home-main">
        <div id="home-body">
          <div id="home-title">
            <div id="home-title-content">

              <Typography fontSize={50}><b style={{color:"#757ce8"}}><LockIcon fontSize="large"/>Securely</b> share your</Typography>
              <Typography fontSize={50}><b style={{color:"#757ce8"}}><InsertDriveFileIcon fontSize="large"/>Document</b> and make them</Typography>
              <Typography fontSize={50}><b style={{color:"#757ce8"}}><ShieldIcon fontSize='large'/>Authentic</b> on internet.</Typography>
            </div>
          </div>
          <div id="home-video">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/4sJvrmmadkU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home