import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';

import emailjs from '@emailjs/browser';

import {auth} from "../../config/Firebase";
import { useAuthState } from 'react-firebase-hooks/auth';





const Contact = () => {

  const [user] = useAuthState(auth);

  const [userTitle, setUserTitle] = useState();
  const [userMessage, setUserMessage] = useState();




  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_3gdfovd', 'template_m7vgo76', form.current, 'sMGePx0QrjPDPs-Xs')
      .then((result) => {
        console.log(result.text);
        alert("Check your email");
      }, (error) => {
        console.log(error.text);
        alert("An error occured!!!, If this is happening offen then contact admin");
      });

      setUserTitle("");
      setUserMessage("");
  };

  return (
    <>
      <div id="pd-main">
        <div id="pd-body">
          <Typography>Send all your queries from this section</Typography>
          <Typography fontSize="small" color="primary">Kindly first give the short title of query then type message. </Typography>

          <div id="pd-form">
            <form ref={form} onSubmit={sendEmail}>
            <Box id="pd-Box"
              sx={{
                width: 500,
                maxWidth: '100%',
              }}
            >
              <TextField  name='user_email' fullWidth value={user ? user?.email : "Your Email"} label={user ? user?.email : "Your Email"} id="fullWidth" />
            </Box>
              <Box id="pd-Box"
                sx={{
                  width: 500,
                  maxWidth: '100%',
                }}
              >
                <TextField onChange={(e) => setUserTitle(e.target.value)} value={userTitle} name="user_title" fullWidth label="Title" id="fullWidth" />
              </Box>
              <Box id="pd-Box"
                sx={{
                  width: 500,
                  maxWidth: '100%',
                }}
              >
                <TextField onChange={(e) => setUserMessage(e.target.value)} value={userMessage} name="message" fullWidth label="Message" id="fullWidth" />
              </Box>

              <Button fullWidth variant='contained' type='submit' value="Send">Submit</Button>
            </form>
          </div>
        </div>
      </div>

    </>
  )
}

export default Contact;