import React, { useState } from 'react'
import "../styles/VerifyDoc.css";
import { Button, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

// Hashing ALgo
import { sha256 } from "crypto-hash";







const VerifyDoc = () => {

  const secondary =true;


  // -------------------APPLYING HASHING ALGORITHM ON DOCUMENTS------------------
  let hashValue = [];
  let [output, setOutput] = useState('');
  // For handling file input
  const handleFileInput = (e) => {
    console.log("dj");
    // Initializing the file reader
    const fr = new FileReader();
    // Listening to when the file has been read.
    fr.onload = async () => {
      let result = '';
      // Hashing the content based on the active algorithm
      result = await sha256(fr.result);
      // Setting the hashed text as the output
      setOutput(result);
      hashValue.push(result);
      console.log(result);
    }
    // Reading the file.
    fr.readAsText(e.target.files[0]);
  }


  return (
    <>
      <div id="vd-main">
        <div id="vd-body">
          <div style={{ margin: "20px" }} id="vd-title">

            <Typography style={{ fontWeight: "bold", fontSize: "40px" }}>Welcome to the Platfrom</Typography>
            <Typography>Upload the file to check the authenticity.</Typography>
          </div>

          <div id="vd-content">
            <div id="vd-c-upload">
              <input onChange={(e) => {handleFileInput(e)}} style={{ width: "100%", height: "200px", margin: "20px", backgroundColor: "#757ce8" }} type="file" name="" id="" />
              <Button fullWidth variant='contained'>Submit</Button>
            </div>
            <div id="vd-c-icon">
              pass
            </div>
            <div id="vd-c-info">
              <div id="vd-info-body">
                <Typography style={{ fontWeight: "bold", fontSize: "20px", margin: "20px" }} >Results for Upload File</Typography>

                <div id="vd-c-info-table">
                  <Box style={{}} fullWidth>
                    <Grid style={{}}>
                      <List>

                        <ListItem
                          secondaryAction={
                            <>
                              text
                            </>
                          }
                        >
                          <ListItemText
                            primary="Single-line item"
                            secondary={secondary ? 'Secondary text' : null}
                          />
                        </ListItem>
                        <ListItem
                          secondaryAction={
                            <>
                              text
                            </>
                          }
                        >
                          <ListItemText
                            primary="Single-line item"
                            secondary={!secondary ? 'Secondary text' : null}
                          />
                        </ListItem>

                      </List>
                    </Grid>
                  </Box>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default VerifyDoc