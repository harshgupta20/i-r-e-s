import React from 'react';
import "../../styles/About.css";
import { Grid, Typography, Button, Box } from '@mui/material';

const About = () => {

  return (
    <>
      <div className="about-main">
        <div className="about-body">
          <div className="about-title">
            <Typography fontSize={30} style={{ color: "#757ce8", fontWeight: "bolder" }}>About</Typography>
          </div>

          <div className="about-content">
            <img src="" alt="" />
            <Typography>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos consectetur odit doloremque earum nostrum quia repellendus autem nam sint odio error sunt, perferendis id debitis saepe, delectus aperiam repudiandae eos?
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos consectetur odit doloremque earum nostrum quia repellendus autem nam sint odio error sunt, perferendis id debitis saepe, delectus aperiam repudiandae eos? Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tempora quam quaerat id veniam, expedita rerum maxime et dolore molestiae consequatur qui nihil minus commodi deleniti! Placeat iure reiciendis iste. Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ut delectus, architecto accusamus eum neque aliquam id asperiores eius, harum suscipit consectetur aliquid nesciunt error maxime exercitationem voluptas! Quam, error!</Typography>
              <br />
            <Typography>Lorem  au Placeat iure reiciendis iste. Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ut delectus, architecto accusamus eum neque aliquam id asperiores eius, harum suscipit consectetur aliquid nesciunt error maxime exercitationem voluptas! Quam, error!</Typography>
              <br />
              <br />
              <br />
              <Typography>

              <i>See you inside <b>I-RE-S</b>.</i>
              </Typography>
          </div>
        </div>
      </div>

    </>
  )
}

export default About