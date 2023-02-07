import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar'; 
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { Login } from '@mui/icons-material';

import "../styles/Navbar.css";

// React Router Dom
import { Link, useNavigate } from 'react-router-dom';

// Firebase
import {auth, provider, db} from "../config/Firebase";
import { signInWithPopup, signOut } from 'firebase/auth';
import {collection} from "firebase/firestore";

// react firebase hooks
import {useAuthState} from "react-firebase-hooks/auth";

// MUI Dialog CSS
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';


// Components


export default function Navbar() {

  // Navigation Bar menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Enter the Platfrom Popup for Terms and Consitions
  const [loginDialog_open, setLoginDialog_Open] = React.useState(false);
  const loginDialog_handleClickOpen = () => {
    setLoginDialog_Open(true);
  };
  const LoginDialog_handleClose = () => {
    setLoginDialog_Open(false);
  };

  // Logout popup confirmation
  const [logoutDialog_open, setLogoutDialog_Open] = React.useState(false);
  const logoutDialog_handleClickOpen = () => {
    setLogoutDialog_Open(true);
  };
  const LogoutDialog_handleClose = () => {
    setLogoutDialog_Open(false);
  };



  // Google SignIn Auth Popup
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const userRef = collection(db, 'users');
  const signInPopup = async () => {
      const result = await signInWithPopup(auth, provider);

      console.log(result);
      LoginDialog_handleClose();
      navigate('/');
  }

  // Google Signout Popup
  const signOutUser = async () => {
    await signOut(auth).then(() => {
      LogoutDialog_handleClose();
      console.log("user logged out !!!");
      navigate('/');
    }).catch((error) => {
      alert("An error occured, If this is happeing consistantly, then contact admin");
    });
  }


  return (
    <React.Fragment>
      <Box id="my-navbar-main" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px' }}>
        <Link  style={{textDecoration:'none', color:'black'}}  to="/"><Typography fontSize={40}>IRES</Typography></Link>
        <Box variant="contained" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',}}>

    <Link style={{textDecoration:'none', color:'black'}} to="/about">
          <Typography sx={{ minWidth: 100}}>About</Typography>
    </Link>
    <Link  style={{textDecoration:'none', color:'black'}}  to="contact">
          <Typography sx={{ minWidth: 100 }}>Contact</Typography>
    </Link>
    <Link  style={{textDecoration:'none', color:'black'}}  to="team">
          <Typography sx={{ minWidth: 100 }}>Team</Typography>
    </Link>
    <Link  style={{textDecoration:'none', color:'black'}}  to="project">
          <Typography sx={{ minWidth: 100 }}>Project</Typography>
    </Link>
    <Link  style={{textDecoration:'none', color:'black'}}  to="verify-docs">
          <Typography sx={{ minWidth: 100 }}>Verify Docs</Typography>
    </Link>
          <Typography sx={{ maxWidth: 100, color:'primary'}}>{user ? user?.displayName : "Not Signed"}</Typography>
          <Tooltip title="Account settings">
            <IconButton variant="contained"
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              {user ? <Avatar alt={user?.displayName} src={user?.photoURL} sx={{ width: 32, height: 32 }}></Avatar> : <Avatar  sx={{ width: 32, height: 32 }}></Avatar>}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {
          user && 
          <Link style={{textDecoration:'none', color:'black'}} to='my-account'>
          <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
          </Link>
        }
        {user &&
          <MenuItem onClick={(event) => { handleClose(event); logoutDialog_handleClickOpen(event);}}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
        }
        {!user && <MenuItem onClick={(event) => { handleClose(event); loginDialog_handleClickOpen(event); }}>
          <ListItemIcon>
            <Login fontSize="small" />
          </ListItemIcon>
          Enter the Platform
        </MenuItem>}
        
      </Menu>





      {/* LoginDialog */}
      <Dialog
        open={loginDialog_open}
        onClose={LoginDialog_handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"You agree to Terms & Conditions for using this platfrom?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={LoginDialog_handleClose}>Disagree</Button>
          <Button onClick={signInPopup} autoFocus>
            I Agree & Continue With Google
          </Button>
        </DialogActions>
      </Dialog>




      {/* LogOut Dialog */}
      <Dialog
        open={logoutDialog_open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to Logout ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You can log in back anytime...
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={LogoutDialog_handleClose}>No</Button>
          <Button onClick={signOutUser} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>



    </React.Fragment>







  );
}