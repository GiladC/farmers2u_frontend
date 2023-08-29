import React, { useState, useEffect } from 'react';
import {
  Button,
  Box,
  Typography
} from '@mui/material';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

function FormSignUpInfo({values, setFormValue, setIsFormSignUpInfoValid }) {
  const [buttonText, setButtonText] = useState('הירשם עם Google');
  const [errorMessage, setErrorMessage] = useState('');



  useEffect(() => {
    setIsFormSignUpInfoValid(values.is_valid_email);
}, [values.is_valid_email, setIsFormSignUpInfoValid]);




  useEffect(() => {
    const handleCallbackResponse = (response) => {
      const userObject = jwt_decode(response.credential);
  
  
      const data = new FormData();
      data.append("jsonData", JSON.stringify({
        email: userObject.email,
      }));
  
      axios.post("https://farmers-please-77d4b71f9957.herokuapp.com/signup", data, {
        withCredentials: true,
      })
        .then(function (response) {
          setErrorMessage("");
          setFormValue("email", userObject.email);
          setFormValue("google_name", userObject.given_name);
          setFormValue("google_family_name", userObject.name);
          setFormValue("google_profile_picture", userObject.picture);
          setButtonText(`הירשם עם Google (${userObject.given_name} ${userObject.name})`);
          setFormValue("is_valid_email", true);
        })
        .catch(function (error) {
          if (error.response && error.response.status === 409) {
            setErrorMessage("משתמש זה כבר רשום במערכת");
            setFormValue("email", userObject.email);
            setFormValue("google_name", userObject.given_name);
            setFormValue("google_family_name", userObject.name);
            setFormValue("google_profile_picture", userObject.picture);
            setFormValue("is_valid_email", false);
          }
        });
    };

    const initializeGoogleSignUp = () => {
      if (typeof window.google !== 'undefined' && typeof window.google.accounts !== 'undefined') {
        window.google.accounts.id.initialize({
          client_id: '814952910063-shd06kmdd43a83r3etfpq73gqi0ddf5m.apps.googleusercontent.com',
          callback: handleCallbackResponse
        });

        window.google.accounts.id.renderButton(document.getElementById('signUpDiv'), {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          text: buttonText 
        });
      } else {
        setTimeout(initializeGoogleSignUp, 100);
      }
    };

    initializeGoogleSignUp();
  }, [buttonText, setErrorMessage, setFormValue]); 
  
  return (

        <form autoComplete="off">
          
          <Box marginTop={5} bgcolor="#f7f1e5" boxShadow={0} borderRadius={2} border={2} display="flex" flexDirection={"column"} width={580} height={164.7} alignItems={"center"} justifyContent={"center"} mt={3.2} mr={2.3} padding={20} sx={{border: '1.5px solid #f7f1e5'}}  >
              <Box style={{marginTop: "-19.1%"}}>
              <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} fontSize={50} marginTop="-5.5rem" variant='h3' textAlign={"center"}> הרשמת חקלאי </Typography>
              <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} mt={2} fontSize={22}  mr={-1} marginBottom={8} marginTop={3} variant='h2'  textAlign={"center"}> שלב 1 - חשבון גוגל</Typography>
              </Box>
            <Box container style={{paddingRight: '30px', paddingLeft: '10px'}}>
            <form>
                <Box sx={{marginLeft:"5%"}}>
                  <div
                    id="signUpDiv"
                    style={{ marginRight: '27%', paddingTop: '25px' }}
                  ></div>
                  {errorMessage && (
                  <Typography
                    mb={-2.4}
                    fontSize={13}
                    color="red"
                    textAlign="center"
                    sx={{
                      fontFamily: 'aleph',
                      marginRight: '-1.2rem' // Add a right margin to move the error message to the right
                    }}
                  >
                    {errorMessage || "\u00A0"}
                  </Typography>
                )}
                </Box>
              </form>
            </Box>
            <a href='/login'>
              <Button disableRipple variant='text' size='medium'
              sx={{fontFamily:"aleph",  mt: 4, ml:2, borderRadius: 4, fontSize: 16}} color='inherit'> משתמש קיים? לחץ כאן</Button>  
            </a>
          </Box>  
        </form>
  );
};

export default FormSignUpInfo;