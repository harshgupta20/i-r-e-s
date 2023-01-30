import "../styles/MyAccount.css";

import UserProfile from './UserProfile';
import UploadDocs from './UploadDocs';
import History from './History';
import PersonalDetail from "./PersonalDetail";

import React, { useEffect } from "react"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Contact from "./common/Contact";
import HelpCenter from "./HelpCenter";


import { auth, db } from '../config/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc} from "firebase/firestore";


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


    // ----------------------------------------------------------------
    var userDataVar = {};
    const gettingUserData = async () => {
        const userData = await getDoc(doc(db, "users", user.uid));
        userDataVar = userData.data();
        console.log(userDataVar);
    }

    useEffect(()=> {
        gettingUserData();
    },[])
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
                        <Tab style={{ padding: '30px' }} label="Profile" {...a11yProps(0)} />
                        <Tab style={{ padding: '30px' }} label="Upload Documents" {...a11yProps(1)} />
                        <Tab style={{ padding: '30px' }} label="History" {...a11yProps(2)} />
                        <Tab style={{ padding: '30px' }} label="Contact" {...a11yProps(3)} />
                        <Tab style={{ padding: '30px' }} label="Personal Information" {...a11yProps(4)} />
                        <Tab style={{ padding: '30px' }} label="Help Center" {...a11yProps(5)} />
                        {/* <Tab label="Item Seven" {...a11yProps(6)} /> */}
                    </Tabs>
                    <TabPanel style={{ width: '100%' }} value={value} index={0}>
                        <UserProfile />
                    </TabPanel>
                    <TabPanel style={{ width: '100%' }} value={value} index={1}>
                        <UploadDocs />
                    </TabPanel>
                    <TabPanel style={{ width: '100%' }} value={value} index={2}>
                        <History />
                    </TabPanel>
                    <TabPanel style={{ width: '100%' }} value={value} index={3}>
                        <Contact />
                    </TabPanel>
                    <TabPanel style={{ width: '100%' }} value={value} index={4}>
                        <PersonalDetail />
                    </TabPanel>
                    <TabPanel style={{ width: '100%' }} value={value} index={5}>
                        <HelpCenter />
                    </TabPanel>
                </Box>


            </div>
        </>
    )
}




export default MyAccount