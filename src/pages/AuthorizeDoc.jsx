import { TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import "../styles/AuthorizeDoc.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// FIREBASE
import {getDocs, collection} from "firebase/firestore"
import { db } from '../config/Firebase';

import DocsTable from '../components/DocsTable';


const AuthorizeDoc = () => {

    const [simpleSearch, setSimpleSearch] = useState("");
    
    const [allDocs, setAllDocs] = useState();
    const gettingDocsData = async () => {
        const docsRef = collection(db, "all_docs");
        const docsRefData = await getDocs(docsRef);
        setAllDocs(docsRefData.docs.map((doc)=> ({...doc.data(), id: doc.id})));
    }
    
    // console.log(allDocs)

useEffect(()=> {
    gettingDocsData();
},[]);


    return (
        <>
            <div id="authD-main">
                <div id="authD-body">
                    <Typography id="authD-typo">Verify Documents Here !!!</Typography>
                    <TextField onChange={(e) => setSimpleSearch(e.target.value)} fullWidth id="outlined-search" label="Search with keyword ex: name@email.com" type="search" />
                </div>

                <div id="authD-content">
                    <TableContainer style={{marginTop:"30px"}} component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>User Email Id</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Published Date</TableCell>
                                    <TableCell align="right">Document Link</TableCell>
                                    <TableCell align="right">Verified Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* Mapping Table of Documents with adding searching functionality */}
                                {allDocs ? allDocs.filter(doc=>doc.email.toLowerCase().includes(simpleSearch)).map((doc) => (
                                    <DocsTable key={doc.id} docData={doc} />
                                )) : ""}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>
    )
}

export default AuthorizeDoc;