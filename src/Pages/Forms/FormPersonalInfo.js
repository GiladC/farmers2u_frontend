import React, {useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, ThemeProvider, createTheme, Grid, Paper, FormControl, Tooltip} from '@mui/material'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from "axios";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import {ValidatePhone, ValidateWhatsapp} from '../../components/validations'




const {palette} = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const themeForButton = createTheme({
  palette: {
    nice: createColor('#e1f5fe'),
  },
});

function ValidateFarmName({farmName, setValidFlag}) {
  const [valid ,setValid] = useState(true);
  
  useEffect(() => {
      setValid(isValidFarmName());
  }, [farmName, setValidFlag]);

  function isValidFarmName() {
      const res =  farmName !== "";
      setValidFlag(res);
      return res;
    }

  return (
    <div style={{ height: "0px" }}>
    {!valid && <Typography dir="rtl" style={{marginRight:"-261%"}} variant="body2" color="error">שדה חובה</Typography>}
  </div>
);
}

function ValidateFarmerName({farmerName, setValidFlag}) {
  const [valid ,setValid] = useState(true);
  
  useEffect(() => {
      setValid(isValidFarmerName());
  }, [farmerName, setValidFlag]);

  function isValidFarmerName() {
      const res =  farmerName !== "";
      setValidFlag(res);
      return res;
    }

  return (
    <div style={{ height: "0px" }}>
    {!valid && <Typography dir="rtl" style={{marginRight:"-261%"}} variant="body2" color="error">שדה חובה</Typography>}
  </div>
);
}

function ValidatePhoneNotEmpty({ phoneNumber, setValidFlag }) {
  const [valid, setValid] = useState(true);

  useEffect(() => {
    setValid(isValidPhoneNotEmpty());
  }, [phoneNumber, setValidFlag]);

  function isValidPhoneNotEmpty() {
    const res = phoneNumber !== "";
    setValidFlag(res);
    return res;
  }

  return (
    <div style={{ height: "0px" }}>
      {!valid && (
        <Typography dir="rtl" style={{ marginRight: "5.8%" }} variant="body2" color="error">
          שדה חובה
        </Typography>
      )}
    </div>
  );
}


function ValidateAddress({ address, setValidFlag }) {
  const [valid, setValid] = useState(true);

  useEffect(() => {
    setValid(isValidAddress());
  }, [address, setValidFlag]);

  function isValidAddress() {
    const res = address !== "";
    setValidFlag(res);
    return res;
  }

  return (
    <div dir='rtl' style={{ height: "0px" }}>
      {!valid && <Typography style={{marginRight:"5%"}} variant="body2" color="error" >שדה חובה</Typography>}
    </div>
  );
}

function FormPersonalInfo({values, handleChange, setFormValue, setIsFormPersonalInfoValid }) {
  const [addressN, setAddress] = useState(values.address);
  console.log(addressN);
  const [coordintes,setCoordinates] = useState({
    lat: null,
    lng: null
  })
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [isValidPhoneNotEmpty, setIsValidPhoneNotEmpty] = useState('');
  const [isValidPhone, setIsValidPhone] = useState('');
  const [whatsApp, setWhatsApp] = useState('');
  const [whatsAppError, setWhatsAppError] = useState(false);
  const [isValidWhatsApp, setIsValidWhatsApp] = useState('');
  const [farmName, setFarmName] = useState('');
  const [isValidFarmName, setIsValidFarmName] = useState(true);
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [isValidFarmerName, setIsValidFarmerName] = useState(true);
  const [farmerName, setFarmerName] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const formValid = isValidPhoneNotEmpty && isValidPhone && isValidWhatsApp && isValidFarmName && isValidAddress && isValidFarmerName;
  // const validateForm = () => {
  //     const phoneIsValid = !phoneError;
  //     const whatsappIsValid = !whatsAppError;
  //     // Add more validation conditions here

  //     setFormValid(phoneIsValid && whatsappIsValid); // if all are true, the form is valid
  // };
  useEffect(() => {
    setIsFormPersonalInfoValid(formValid);
}, [formValid]);

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value)
    setFormValue("address",value)
    setCoordinates(latLng);
  };

  const {farm_name, /*email,*/ google_profile_picture, google_name, google_family_name, 
  shipping_distance, is_shipping, opening_hours, closing_hours, logo_picture, products_pictures, types_of_products, 
  farm_pictures, phone_number_official, phone_number_whatsapp, phone_number_telegram, about, address,
  farmer_name, delivery_details, products, farm_site, facebook, instagram
  } = values
  const handleSubmit = (data) => {
    data.preventDefault();
    alert(values.address)
    alert(values.phone_number_official)
    alert(values.phone_number_whatsapp)
    alert(values.farmer_name)
    alert(values.farm_name)

    axios({
        method: "POST",
        url: "http://127.0.0.1:5000/signup",
        data:{
        farmName: values.farmName,
        email: values.email,
        password: values.password,
        about: "",
        phoneNumber1: phone,
        phoneNumber2: whatsApp,
        city: values.city,
        address: values.address,
        farmerName: values.farmName,
        prices: "",
        products: "",
        facebook: "",
        instagram: "",
        }
    })
    .then(function (response) {
        //handle success
        console.log(response)

        alert('המשתמש נוסף בהצלחה.');  
        window.location.href = '/';
    })
    .catch(function (response) {
        //handle error
        console.log(response)
        if (response.status === 400) {
            alert("שגיאה");
        }
    });
}
  console.log(values, handleChange);
  const handleKeyDown = (event) => {
    // Check if the key is not a digit
    if (!/^[0-9]$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete') {
        event.preventDefault();
    }
};

  //const [phoneTouched, setPhoneTouched] = useState(false);
  
  const handleChangePhone = (event) => {
    const phoneNumber = event.target.value;
  
    // Regex for 10 digit numbers starting with 05 or 07
    const tenDigitPattern = /^0[57][0-9]{8}$/;
  
    // Regex for 9 digit numbers starting with 02, 03, 04, 08 or 09
    const nineDigitPattern = /^0[23489][0-9]{7}$/;
  
    const isValid = tenDigitPattern.test(phoneNumber) || nineDigitPattern.test(phoneNumber);
  
    setPhone(phoneNumber);
    setFormValue("phone_number_official",phoneNumber)
    //setPhoneError(!isValid && phoneTouched);
    setPhoneError(!isValid);
    //validateForm();

  };
  
  const handlePhoneBlur = () => {
    //setPhoneTouched(true);
    setPhoneError(!(/^0[57][0-9]{8}$/.test(phone) || /^0[23489][0-9]{7}$/.test(phone) || phone === ''));
    //if  (phone === '')
    //setPhoneTouched(false);
  };


  //const [whatsAppTouched, setWhatsAppTouched] = useState(false);
  
  const handleChangeWhatsApp = (event) => {
    const whatsAppNumber = event.target.value;
  
    // Regex for 10 digit numbers starting with 05 or 07
    const tenDigitPattern = /^0[57][0-9]{8}$/;
  
    // Regex for 9 digit numbers starting with 02, 03, 04, 08 or 09
    const nineDigitPattern = /^0[23489][0-9]{7}$/;
  
    const isValid = tenDigitPattern.test(whatsAppNumber) || nineDigitPattern.test(whatsAppNumber);
  
    setWhatsApp(whatsAppNumber);
    setFormValue("phone_number_whatsapp",whatsAppNumber)
    //setWhatsAppError(!isValid && whatsAppTouched);
    setWhatsAppError(!isValid);
    //validateForm();
    console.log(whatsApp)

  };
  
  const handleWhatsAppBlur = () => {
    //setWhatsAppTouched(true);
    setWhatsAppError(!(/^0[57][0-9]{8}$/.test(whatsApp) || /^0[23489][0-9]{7}$/.test(whatsApp) || whatsApp === ''));
    //if  (whatsApp === '')
    //setWhatsAppTouched(false);
  };

  const handleChangeFarm = (newValue) =>{
    setFarmName(newValue.target.value)
    setFormValue("farm_name",newValue.target.value)
    //validateForm();
  }
  const handleChangeFarmerName = (newValue) =>{
    setFarmerName(newValue.target.value)
    setFormValue("farmer_name",newValue.target.value)
    //validateForm();
  }


  return (
    <ThemeProvider theme={themeForButton}>
    <div>
      <form autoComplete="off" /*className={classes.root}*/>
        <Box marginTop={5} bgcolor="#f7f1e5" boxShadow={0} borderRadius={2} border={2} display="flex" flexDirection={"column"} width={580} height={164.7} alignItems={"center"} justifyContent={"center"} mt={3.2} mr={2.3} padding={20} sx={{border: '1.5px solid #f7f1e5'}}  >
              <Box style={{marginTop:"-20%"}}>
              <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} fontSize={50} marginTop="-4.1rem" variant='h3' textAlign={"center"}> הרשמת חקלאי </Typography>
              <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} mt={2} fontSize={22} mr={-0.5} marginBottom={8} marginTop={3} variant='h2'  textAlign={"center"}> שלב 2 - פרטי המשק החקלאי</Typography>
              </Box>
  <Grid marginLeft={10.5} marginTop={-4} marginBottom={-10} container rowSpacing={3} columnSpacing={4}>
  <Grid marginLeft={4} dir='rtl' item xs={9.57}>
  <PlacesAutocomplete
            value={addressN}
            onChange={(newValue) => {
              setAddress(newValue);
              console.log(newValue);
            }}
            onSelect={handleSelect}

            searchOptions={{
              types: ['address'],
              region: 'il',
              language: 'iw',
            }}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div style={{ position: 'relative' }} >
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <LocationOnIcon style={{ color: 'gray' }} sx={{zIndex: 2, marginRight: 56, mb: -7 }}/>
                </div>
                <input
                  {...getInputProps({
                    placeholder: 'כתובת המשק החקלאי ',
                    className: 'location-search-input',
                    
                    onBlur: () => {
                      console.log(addressN);
                      console.log(address);

                      if (!addressN || addressN === ""){
                        setAddress('');
                        values.address="";
                      } 
                  }
                  })}
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '16px',
                    height: '35px',
                    border: address ? '1px solid #bdbdbd' : '1px solid red',
                    border: '1px solid #bdbdbd', 
                    borderRadius: '4px',
                    boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)',
                    fontFamily: 'arial',
                    color: 'black',
                    
                                      
                  }}
                  required
                />
                    {/* {!address && <p style={{ color: 'red', position: 'absolute', bottom: '-20px', left: '0' }}>שדה חובה</p>} */}
                    <style type="text/css">
                    {`
                      .location-search-input::-webkit-input-placeholder { color: #9e9e9e; }
                      .location-search-input::-moz-placeholder { color: #9e9e9e; }
                      .location-search-input:-ms-input-placeholder { color: #9e9e9e; }
                      .location-search-input:-moz-placeholder { color: #9e9e9e; }
                    `}
                  </style>
                <div style={{position: 'absolute',
                 zIndex: 1000,
                backgroundColor: '#fff', 
                width: '105%', 
                maxWidth: '485px', 
                left: '45.5%', 
                transform: 'translateX(-50%)',
                maxHeight: '220px',
                overflowY: 'auto',
                  }}>
                  {loading && <div>טוען...</div>}
                  {suggestions.map((suggestion, index) => {
                    const style = {
                      //position: 'absolute',
                      //zIndex: '1000',
                      backgroundColor: suggestion.active ? "#ffb74d" : "#fff",
                      cursor: 'pointer',
                      padding: '10px',                      
                    };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, { style })}
                        key={index}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          <ValidateAddress
  address={addressN}
  setAddress={setAddress}
  setValidFlag={setIsValidAddress} // You need to create and manage this state
/>
  </Grid>
  <Grid container item xs={5}>
  <Tooltip 
        title={<span style={{ fontSize: '12px' }}>יש להזין שם פרטי בלבד</span>}  
        open={!!farmerName && showTooltip} 
        placement="left"
    >
      <TextField fullWidth multiline dir="rtl"
        /*label="שם פרטי"*/
        name ="name"
        /*value={values.firstName}*/
        variant='outlined'
        //marginTop={6}
        type="text"
        placeholder='שם איש קשר'
        defaultValue={values.farmer_name}
        onChange={handleChangeFarmerName}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        required="required"
        rows={1}
        rowsMax={5}
        inputProps={{ maxLength: 15 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position={'end'}>
                <PersonIcon sx={{ ml: -0.5, my: 0.5 }}>
                </PersonIcon>
            </InputAdornment>
          )
          
        }}
        sx={{ 
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0px 1.5px 1.5px rgba(0, 0, 0, 0.25)',
          fontFamily: 'arial'

        }} 
        /* onChange = {handleInputChange} */
      />
          </Tooltip>
      <ValidateFarmerName farmerName={values.farmer_name}  setFarmerName={setFarmerName} setValidFlag={setIsValidFarmerName}/>
  </Grid>
  <Grid container item xs={5}>
      <TextField fullWidth multiline dir="rtl"
        /*label="שם פרטי"*/
        name ="name"
        /*value={values.firstName}*/
        variant='outlined'
        type="text"
        placeholder='שם העסק'
        defaultValue={values.farm_name}
        onChange={handleChangeFarm}
        required="required"
        rows={1}
        rowsMax={5}  
        InputProps={{
          endAdornment: (
            <InputAdornment position={'end'}>
                <DriveFileRenameOutlineIcon sx={{ ml: -0.5, my: 0.5 }}>
                </DriveFileRenameOutlineIcon>
            </InputAdornment>
          )
          
        }}
        sx={{ 
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0px 1.5px 1.5px rgba(0, 0, 0, 0.25)',
          fontFamily: 'arial'

        }} 
        /* onChange = {handleInputChange} */
      />
      <ValidateFarmName farmName={values.farm_name} setFarmName={setFarmName} setValidFlag={setIsValidFarmName}/>
  </Grid>
  <Grid container item xs={5}>
  <div style={{ width: '100%', height: '10px' }}>  
      <TextField fullWidth multiline dir="rtl"
        /*label="שם פרטי"*/
        name ="name"
        /*value={values.firstName}*/
        variant='outlined'
        //marginTop={6}
        type="text"
        placeholder='מספר וואטסאפ'
        //defaultValue={whatsApp}
        //required="required"
        onKeyDown={handleKeyDown}
        //error={whatsAppError}
        // helperText={whatsAppError ? 'Invalid phone number' : ''}
        defaultValue={values.phone_number_whatsapp}
        onChange={handleChangeWhatsApp}
        onBlur={handleWhatsAppBlur}
        rows={1}
        inputProps={{
          maxLength: 10,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position={'end'}>
                <WhatsAppIcon sx={{ ml: -0.5, my: 0.5 }}>
                </WhatsAppIcon>
            </InputAdornment>
          )
          
        }}
        sx={{ 
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0px 1.5px 1.5px rgba(0, 0, 0, 0.25)',
          fontFamily: 'arial'

        }} 
        /* onChange = {handleInputChange} */
      />
      <ValidateWhatsapp whatsapp={values.phone_number_whatsapp} setValidFlag={setIsValidWhatsApp}/>
          {/* <div style={{height: "20px" }}>
          {whatsAppError && <Typography variant="body2" color="error">טלפון לא חוקי</Typography>}
          </div> */}
          </div>
  </Grid>
  <Grid container item xs={5}>
  <div style={{width: '100%', height: '10px' }}>  
      <TextField fullWidth multiline dir="rtl"
        /*label="שם פרטי"*/
        name ="name"
        /*value={values.firstName}*/
        variant='outlined'
        type="text"
        placeholder='מספר טלפון של העסק'
        //required="required"
        onKeyDown={handleKeyDown}
        //error={phoneError}
       // helperText={phoneError ? 'Invalid phone number' : ''}
        defaultValue={values.phone_number_official}
        onChange={handleChangePhone}
        onBlur={handlePhoneBlur}
        rows={1}
        inputProps={{
          maxLength: 10,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position={'end'}>
                <PhoneIcon sx={{ ml: -0.5, my: 0.5 }}>
                </PhoneIcon>
            </InputAdornment>
          )
          
        }}
        sx={{ 
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0px 1.5px 1.5px rgba(0, 0, 0, 0.25)',
          fontFamily: 'arial'

        }} 
        /* onChange = {handleInputChange} */
      />
        <ValidatePhone phone={values.phone_number_official} setValidFlag={setIsValidPhone}/>
        <ValidatePhoneNotEmpty phoneNumber={values.phone_number_official} setValidFlag={setIsValidPhoneNotEmpty} /> 
       {/* <div style={{height: "20px"}}>
        {phoneError && <Typography variant="body2" color="error">טלפון לא חוקי</Typography>}
        </div> */}
        </div>

  </Grid>
</Grid>
              <Button disabled variant='text' size='medium' color='nice' sx={{fontFamily:"aleph",  mt: 4, borderRadius: 4, fontSize: 16}} > .</Button>  
              {/* <Button type="submit" onClick={handleSubmit}>  בדיקה</Button> */}

          </Box>    
      </form>
    </div>
    </ThemeProvider>
  )
}

export default FormPersonalInfo;