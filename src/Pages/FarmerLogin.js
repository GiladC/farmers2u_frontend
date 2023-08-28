import { TextField, Button, Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { BrowserRouter, Link, useNavigate } from 'react-router-dom';
import "../App.css";


const Auth = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({email:"", password: ""})
    const handleChange = (e) => {setInputs((prevState)=> ({...prevState, [e.target.name] : e.target.value}))}
    const handleSubmit = (e) => {e.preventDefault(); console.log(inputs);}
  return (
    <div dir="rtl" >
      <Box sx={{ pb: 5 }}>
        <form autoComplete="off" onSubmit={handleSubmit}>
            <Box bgcolor="beige" 
            sx={{":hover": {bgcolor: '#ffeecc', color: "black", 
            boxShadow: "5px 5px 10px #ccc"}
      }} boxShadow={2}  border={1} display="flex" 
      flexDirection={"column"} maxWidth={700} maxHeight={2000} 
      alignItems={"center"} justifyContent={"center"} margin={"auto"} 
      mt={4} padding={10} pb={4} >

                <Typography variant='h3' padding={3} textAlign={"center"}> התחברות חקלאי למערכת</Typography>
                <TextField name="email" value={inputs.email} onChange={handleChange} required="required" type="email" margin="normal" variant='outlined' placeholder='כתובת מייל' InputProps={{startAdornment: (
                <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />)}}/>
                <TextField name="password" value={inputs.password} onChange={handleChange} required="required" type="password" margin="normal" variant='outlined' placeholder='סיסמה'  InputProps={{startAdornment: (
                <PasswordIcon color="action" sx={{ marginRight: '0.5rem' }} />),}}/>
                <Button type="submit" sx={{ mt: 4, borderRadius: 4, textTransform: 'none', display: 'flex', alignItems: 'center' }} variant="contained" color='primary' dir="rtl">להתחבר <LoginOutlinedIcon sx={{ mr: 1 }} /> </Button>
                <Button variant='text' size='medium' sx={{ mt: 4, borderRadius: 4}} color='secondary'> לשחזור סיסמה לחץ כאן </Button>         
                <Button onClick={() => {navigate("/signup");}} variant='text' size='medium' sx={{ mt: 4, borderRadius: 4}} color='inherit'> מעבר לטופס הרשמה </Button>         
            </Box>
        </form>
      </Box>
    </div>
  )
}

export default Auth