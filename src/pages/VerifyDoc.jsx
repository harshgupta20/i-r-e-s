import React, { useState } from 'react'
import "../styles/VerifyDoc.css";
import { Alert, AlertTitle, Button, Typography } from '@mui/material'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

// Hashing ALgo
import { sha256 } from "crypto-hash";

// FIREBASE
import { collection, query, where, getDocs, } from "firebase/firestore";
import { db } from "../config/Firebase";




const VerifyDoc = () => {

  const secondary = true;


  // -------------------APPLYING HASHING ALGORITHM ON DOCUMENTS------------------
  let [output, setOutput] = useState('');
  // For handling file input
  const handleFileInput = (e) => {
    // console.log("dj");
    // Initializing the file reader
    const fr = new FileReader();
    // Listening to when the file has been read.
    fr.onload = async () => {
      let result = '';
      // Hashing the content based on the active algorithm
      result = await sha256(fr.result);
      // Setting the hashed text as the output
      // console.log("result:");
      // console.log(result);
      // hashValue.push(result);

      setOutput(result); //2
      // console.log("output:");
    }
    // Reading the file.
    fr.readAsText(e.target.files[0]);
  }



  // CHECKING THE DOC IN FIRESTORE 
  const [doc_data, setDoc_data] = useState([]);
  const checkDocInFirebase = async () => {
    console.log("checkDocInFirebase");
    if (output === "") {
      alert("File input is empty");
    } else {
      const q = query(collection(db, "all_docs"), where("doc_hash", "==", output));
      const querySnapshot = await getDocs(q);
      // Mapping Data to collect object from firebase into useState variable of react
      if (querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) == "") {
        setDoc_data(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        alert("Data not found!!!");
      } else {
        setDoc_data(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    }
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
              <input onChange={(e) => { handleFileInput(e) }} style={{ width: "100%", height: "200px", margin: "20px", backgroundColor: "#757ce8" }} type="file" name="" id="" />
              <Button style={{ width: "100%" }} onClick={checkDocInFirebase} variant='contained'>Submit</Button>
            </div>
            <div id="vd-c-icon">
              {/* Middle Image for result visual appearance */}
              {doc_data == "" ? <img src="./assets/img/scanPrint.gif" style={{ width: "100px" }} alt="scanPrintImg" /> : <>{doc_data[0].verified_status == "true" ? <img src="./assets/img/signOfVerified.gif" style={{ width: "100px" }} alt="signOfVerify" /> : <img src="./assets/img/signOfUnVerified.gif" style={{ width: "100px" }} alt="signOfUnVerified" />}</>}
            </div>
            <div id="vd-c-info">
              <div id="vd-info-body">
                <Typography style={{ fontWeight: "bold", fontSize: "20px", margin: "20px" }} >Results for Upload File</Typography>

                <div id="vd-c-info-table">
                  <Box style={{}} >
                    <Grid style={{}}>
                      {doc_data == "" ? "" : <List>
                        {/* // MAPPING THE FIELDS WHICH IS HARDCCODED AT THE FUNCTION START */}
                        <ListItem
                          secondaryAction={<><Typography>{doc_data[0].verified_status}</Typography></>}>
                          {/* MAPPING THE DATA GOT FROM FIRESTORE */}
                          <ListItemText
                            primary="Verified Status"
                            secondary={secondary ? 'Secondary text' : null}
                          />
                        </ListItem>
                        <ListItem
                          secondaryAction={<><Typography>{doc_data[0].name}</Typography></>}>
                          {/* MAPPING THE DATA GOT FROM FIRESTORE */}
                          <ListItemText
                            primary="Uploader Name"
                            secondary={secondary ? 'Secondary text' : null}
                          />
                        </ListItem>
                        <ListItem
                          secondaryAction={<><Typography>{doc_data[0].email}</Typography></>}>
                          {/* MAPPING THE DATA GOT FROM FIRESTORE */}
                          <ListItemText
                            primary="Uploader Email"
                            secondary={secondary ? 'Secondary text' : null}
                          />
                        </ListItem>
                        <ListItem
                          secondaryAction={<><Typography>{doc_data[0].published_date}</Typography></>}>
                          {/* MAPPING THE DATA GOT FROM FIRESTORE */}
                          <ListItemText
                            primary="Upload Date"
                            secondary={secondary ? 'YYYY-MM-DD' : null}
                          />
                        </ListItem>
                      </List>}
                      {/* <List>
                        <ListItem
                          secondaryAction={<><Typography> Status</Typography></>}>
                          <ListItemText
                            primary="Verified Status"
                            secondary={secondary ? 'Secondary text' : null}
                          />
                        </ListItem>
                        <ListItem
                          secondaryAction={<><Typography>Uploader Name</Typography></>}>
                          <ListItemText
                            primary="Uploader Name"
                            secondary={secondary ? 'Secondary text' : null}
                          />
                        </ListItem>
                        <ListItem
                          secondaryAction={<><Typography>Verified Status</Typography></>}>
                          <ListItemText
                            primary="Uploader Email"
                            secondary={secondary ? 'Secondary text' : null}
                          />
                        </ListItem>
                        <ListItem
                          secondaryAction={<><Typography>Upload Date</Typography></>}>
                          <ListItemText
                            primary="Upload Date"
                            secondary={secondary ? 'Secondary text' : null}
                          />
                        </ListItem>
                      </List> */}
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