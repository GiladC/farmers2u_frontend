import React, {useEffect, useState} from 'react'
import { TextField, Box, Typography, Grid, Paper} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';

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
    const regexp = new RegExp('(https:\\/\\/www\\.|http:\\/\\/www\\.|https:\\/\\/|http:\\/\\/)?[a-zA-Z]{2,}(\\.[a-zA-Z]{2,})(\\.[a-zA-Z]{2,})?\\/[a-zA-Z0-9]{2,}|((https:\\/\\/www\.|http:\\/\\/www\\.|https:\\/\\/|http:\\/\\/)?[a-zA-Z]{2,}(\\.[a-zA-Z]{2,})(\\.[a-zA-Z]{2,})?)|(https:\\/\\/www\\.|http:\\/\\/www\\.|https:\\/\\/|http:\\/\\/)?[a-zA-Z0-9]{2,}\\.[a-zA-Z0-9]{2,}\\.[a-zA-Z0-9]{2,}(\\.[a-zA-Z0-9]{2,})?')
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
