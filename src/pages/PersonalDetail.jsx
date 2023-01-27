import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';

import "../styles/PersonalDetail.css"

import { useAuthState } from "react-firebase-hooks/auth";

// Firebase
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from '../config/Firebase';

const PersonalDetail = () => {

  const [age, setAge] = useState("");
  const [college_name, setCollege_name] = useState("");
  const [roll_number, setRoll_number] = useState("");
  const [social_profile, setSocial_profile] = useState("");


  // Add a new document in collection "cities"
  const uploadUserData = async () => {

    if(age=="" || college_name=="" || roll_number=="" || social_profile==""){
        alert("Fields Can't be empty !!!");
    }else{
      console.log(age, college_name, roll_number, social_profile)
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        age: age,
        college_name: college_name,
        roll_number: roll_number,
        social_profile: social_profile,
        verified_status: "user",
        detail_filled: "true",
      });
      alert("Profile has been updated!");
      console.log(user.uid);
    }
  }



  const [user] = useAuthState(auth);

  return (
    <>
      <div id="pd-main">
        <div id="pd-body">
          <Typography>Enter Your Information</Typography>
          <div id="pd-form">

            <Box id="pd-Box"
              sx={{
                width: 500,
                maxWidth: '100%',
              }}
            >
              <TextField disabled fullWidth label={user?.displayName} id="fullWidth" />
            </Box>
            <Box id="pd-Box"
              sx={{
                width: 500,
                maxWidth: '100%',
              }}
            >
              <TextField disabled fullWidth label={user?.email} id="fullWidth" />
            </Box>
            <Box id="pd-Box"
              sx={{
                width: 500,
                maxWidth: '100%',
              }}
            >
              <TextField fullWidth label="Age" id="fullWidth" onChange={(e) => setAge(e.target.value)} />
            </Box>
            <Box id="pd-Box"
              sx={{
                width: 500,
                maxWidth: '100%',
              }}
            >
              <TextField fullWidth label="College Name" id="fullWidth" onChange={(e) => setCollege_name(e.target.value)} />
            </Box>
            <Box id="pd-Box"
              sx={{
                width: 500,
                maxWidth: '100%',
              }}
            >
              <TextField fullWidth label="Roll Number" id="fullWidth" onChange={(e) => setRoll_number(e.target.value)}/>
            </Box>
            <Box id="pd-Box"
              sx={{
                width: 500,
                maxWidth: '100%',
              }}
            >
              <TextField fullWidth label="Social Profile Link" id="fullWidth" onChange={(e) => setSocial_profile(e.target.value)} />
            </Box>

            <Button variant='contained' onClick={uploadUserData}>Submit</Button>
          </div>
        </div>
      </div>

    </>
  )
}

export default PersonalDetail