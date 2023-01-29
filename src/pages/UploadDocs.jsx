import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import "../styles/PersonalDetail.css";

// Firebase
import { ref, uploadBytes } from 'firebase/storage';
import { getStorage, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from '../config/Firebase';
import { collection, addDoc, getDoc, doc, setDoc } from "firebase/firestore";

//REACT-FIREBASE_HOOKS
import { useAuthState } from 'react-firebase-hooks/auth';


// Hashing ALgo
import { sha256 } from "crypto-hash";



const UploadDocs = () => {

  let [output, setOutput] = useState('');
  let [comment, setComment] = useState();
  let hashValue = [];
  const [user] = useAuthState(auth);


  // -------------------APPLYING HASHING ALGORITHM ON DOCUMENTS------------------
  // For handling file input
  const handleFileInput = (e) => {
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
    }
    // Reading the file.
    fr.readAsText(e.target.files[0]);
  }

  // --------------------FETCH LINK FROM FIREBASE---------------------
  // const [imageURL, setImageURL] = useState();
  var imageURL = "";
  const [imagePath, setImagePath] = useState(null);

  const uploadMyFile = async () => {

    //Condition Check for empty fields
    if (comment && imagePath) {
      const uploadRef = ref(storage, `images/${output}`);
      await uploadBytes(uploadRef, imagePath).then(() => {
        console.log(output);
        alert("Uploaded Success !");
      })
      // Download Link
      await getDownloadURL(uploadRef)
        .then((url) => {
          // `url` is the download URL for 'images/stars.jpg'
          // setImageURL(url);
          imageURL = url;
          console.log("Image URL");
          console.log(imageURL);
        })
        .catch((error) => {
          // Handle any errors
          alert("Network error occured, If this persist, Contact Admin");
        });


      // ------------------------UPLOADING DATA DOC DATA ON FIREBASE FIRESTORE------------------

      // Get Present Date
      var date = new Date();
      var current_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

      // Get Social Link of current user from Firestore
      const docSnap = await getDoc(doc(db, "users", user.uid));
      var userData = docSnap.data();
      console.log("User Data od Social Link");
      console.log(userData);


      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "all_docs"), {
        name: user.displayName,
        email: user.email,
        social_link: userData.social_profile,
        doc_hash: output,
        doc_link: imageURL,
        comment: comment,
        verified_status: "false",
        published_date: current_date,
      });

      await setDoc(doc(db, "user_docs", user.email), {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
      })
      const newCollectionRef = collection(db, 'user_docs', user.email, 'doc_history')
      await addDoc(newCollectionRef, {
        doc_link: imageURL,
        doc_hash: output,
        published_date: current_date,
        verified_status: "false",
        comment: comment
      })
    }
    else {
      alert("Fields can't be empty !");
    }
  }

  return (
    <>
      <div id="pd-main">
        <div id="pd-body">
          <Typography>Upload Your Documents Here</Typography>
          <div id="pd-form">

            <Box id="pd-Box"
              sx={{
                width: 500,
                maxWidth: '100%',
              }}
            >
              <input type="file" label="file-input" id="fullWidth" onChange={(e) => { handleFileInput(e); setImagePath(e.target.files[0]) }} />
            </Box>
            <Box id="pd-Box"
              sx={{
                width: 500,
                maxWidth: '100%',
              }}
            >
              <TextField fullWidth label="Commets" id="fullWidth" onChange={(e) => (setComment(e.target.value))} />
            </Box>



            <Button onClick={uploadMyFile} variant='contained' >Submit</Button>
          </div>
        </div>
      </div>

    </>
  )
}

export default UploadDocs;