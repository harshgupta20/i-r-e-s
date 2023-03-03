import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';

const About = () => {

  return (
    <>
      <div className="about-main">
        <div className="about-body">
          <div className="about-title">
            <Typography fontSize={30} style={{color:"#757ce8", fontWeight:"bolder"}}>About</Typography>
          </div>

          <div className="about-content">
            <img src="" alt="" />
            <Typography>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos consectetur odit doloremque earum nostrum quia repellendus autem nam sint odio error sunt, perferendis id debitis saepe, delectus aperiam repudiandae eos?</Typography>
          </div>
        </div>
      </div>

    </>
  )
}

export default About