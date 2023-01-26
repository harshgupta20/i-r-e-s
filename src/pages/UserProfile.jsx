import React from 'react'
import "../styles/UserProfile.css";

import { auth } from '../config/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';



import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';




function createData(name, calories) {
    return { name, calories };
}

const rows = [
    createData('Email', 159),
    createData('Age', 237),
    createData('Verified Status', 262),
    createData('College Name', 305),
    createData('LinkedIn Profile', 356),
];



const UserProfile = () => {

    const [user] = useAuthState(auth);

    return (
        <>

            <div id="up-main">
                <div id="up-body">
                    <img src="bjb" alt="kjn" />
                    <i>Harsh Gupta</i>
                    <div id="up-child">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        {/* <TableCell>Dessert (100g serving)</TableCell>
                                        <TableCell align="right">Calories</TableCell> */}
                                        {/* <TableCell align="right">Fat&nbsp;(g)</TableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.calories}</TableCell>
                                            {/* <TableCell align="right">{row.fat}</TableCell> */}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>

                    <Link to='/my-account/personal-detail'>
                        <Button style={{margin:'20px'}} variant="contained">Update Info</Button>
                    </Link>
                </div>
            </div>

        </>
    )
}

export default UserProfile