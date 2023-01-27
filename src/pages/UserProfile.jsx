import React, { useState } from 'react'
import "../styles/UserProfile.css";


// Firebase and Firebase Hooks
import { auth, db } from '../config/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from "firebase/firestore";


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';


const UserProfile = () => {

    const [user] = useAuthState(auth);

    var userData = null;
    const [tempData, setTempData] = useState("");

    const testingData = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if(!docSnap.data()){
            alert("Data is Unavailable, Kindly seek help from 'HELP CENTER' ");
        }else{
            userData = docSnap.data();
            // console.log(docSnap.data());
            setTempData(userData);
        }
        
    }


    return (
        <>

            <div id="up-main">
                <div id="up-body">
                    <img src={user?.photoURL} alt={user?.displayName + `Profile Pic`} />
                    <i>{user?.displayName}</i>
                    <div id="up-child">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableBody>
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                Email
                                            </TableCell>
                                            <TableCell align="right">{tempData.email}</TableCell>
                                        </TableRow>

                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                Age
                                            </TableCell>
                                            <TableCell align="right">{tempData.age}</TableCell>
                                        </TableRow>

                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                Verified Status
                                            </TableCell>
                                            <TableCell align="right">{tempData.verified_status}</TableCell>
                                        </TableRow>

                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                College Name: 
                                            </TableCell>
                                            <TableCell align="right">{tempData.college_name}</TableCell>
                                        </TableRow>

                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                Social Profile
                                            </TableCell>
                                            <TableCell align="right">{tempData.social_profile}</TableCell>
                                        </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>

                    <Link to='/my-account/personal-detail'>
                        <Button onClick={testingData} style={{ margin: '20px' }} variant="contained">Load Info</Button>
                    </Link>
                        <Typography>If your data is not visible, then Click on "Load Info".</Typography>
                </div>
            </div>

        </>
    )
}

export default UserProfile