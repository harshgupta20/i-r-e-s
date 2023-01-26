import "../styles/MyAccount.css";

import { auth } from '../config/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import UserProfile from './UserProfile';
import UploadDocs from './UploadDocs';
import History from './History';
import PersonalDetail from "./PersonalDetail";

import React from "react"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Contact from "./common/Contact";



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


    return (
        <>
            <div id='ma-main'>
                <h1>Welcome {user?.displayName}</h1>

                <Box style={{ margin:'20px'}}
                    sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 524 }}
                >
                    <Tabs style={{ margin:'20px'}}
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        <Tab style={{ padding:'30px'}} label="Profile" {...a11yProps(0)} />
                        <Tab style={{ padding:'30px'}} label="Upload Documents" {...a11yProps(1)} />
                        <Tab style={{ padding:'30px'}} label="History" {...a11yProps(2)} />
                        <Tab style={{ padding:'30px'}} label="Contact" {...a11yProps(3)} />
                        <Tab style={{ padding:'30px'}} label="Personal Information" {...a11yProps(4)} />
                        {/* <Tab label="Item Six" {...a11yProps(5)} />
                        <Tab label="Item Seven" {...a11yProps(6)} /> */}
                    </Tabs>
                    <TabPanel style={{border:'2px solid red', width:'100%'}} value={value} index={0}>
                        <UserProfile />
                    </TabPanel>
                    <TabPanel style={{border:'2px solid red', width:'100%'}} value={value} index={1}>
                        <UploadDocs />
                    </TabPanel>
                    <TabPanel style={{border:'2px solid red', width:'100%'}} value={value} index={2}>
                        <History />
                    </TabPanel>
                    <TabPanel style={{border:'2px solid red', width:'100%'}} value={value} index={3}>
                        <Contact/>
                    </TabPanel>
                    <TabPanel style={{border:'2px solid red', width:'100%'}} value={value} index={4}>
                        <PersonalDetail/>
                    </TabPanel>
                </Box>


            </div>
        </>
    )
}




export default MyAccount