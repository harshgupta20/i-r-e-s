import React, { useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import EmailIcon from '@mui/icons-material/Email';
import Typography from '@mui/material/Typography';

// Image Of Contact Page
import Contact_page_img from "../../img/contact-page-pic.svg";

//EMAIL.JS
import emailjs from '@emailjs/browser';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                IRES
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// const theme = createTheme();

export default function ContactPage() {
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     console.log({
    //         email: data.get('email'),
    //         password: data.get('password'),
    //     });
    // };


    // Send Contact info on email
    const [userEmail, setUserEmail] = useState("");
    const [userMessage, setUserMessage] = useState("");
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_3gdfovd', 'template_44uj3jw', form.current, 'sMGePx0QrjPDPs-Xs')
            .then((result) => {
                console.log(result.text);
                alert("Check your email");
            }, (error) => {
                console.log(error.text);
                alert("An error occured!!!, If this is happening offen then contact admin");
            });

        setUserEmail("");
        setUserMessage("");
    };

    return (
        // <ThemeProvider theme={theme}>
        <form ref={form} onSubmit={sendEmail} >

            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${Contact_page_img})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        // backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width:'90%'
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <EmailIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Contact Us
                        </Typography>
                        <Box noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                autoComplete="email"
                                autoFocus
                                onChange={(e) => setUserEmail(e.target.value)} value={userEmail} name="user_email"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Your Message"
                                type="text"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => setUserMessage(e.target.value)} value={userMessage} name="user_message"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Send
                            </Button>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </form>
        // </ThemeProvider>
    );
}