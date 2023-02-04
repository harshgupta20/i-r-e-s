import "../styles/MyAccount.css";

import UserProfile from './UserProfile';
import UploadDocs from './UploadDocs';
import History from './History';
import PersonalDetail from "./PersonalDetail";
import AuthorizeDoc from "./AuthorizeDoc";

import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Contact from "./common/Contact";
import HelpCenter from "./HelpCenter";


import { auth, db } from '../config/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from "firebase/firestore";


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 5 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}


const MyAccount = () => {

    const [user] = useAuthState(auth);

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // const [tempData, setTempData] = useState("");
    // const testingData = async () => {
    //     const docRef = doc(db, "users", user.uid);
    //     const docSnap = await getDoc(docRef);
    //     if(!docSnap.data()){
    //         alert("Data is Unavailable, Kindly seek help from 'HELP CENTER' ");
    //     }else{
    //         userData = docSnap.data();
    //         // console.log(docSnap.data());
    //         setTempData(userData);
    //     }  
    // }





    // ----------------------------------------------------------------
    var [userDataVar, setUserDataVar] = useState();
    const [userRegistered, setUserRegistered] = useState(false);
    const [userAuthStatus, setUserAuthStatus] = useState(false);
    // Function to Fetch Logged-In user Data
    const gettingUserData = async () => {
        const userData = await getDoc(doc(db, "users", user.uid));
        setUserDataVar(userData.data());
        // Checking the user has registered or not and Verifying the Status of "Authorizer"
        if (userData.data()) {
            setUserRegistered(true);
            if (userData.data().verified_status == "authorizer") {
                setUserAuthStatus(true);
            }
        }
    }

    useEffect(() => {
        gettingUserData();
        // userDataScanning();
    }, []);


    // -------------------------------------------------------------------------------

    return (
        <>
            <div id='ma-main'>
                <Typography fontSize={30} textAlign='center'>Welcome {user?.displayName} &#128522;
                </Typography>

                <Box style={{ margin: '20px' }}
                    sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 624 }}
                >
                    <Tabs style={{ margin: '20px' }}
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        <Tab style={{ padding: '30px' }} label="Profile" />
                        {(userRegistered && !userAuthStatus )  ? <Tab style={{ padding: '30px' }} label="Upload Documents" /> : ""}
                        {(userRegistered && !userAuthStatus )  ? <Tab style={{ padding: '30px' }} label="History" /> : ""}
                        {(userRegistered && userAuthStatus) && <Tab style={{ padding: '30px' }} label="Authorize Documents" />}
                        {/* <Tab style={{ padding: '30px' }} label="Authorize Documents" /> */}
                        <Tab style={{ padding: '30px' }} label="Contact" />
                        <Tab style={{ padding: '30px' }} label="Personal Information" />
                        <Tab style={{ padding: '30px' }} label="Help Center" />
                        {/* <Tab label="Item Seven" {...a11yProps(6)} /> */}
                    </Tabs>
                    {/* Profile Tab */}
                    <TabPanel style={{ width: '100%' }} value={value} index={0}>
                        <UserProfile />
                    </TabPanel>
                    {/* Contact Tab */}
                    <TabPanel style={{ width: '100%' }} value={value} index={!userRegistered ? 1 : userAuthStatus ? 2 : 3}>
                        <Contact />
                    </TabPanel>
                    {/* Personal Details Tab */}
                    <TabPanel style={{ width: '100%' }} value={value} index={!userRegistered ? 2 : userAuthStatus ? 3 : 4}>
                        <PersonalDetail />
                    </TabPanel>
                    {/* Help Center Tab */}
                    <TabPanel style={{ width: '100%' }} value={value} index={!userRegistered ? 3 : userAuthStatus ? 4 : 5}>
                        <HelpCenter />
                    </TabPanel>

                    {/* Check if user is registered or not */}
                    {(userRegistered && !userAuthStatus )  ? <TabPanel style={{ width: '100%' }} value={value} index={1}>
                        <UploadDocs />
                    </TabPanel> : ""}
                    {(userRegistered && !userAuthStatus ) ? <TabPanel style={{ width: '100%' }} value={value} index={2}>
                        <History />
                    </TabPanel> : ""}

                    {(userRegistered && userAuthStatus) ? <TabPanel style={{ width: '100%' }} value={value} index={(userRegistered && userAuthStatus) && 1}>
                        <AuthorizeDoc />
                    </TabPanel> : "" }
                </Box>


            </div>
        </>
    )
}




export default MyAccount