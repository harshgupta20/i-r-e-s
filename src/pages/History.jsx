import { Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GppBadIcon from '@mui/icons-material/GppBad';

import "../styles/History.css";

// Firebase
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/Firebase';

import { auth } from '../config/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { pink, red } from '@mui/material/colors';


const History = () => {

  const [docList, setDocList] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const gettingData = async () => {
      const userDocListRef = await getDocs(collection(db, `user_docs/${user.email}/doc_history`));
      // console.log(userDocListRef.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setDocList(userDocListRef.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // console.log(docList);
    }

    gettingData();
  }, [])


  return (
    <>
      {docList ? <div id="h-main">
        <div id="h-body">
          <Typography fontSize={20} style={{marginBottom:"20px"}}>All the documents submmited and Information about documents will be shown here.</Typography>
          <div id="h-content">
            {
              docList.map((data) => {
                return <Card id="h-c-card" sx={{ maxWidth: 445 }}>
                  <CardMedia
                    sx={{ height: 200 }}
                    image="/assets/img/pdf.svg"
                    title={data.verified_status}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {data.verified_status == "true" ? <Typography fontSize={25}>Verified <VerifiedUserIcon color='success'/></Typography> : <Typography fontSize={25}>Not Verified <GppBadIcon sx={{ color: red[500] }}/></Typography>}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data.comment}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button style={{cursor:'default'}} size="small">{data.published_date}</Button>
                    <a style={{textDecoration:'none'}} href={data.doc_link} target="_blank" rel="noopener noreferrer"><Button variant='contained' style={{cursor:'default'}} size="small">Download File</Button></a>
                  </CardActions>
                </Card>
              })
            }
          </div>
        </div>
      </div>
        : <h1>No Data to Display</h1>
      }

    </>
  )
}

export default History