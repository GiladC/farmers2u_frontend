import React, {useEffect, useState} from 'react'
import { TextField, Box, Typography, Grid, Paper, Button, Stack } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import PublishSharpIcon from '@mui/icons-material/PublishSharp';

function ValidateFacebook({facebook, setValidFlag}) {
  const [valid ,setValid] = useState(true);
  
  useEffect(() => {
      setValid(isValidFacebook());
  }, [facebook, setValidFlag]);

  function isValidFacebook() {
      const regexp = new RegExp('/(?:https?:\\/\\/)?(?:www\\.)?(mbasic.facebook|m\\.facebook|facebook|fb)\\.(com|me)\\/(?:(?:\\w\\.)*#!\\/)?(?:pages\\/)?(?:[\\w\\-\\.]*\\/)*([\\w\\-\\.]*)/');
      const res =  regexp.test(facebook) || facebook === "";
      setValidFlag(res);
      return res;
    }

  return (
    <div style={{ height: "0px" }}>
    {!valid && <Typography variant="body2" color="error">קישור לא תקין</Typography>}
  </div>
);
}

function ValidateInstagram({instagram, setValidFlag}) {
  const [valid ,setValid] = useState(true);
  
  useEffect(() => {
      setValid(isValidInstagram());
  }, [instagram, setValidFlag]);

  function isValidInstagram() {
      const regexp = new RegExp("(http(s?)://)?(?:www.)?(?:instagram|instagr).([a-z])+/(\\w*)?/?", 'gs');
      const res = regexp.test(instagram) || instagram === "";
      setValidFlag(res);
      return res;
    }

  return (
    <div style={{ height: "0px" }}>
    {!valid && <Typography variant="body2" color="error">קישור לא תקין</Typography>}
  </div>
);
}

function ValidateWebsite({url, setValidFlag}) {
  const [valid ,setValid] = useState(true);
  
  useEffect(() => {
      setValid(isValidWebsite());
  }, [url, setValidFlag]);

  function isValidWebsite() {
      const regexp = new RegExp('(https:\\/\\/www\\.|http:\\/\\/www\\.|https:\\/\\/|http:\\/\\/)?[a-zA-Z]{2,}(\\.[a-zA-Z]{2,})(\\.[a-zA-Z]{2,})?\\/[a-zA-Z0-9]{2,}|((https:\\/\\/www\.|http:\\/\\/www\\.|https:\\/\\/|http:\\/\\/)?[a-zA-Z]{2,}(\\.[a-zA-Z]{2,})(\\.[a-zA-Z]{2,})?)|(https:\\/\\/www\\.|http:\\/\\/www\\.|https:\\/\\/|http:\\/\\/)?[a-zA-Z0-9]{2,}\\.[a-zA-Z0-9]{2,}\\.[a-zA-Z0-9]{2,}(\\.[a-zA-Z0-9]{2,})?');
      const res = regexp.test(url) || url === "";
      setValidFlag(res);
      console.log(res)
      return res;
    }

  return (
    <div style={{ height: "0px" }}>
    {!valid && <Typography variant="body2" color="error">קישור לא תקין</Typography>}
  </div>
);
}

function FormOtherInfo({values, handleChange, props, setIsFormOtherInfoValid}) {
  console.log(values, handleChange);
  //const [facebookLink, setFacebookLink] = useState('');
  const [isValidFacebook, setIsValidFacebook] = useState(true);
  //const [instagramLink, setInstagramLink] = useState('');
  const [isValidInstagram, setIsValidInstagram] = useState(true);
  //const [websiteLink, setWebsiteLink] = useState('');
  const [isValidWebsite, setIsValidWebsite] = useState(true);
  const formValid = isValidFacebook && isValidInstagram && isValidWebsite;

  useEffect(() => {
    setIsFormOtherInfoValid(formValid);
}, [formValid]);

  const navigate = useNavigate();
  const {farm_name, /*email,*/ google_profile_picture, google_name, google_family_name, 
  shipping_distance, is_shipping, opening_hours, closing_hours, logo_picture, products_pictures, types_of_products,
  farm_pictures, phone_number_official, phone_number_whatsapp, phone_number_telegram, about, address,
  farmer_name, delivery_details, products, farm_site, facebook, instagram
  } = values
  const [responseMsg, setResponseMsg] = useState({
    status: "",
    message: "",
    error: "",
  });
  const submitHandler = (e) => {
    e.preventDefault();
    let openingHours = "none,none,none,none,none,none,none"
    let closingHours = "none,none,none,none,none,none,none"
    if (values.opening_hours != ""){
    const opening_hours = values.opening_hours.map(p => {
      return p && p !== "none" ? p.format() : "none";
    });
    openingHours = opening_hours.join(",");
  }
    if (values.closing_hours != ""){
    const closing_hours = values.closing_hours.map(p => {
      return p && p !== "none" ? p.format() : "none";
    });
    closingHours = closing_hours.join(",");
  }
    const data = new FormData(); 
    if (values.is_shipping == false){
      values.shipping_distance = 0
    }
    
    data.append("jsonData", JSON.stringify({
      //email: "golan@gmail.com",
      email: values.email,
      google_name: values.google_name,
      google_family_name: values.google_family_name,
      google_profile_picture: values.google_profile_picture,
      shipping_distance: values.shipping_distance,
      is_shipping: values.is_shipping,
      opening_hours: openingHours,
      closing_hours: closingHours,
      farm_name: values.farm_name,
      about: values.about,
      phone_number_official: values.phone_number_official,
      phone_number_whatsapp: values.phone_number_whatsapp,
      phone_number_telegram: "0",
      address: values.address,
      types_of_products: values.types_of_products,
      farmer_name: values.farmer_name,
      delivery_details: values.delivery_details,
      products: values.products,
      farm_site: values.farm_site,
      facebook: values.facebook,
      instagram: values.instagram

    }))
    if (values.logo_picture){
    for (let i = 0; i < values.logo_picture.length; i++) {
      data.append("files[]", values.logo_picture[i]);
      data.append("labels[]", "1");
    }
    }
    if (values.products_pictures){
    for (let i = 0; i < values.products_pictures.length; i++) {
      data.append("files[]", values.products_pictures[i]);
      data.append("labels[]", "2");
    }
  }
  if (values.farm_pictures){
    for (let i = 0; i < values.farm_pictures.length; i++) {
      data.append("files[]", values.farm_pictures[i]);
      data.append("labels[]", "3");
    }
  }
    //console.log(image)
    //console.log(productsImages)
    //console.log(farmImages)
    
    
    axios.post("http://127.0.0.1:5000/signup", data)
    .then(function (response) {
      //handle success
      console.log(response)
      axios({
        method: 'POST',
        url: 'http://127.0.0.1:5000/logintoken',
        data: {
          email: values.email // Include the email in the POST request
        }
      })
        .then(function (response) {
          console.log(response);
          props.setToken(response.data.access_token);
          alert('נרשמת בהצלחה. מיד תועבר לאתר.');
          localStorage.setItem('email', values.email);
          //localStorage.setItem('email', "golan@gmail.com");
          console.log(response.data);
          navigate('/bullboard');
        })
        .catch(function (error) {
          if (error.response && error.response.status === 409) {
            alert('הפרטים שהוזנו שגויים');
          }
        });

      //alert('המשתמש נוסף בהצלחה.');  
      //window.location.href = '/';
      
  })
  .catch(function (error) {                          
      //handle error
      if (error.response && error.response.status === 409) {
        alert("שגיאה");
      alert("המייל שאיתו ביקשתם להירשם כבר רשום במערכת.");
    }
    
});

     
  };

  const handleChangeFacebook = (event) =>{
    handleChange('facebook')(event);
    //setFacebookLink(event.target.value);
  };
  const handleChangeInstagram = (event) =>{
    handleChange('instagram')(event);
    //setInstagramLink(event.target.value);
  };
  const handleChangeWebsite = (event) =>{
    handleChange('farm_site')(event);
    //setWebsiteLink(event.target.value);
  };
  

  const fileValidate = (file) => {
    if (
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg"
    ) {
      setResponseMsg({
        ...responseMsg,
        error: "",
      });
      return true;
    } else {
      setResponseMsg({
        ...responseMsg,
        error: "File type allowed only jpg, png, jpeg",
      });
      return false;
    }
  };
  return (
    <div  >  
    <form mr={3}autoComplete="off" dir="rtl" /*className={classes.root}*/>  
    <Box marginTop={5} bgcolor="#f7f1e5" boxShadow={0} borderRadius={2} border={2} display="flex" flexDirection={"column"} width={580} height={160.2} alignItems={"center"} justifyContent={"center"} mt={3.8} mr={2.3} padding={20} sx={{border: '1.5px solid #f7f1e5'}}  >
    <Box style={{marginTop:"22.7%"}}>
    <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} fontSize={50} marginTop="-9.2rem" variant='h3' textAlign={"center"}> הרשמת חקלאי </Typography>
    <Typography color="#37474f" fontFamily="aleph" minHeight={45} fontWeight={'bold'} fontSize={22}  mr={-1} marginBottom={12} marginTop={3} variant='h2'  textAlign={"center"}> שלב 6 - פרטים נוספים</Typography>
    </Box>
<Grid marginTop={-12} marginBottom={-10} container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={6}>
  <Paper>
      <TextField fullWidth multiline dir="rtl"
        /*label="שם פרטי"*/
        name ="facebook"
        /*value={values.firstName}*/
        variant='outlined'
        type="text"
        onChange={handleChangeFacebook}
        placeholder='קישור לפייסבוק'
        required="required"
        defaultValue={values.facebook}
        rows={1}
        rowsMax={5}
        InputProps={{
          endAdornment: (
            <InputAdornment position={'end'}>
                <FacebookIcon sx={{ ml: 0.1, my: 0.5 }}>
                </FacebookIcon>
            </InputAdornment>
          )
          
        }}
        /* onChange = {handleInputChange} */
      />
    </Paper>
    <ValidateFacebook facebook={values.facebook} setValidFlag={setIsValidFacebook}/>
  </Grid>
  <Grid item xs={6}>
  <Paper>
      <TextField fullWidth multiline dir="rtl"
        /*label="שם פרטי"*/
        name ="instagram"
        /*value={values.firstName}*/
        variant='outlined'
        type="text"
        placeholder='קישור לאינסטגרם'
        required="required"
        onChange={handleChangeInstagram}
        defaultValue={values.instagram}
        rows={1}
        rowsMax={5}
        InputProps={{
          endAdornment: (
            <InputAdornment position={'end'}>
                <InstagramIcon sx={{ ml: 0.1, my: 0.5 }}>
                </InstagramIcon>
            </InputAdornment>
          )
          
        }}
        /* onChange = {handleInputChange} */
      />
    </Paper>
    <ValidateInstagram instagram={values.instagram} setValidFlag={setIsValidInstagram}/> 
  </Grid>
  <Grid item xs={12}>
  <Paper>
      <TextField fullWidth multiline dir="rtl"
        /*label="שם פרטי"*/
        name ="website"
        /*value={values.firstName}*/
        variant='outlined'
        type="text"
        placeholder='כתובת אתר העסק'
        rows={1}
        onChange={handleChangeWebsite}
        defaultValue={values.farm_site}
        rowsMax={5}
        InputProps={{
          endAdornment: (
            <InputAdornment position={'end'}>
                <LanguageIcon sx={{ ml: 0.1, my: 0.5 }}>
                </LanguageIcon>
            </InputAdornment>
          )
          
        }}
        /* onChange = {handleInputChange} */
      />
    </Paper> 
    <ValidateWebsite url={values.farm_site} setValidFlag={setIsValidWebsite}/> 
  </Grid>
  <Grid item xs={12}>
  <Paper>
      <TextField fullWidth multiline dir="rtl"
        /*label="שם פרטי"*/
        name ="name"
        /*value={values.firstName}*/
        variant='outlined'
        type="text"
        placeholder='ספרו על עצמכם!'
        required="required"
        helperText="*כאן תוכלו לשתף את הסיפור שלכם בכמה משפטים (יוצג באתר)"
        rows={2}
        rowsMax={5}
        defaultValue={values.about}
        onChange={handleChange('about')}
      />
    </Paper> 
  </Grid>

</Grid>
<Box display="flex"   alignItems="center" 
  justifyContent="center" mr={13} style={{
    marginTop: "28.48%",
    zIndex: 1,
    
  }}>
{/*<Button style= {{borderWidth:'1px', minWidth:"50px", width:"5.1rem", backgroundColor: "#ffb74d", 
                fontFamily:"aleph", fontSize: 16,
                color: "#212121"}} disabled={!formValid } variant="outlined" sx={{borderColor: 'black'}} 
  type="submit" onClick={submitHandler}>
שלח</Button>*/}
  </Box>

  </Box>
     
</form>
</div>
  )
}

export default FormOtherInfo

{/*        defaultValue={values.about} 
onChange={handleChange('about')}*/}