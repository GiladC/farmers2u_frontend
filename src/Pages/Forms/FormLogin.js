import { Button, Box, ThemeProvider, createTheme, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import jwt_decode from "jwt-decode"
import './Forms.css';


const {palette} = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const themeForButton = createTheme({
  palette: {
    nice: createColor('#37474f'),
    button: createColor('#E8AA42'),
  },
});

const FormLogin = (props) => {
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [buttonText, setButtonText] = useState('התחבר עם Google');
  const [showPopup, setShowPopup] = useState(false);
  const modalTextStyle = {
    fontSize: 'larger', 
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "5%",
  };
  

  const navigate = useNavigate();

  const handleCallbackResponse = (response) => {
    const userObject = jwt_decode(response.credential);
    setUser(userObject);

    setButtonText(`התחבר עם Google (${userObject.given_name} ${userObject.name})`);


    console.log(userObject.email);
    axios({
      method: 'POST',
      url: 'https://farmers-please-77d4b71f9957.herokuapp.com/logintoken',
      data: {
        email: userObject.email
      }
    })
      .then(function (response) {
        console.log(response);
        props.setToken(response.data.access_token);
        localStorage.setItem('email', userObject.email);
        localStorage.setItem('farmName', response.data.userName);
        localStorage.setItem('profilePicture', response.data.profilePicture)
        console.log(response.data);
        setShowPopup(true); 
        setTimeout(() => {
        navigate('/bullboard');
        window.location.reload();
        }, 3000); 
      })
      .catch(function (error) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response && error.response.status === 401) {
          setErrorMessage('משתמש לא רשום');
        }
      });

  };

  const initializeGoogleSignIn = () => {
    if (typeof window.google !== 'undefined' && typeof window.google.accounts !== 'undefined') {
      window.google.accounts.id.initialize({
        client_id: '814952910063-shd06kmdd43a83r3etfpq73gqi0ddf5m.apps.googleusercontent.com',
        callback: handleCallbackResponse
      });
  
      window.google.accounts.id.renderButton(document.getElementById('signInDiv'), {
        theme: 'outline',
        size: 'large'
      });
    } else {
      // Google's library is not loaded yet, let's try again in a moment
      setTimeout(initializeGoogleSignIn, 5);
    }
  };
  
  useEffect(() => {
    initializeGoogleSignIn();
  }, [buttonText]); // Watch buttonText changes
  

  return (
    <ThemeProvider theme={themeForButton}>
    <div dir="rtl">
    {/*<button onClick={ (e) => handleSignOut(e)}>Sign Out</button>  GOOGLE SIGNOUT BUTTON, incomplete. needs to adapt to regular signout  */ }
    { user &&
    <div>
      {/*<img src={user.picture}></img> !!!----OPTIONAL - farmers image shown in login----!!!
      <h3>{user.name}</h3> */}
      </div>
    }
        <form autoComplete="off" /*onSubmit={handleSubmit}*/>
        <Box marginTop={6.1}>
      <Box
        margin="auto"
        marginBottom={11}
        marginTop={5}
        bgcolor="#f7f1e5"
        boxShadow={0}
        borderRadius={2}
        border={2}
        display="flex"
        flexDirection="column"
        width={580}
        height={200}
        alignItems="center"
        justifyContent="center"
        mt={4}
        padding={20}
        sx={{ border: '1.5px solid #f7f1e5' }}
      >
        <Typography
          color="#37474f"
          fontFamily="aleph"
          fontWeight="bold"
          fontSize={50}
          marginBottom="0px"
          variant="h3"
          textAlign="center"
        >
          התחברות חקלאי
        </Typography>
        <Box marginTop={5}>
          <form> 
            <Box>
            <div id="signInDiv" style={{marginRight:'0%', paddingTop: '25px'}}></div>
            </Box>
          </form>
          {errorMessage && (
            <Box
              mb={-2}
              fontSize={13}
              color="red"
              textAlign="center"
              sx={{
                fontFamily: 'aleph',
                marginRight: '-0.1rem' // Add a right margin to move the error message to the right
              }}
            >
              {errorMessage || "\u00A0"}
            </Box>
          )}
          <Box mt={1} marginRight={3}>
          <a href="/signup">
            <Button
              variant="text"
              size="medium"
              sx={{
                marginRight: '2rem',
                fontFamily: 'aleph',
                mt: 4,
                borderRadius: 4,
              }}
              color="nice"
            >
              מעבר להרשמה
            </Button>
          </a>
          </Box>
        </Box>
      </Box>
    </Box>
        {showPopup && (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000 // to ensure the modal is on top
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '40px',       // Increased padding for larger appearance
          borderRadius: '10px',
          fontSize: '40px',      // Increased font size
          width: '400px',
          height: "100px",        // Set a width
          textAlign: 'center',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          border: '3px solid #ffb74d'   // Added a subtle shadow for depth
        }}>
          <div style={modalTextStyle}>
            {'ברוך שובך!'.replace(' ', '\u00A0').split('').map((char, index) => (
              <span key={index} style={{animationDelay: `${index * 0.1}s` }} className={char === ' ' ? '' : "fade-in"}>
              {char}
              </span>
            ))}
          </div>
        </div>
      </div>
    )}

        </form>
    </div>
    </ThemeProvider>

  )
}

export default FormLogin
