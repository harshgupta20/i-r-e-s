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
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos consectetur odi</Typography>
              <br />
            <Typography>Document verification is a complex task involving various challenges and tedious authentication
processes. Furthermore, distinct types of documents give rise to the need for customized
authentication and verification procedures. The lack of an anti-forge mechanism makes the
forgery of documents an easy task. For students in particular, academic certificates issued by
their universities are of utmost importance. During admission, students need to produce these
certificates in institutions or companies. Due to low transparency in the issuing process, skilfully
generated counterfeits become hard to detect and verify. This stark increase in forged documents not only questions the credibility of the document holder but also jeopardizes faith in issuing
authority. Moreover, Multinational National Companies are investing heavily in verifying the
background details of job applicants. But the verification process implemented by these
companies to determine the authenticity of academic certificates is extremely costly,
time-consuming, and inefficient. Tracking all certificates and validating their authenticity
manually becomes a tedious task. Thus, academic certificates need to be digitalized with the
principle of Confidentiality, Reliability, and Availability.</Typography>
<br />
<br />
<Typography>Addressing the issue of counterfeiting certificates, we propose a digital certificate verification
system based on blockchain technology. Blockchain can solve the current issue of confirming the
legitimacy of digital documents, for example, an image of a birth declaration, a marked
authoritative report determining an agreement, etc. effectively at an exceptionally low
implementation cost. It has thereby emerged as a significant tool to combat document fraud and
misuse. These attributes of Blockchain make digital signatures accessible to everyone. Thus,
anybody with access to the Blockchain can now check the authenticity of a document without
depending on third-party verification. Also, students also face less risk of losing or damaging a
certificate, making their data more secure and safe. To the best of our knowledge, our aim is to
identify the gaps and loopholes in the current blockchain-based academic certificate verification
solutions and to overcome them by creating a novel framework for an Institutional Repository
using Blockchain.</Typography>
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