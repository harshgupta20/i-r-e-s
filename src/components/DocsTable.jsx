import { Button, Collapse, IconButton, TableCell, TableRow, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


import { db, auth } from '../config/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";




const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const DocsTable = (props) => {
    const { docData } = props
    const [open, setOpen] = React.useState(false);


    // Confirm PopUP
    const [openPopUp, setOpenPopUp] = React.useState(false);
    const handleClickOpenPopUp = () => {
        setOpenPopUp(true);
    };
    const handleClosePopUp = () => {
        setOpenPopUp(false);
    };


    // Getting all data from firebase
    const [user] = useAuthState(auth);
    const [userDocHistoryDocId, setUserDocHistoryDocId] = useState();
    //Getting the id from the "user_docs/email/doc_history/id" by using matching the doc hash----------------------------
    const q = query(collection(db, 'user_docs', docData.email, 'doc_history'), where("doc_hash", "==", docData.doc_hash));
    const fetchUserDocDeepData = async () => {
        const querySnapshot = await getDocs(q);
        setUserDocHistoryDocId(querySnapshot.docs.map((doc)=> ({...doc.data(), id: doc.id})));
    }
    // console.log(docData.doc_hash);
    // console.log(userDocHistoryDocId);
    //-------------------------------------------------------------------------------------------------------------------
    
    const updateDocData = async () => {
        const userDocsRef = doc(db, 'user_docs', docData.email, 'doc_history', userDocHistoryDocId[0].id)
        const allDocsRef = doc(db, "all_docs", docData.id);
        // console.log("inside Function");
    if(docData.verified_status=="false"){
        await updateDoc(allDocsRef, {
            verified_status: "true",
            verified_by: user.email
        });
        await updateDoc(userDocsRef, {
            verified_status: "true",
            verified_by: user.email
        })
    }else{
        await updateDoc(allDocsRef, {
            verified_status: "false",
            verified_by: user.email
        });
        await updateDoc(userDocsRef, {
            verified_status: "false",
            verified_by: user.email
        })
    }
        // console.log("executed");
        handleClosePopUp();
    }



    useEffect(()=>{
        fetchUserDocDeepData();
    },[])

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {docData.email}
                </TableCell>
                <TableCell align="right">{docData.name}</TableCell>
                <TableCell align="right">{docData.published_date}</TableCell>
                <TableCell align="right"><a href={docData.doc_link} target="_blank">Link</a></TableCell>
                <TableCell align="right">{docData.verified_status == "false" ? <Button variant='contained' color='error'>Un-Verified</Button> : <Button variant='contained' color='success'>Verified</Button>}</TableCell>
            </TableRow>
            <TableRow>
                {/* Collapse */}
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Comment for the Document by User
                            </Typography>
                            <Typography>{docData.comment}</Typography>
                            {docData.verified_status == "true" ? <Button onClick={handleClickOpenPopUp} variant='contained' color='primary' >Un-Verification Complete</Button> : <Button onClick={handleClickOpenPopUp} variant='contained' color='primary'  >Verification Complete</Button>}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>

            <Dialog
                open={openPopUp}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClosePopUp}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Are you sure you want to perform this action?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Your action and data will get over-write on existing data!!!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePopUp}>Cancel</Button>
                    <Button onClick={updateDocData}>Yes</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default DocsTable