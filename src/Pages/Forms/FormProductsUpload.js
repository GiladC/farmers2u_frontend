import React, { useState, useEffect } from 'react'
import { TextField, Button, Box, Typography, Grid, Paper, ThemeProvider, Menu, MenuItem, FormControlLabel, Checkbox, createTheme, FormControl, FormLabel} from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
// import ProductList from './ProductList';
import axios from "axios";
import { unstable_batchedUpdates } from 'react-dom';



const {palette} = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const themeForButton = createTheme({
  palette: {
    button: createColor('#E8AA42'),
    white: createColor('#ffffff'),
    garbage: createColor('#9e9e9e'),
    hovergarbage: createColor('#37474f'),
    adder: createColor('#f7f1e5'),
    addPicture: createColor('#f7f1e5'),
  },
});

function CheckboxMenu(props) {

  
  return (
    <div>
      <Button disableRipple variant="contained" color="white" onClick={props.handleClick}
       style={{
        width: "580px",
        height: "50px",
        border: "1px solid #bdbdbd", 
        overflowX: "scroll", 
        whiteSpace: "nowrap", 
        display: "flex", 
        alignItems: "center", 
       justifyContent: "flex-start", 
       background: "#FFFFFF",
       '&:hover': {
        color: 'initial',
        backgroundColor: 'initial !important'
       }, }}>

      {Boolean(props.anchorEl) ? <RemoveIcon /> : <AddIcon />}
      <Typography style={{ color: '#37474f', fontSize: '15px', fontFamily: 'aleph' }}>
      {props.selectedItems.length > 0 ? 
          <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
            {props.selectedItems.map((item, index) => (
              <div key={index} style={{ backgroundColor: '#f5f5f5', margin: '5px', padding: '5px' }}>
                {item }
                <span style={{ cursor: 'pointer', marginRight: '10px' }} onClick={(event) => props.handleRemove(event,item)}>
                  x
                </span>
              </div>
            ))}
          </div>
          : 'אילו סוגי מוצרים אתם מוכרים?'}
            </Typography>
        </Button>
      <Menu
        id="checkbox-menu"
        anchorEl={props.anchorEl}
        keepMounted
        dir="rtl"
        open={Boolean(props.anchorEl)}
        onClose={props.handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // Position where the menu will be attached
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}  // Position from where the menu will appear
        PaperProps={{
          style: {
            maxHeight: 200, // Sets the maximum height for menu
            width: '57.7ch',
            flexGrow:1,
            
          },
        }}
      >
      <Grid container rowSpacing={1} columnSpacing={-5}>
      {props.labels.map((label, i) => (
          <Grid item xs={4} key={i}>
          <MenuItem  onClick={(event) => event.stopPropagation()}>
            <FormControlLabel
              control={<Checkbox checked={props.checked[i]} onChange={() => props.handleToggle(i)} color={props.checked[i] ? 'button' : 'default'}/>}
              label={label}

            />
          </MenuItem>
          </Grid>
        ))}
            </Grid>
    <div style={{ borderTop: '1px solid #ccc', marginTop: '10px', paddingTop: '10px' }}>
      {props.selectedItems.join(', ')}
    </div>
      </Menu>
    </div>

  );
}

function FormProductsUpload({values, handleChange, setFormValue}) {
  const {farm_name, email, google_profile_picture, google_name, google_family_name, 
    shipping_distance, is_shipping, opening_hours, closing_hours, logo_picture, products_pictures, types_of_products, 
    farm_pictures, phone_number_official, phone_number_whatsapp, phone_number_telegram, about, address,
    farmer_name, delivery_details, products, farm_site, facebook, instagram
    } = values
  const labels = ["ירקות", "פירות", "גבינות ומוצרי חלב", "ביצים", "דבש", "צמחים", "יינות ושמן זית", "תבלינים", "דגנים"];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [checked, setChecked] = React.useState(
    Array(9).fill(false) // Initial state for 9 checkboxes
  );
  const [selectedItems, setSelectedItems] = React.useState([]);
  // Helper function to check if two arrays are different
  const arraysDiffer = (a, b) => {
    return !(JSON.stringify(a) === JSON.stringify(b));
  }

  useEffect(() => {
    // Splitting the types_of_products into an array
    const currentTypes = types_of_products ? types_of_products.split(",") : [];

    if (arraysDiffer(currentTypes, selectedItems)) {
        // Updating the checked array based on the current types
        const currentChecked = labels.map(label => currentTypes.includes(label));
        setChecked(currentChecked);

        // Updating the selectedItems state with the current types
        setSelectedItems(currentTypes);
    }
  }, [types_of_products, labels, selectedItems]);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = (index) => {
    setChecked((prevChecked) => {
      const newChecked = [...prevChecked];
      newChecked[index] = !newChecked[index];
      console.log(newChecked)
      return newChecked;
    });
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = [...prevSelectedItems];
      if (newSelectedItems.includes(labels[index])) {
        const itemIndex = newSelectedItems.indexOf(labels[index]);
        newSelectedItems.splice(itemIndex, 1);
      } else {
        newSelectedItems.push(labels[index]);
      }
      setFormValue("types_of_products", newSelectedItems.join())
      return newSelectedItems;
    });
  };
  const handleRemove = (event,label) => {
    event.stopPropagation();
    const index = labels.indexOf(label);
    setChecked((prevChecked) => {
      const newChecked = [...prevChecked];
      newChecked[index] = false;
      return newChecked;
    });

    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = [...prevSelectedItems];
      const itemIndex = newSelectedItems.indexOf(label);
      newSelectedItems.splice(itemIndex, 1);
      setFormValue("types_of_products", newSelectedItems.join())
      return newSelectedItems;
    });
  };
  console.log(values, handleChange);
  const additionalItems = ['אורגני', 'טבעוני'];
  const [image, setImage] = useState(null);
  const [productsImages, setProductsImages] = useState(null);
  const [farmImages, setFarmImages] = useState(null);
  const [responseMsg, setResponseMsg] = useState({
    status: "",
    message: "",
    error: "",
  });
  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData(); 
    data.append("jsonData", JSON.stringify({
      email:"tamirsadovsky@gmail.com",
      google_name: "picture",
      google_profile_picture: "picture",
      shipping_distance: "",
      is_shipping:"",
      opening_hours:"",
      closing_hours:"",
      google_name: "Golan",
      google_family_name: "Farmson",
      farm_name: "משק הגולן",
      logo_picture: "",
      farm_pictures: "",
      products_pictures: "",
      about: "המשק קיים מזה 20 שנה והוא משק משפחתי שעובר מדור לדור. המטרה שלנו היא להביא את הירקות האיכותיים ביותר, במחירים הגונים.",
      phone_number_official: "0",
      phone_number_whatsapp: "0",
      phone_number_telegram: "0",
      address: "בן דרור 17",
      farmer_name: "Golan",
      delivery_details: "משלוחים רק בצפון, החל ממחיר הזמנה של 120 ש\"ח.\n\nניתן לעשות הזמנות מראש ולקחת באיסוף עצמי.",
      products: "מלפפון: 5.9 ש\"ח לק\"ג\n\nעגבניה: 5 ש\"ח לק\"ג\n\nבצל: 6.4 ש\"ח לק\"ג\n\nגזר: 6 ש\"ח לק\"ג\n\nחציל: 7 ש\"ח לק\"ג",
      farm_site: "www.golanfarm.com",
      facebook: "www.facebook/golanfarm.com",
      instagram: "www.instagram/golanfarm.com"

    }))
    for (let i = 0; i < image.length; i++) {
      data.append("files[]", image[i]);
      data.append("labels[]", "1");
    }
    for (let i = 0; i < productsImages.length; i++) {
      data.append("files[]", productsImages[i]);
      data.append("labels[]", "2");
    }
    for (let i = 0; i < farmImages.length; i++) {
      data.append("files[]", farmImages[i]);
      data.append("labels[]", "3");
    }
    console.log(image)
    console.log(productsImages)
    console.log(farmImages)
    
    axios.post("http://127.0.0.1:5000/signup", data)
    .then((response) => {
            console.log(response)
        if (response.status === 201) {
          this.setState({
            responseMsg: {
              status: response.data.status,
              message: response.data.message,
            },
          });
          setTimeout(() => {
            this.setState({
              image: "",
              responseMsg: "",
            });
          }, 100000);
  
          document.querySelector("#imageForm").reset();
        }
            alert("Successfully Uploaded");
    })
    .catch((error) => {
        console.error(error); 
        if (error.response) {
            console.log(error.response)
            if (error.response.status === 401) {
                alert("Invalid credentials");
            }
        }
    });
     
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

  const handleChangePhotoLogo = (e) => {
    if (e.target.files.length > 0) {
      const selectedPhotos = e.target.files;
      const labelLogo = "1"
      for (let i = 0; i < selectedPhotos.length; i++) {
        if (!fileMaxSize(selectedPhotos[i])){
          alert("גודל מקסימלי עבור קובץ הוא 5MB.");
          return;
        }
        if (!fileTypeValidation(selectedPhotos[i])) {
          e.target.value = null; // Clear the input field
          alert("מותר לצרף תמונות בפורמט PNG, JPEG או JPG בלבד.");
          return;
        }
        if (!fileSpecialChars(selectedPhotos[i])) {
          alert("שם הקובץ מכיל תווים לא חוקיים.");
          e.target.value = null; 
          return
        }
      }
      setImage(selectedPhotos)
      setFormValue("logo_picture", selectedPhotos)
    }
    else {
      setImage("");
      setFormValue("logo_picture", "");
    }
  };
  const handleChangePhotoFarm = (e) => {
    if (e.target.files.length > 0) {
      const selectedPhotos = e.target.files;
      const labelLogo = "2"
      if (!filesNumberValidation(selectedPhotos.length)){
        alert("מותר להעלות עד 5 קבצים.");
        e.target.value = null; 
        return
      }
  
      for (let i = 0; i < selectedPhotos.length; i++) {
        if (!fileMaxSize(selectedPhotos[i])){
          alert("גודל מקסימלי עבור קובץ הוא 5MB.");
          return;
        }
        if (!fileTypeValidation(selectedPhotos[i])) {
          alert("מותר לצרף תמונות בפורמט PNG, JPEG או JPG בלבד.");
          e.target.value = null; 
          return;
        }
        if (!fileSpecialChars(selectedPhotos[i])) {
          alert("שם הקובץ מכיל תווים לא חוקיים.");
          e.target.value = null; 
          return
        }
      }
      setFarmImages(selectedPhotos)
      setFormValue("farm_pictures", selectedPhotos)
    }
    else {
      setFarmImages("");
      setFormValue("farm_pictures", "");
    }
  };
  const handleChangePhotoProducts = (e) => {
    if (e.target.files.length > 0) {
      const selectedPhotos = e.target.files;
      const labelLogo = "3"
              if (!filesNumberValidation(selectedPhotos.length)){
          alert("מותר להעלות עד 5 קבצים.");
          e.target.value = null; 
          return
        }
    
        for (let i = 0; i < selectedPhotos.length; i++) {
          if (!fileMaxSize(selectedPhotos[i])){
            alert("גודל מקסימלי עבור קובץ הוא 5MB.");
            return;
          }
          if (!fileTypeValidation(selectedPhotos[i])) {
            alert("מותר לצרף תמונות בפורמט PNG, JPEG או JPG בלבד.");
            e.target.value = null; 
            return;
          }
          if (!fileSpecialChars(selectedPhotos[i])) {
            alert("שם הקובץ מכיל תווים לא חוקיים.");
            e.target.value = null; 
            return
          }
        }
      setProductsImages(selectedPhotos)
      setFormValue("products_pictures", selectedPhotos)
    }
    else {
      setProductsImages("");
      setFormValue("products_pictures", "");
    }
  };
  const fileTypeValidation = (file) => {
    if (
      file.type !== "image/png" &&
      file.type !== "image/jpg" &&
      file.type !== "image/jpeg"
    ) {
      return false;
    }
    return true;
  };
  const filesNumberValidation = (numberOfImagesToUpload) => {
    const MAX_FILES = 5;
    if (numberOfImagesToUpload > MAX_FILES) {
      return false
    }
    return true
  }
  const fileMaxSize = (file) => {
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
  if (file.size > MAX_FILE_SIZE) {
    return false
  }
  return true
}
  
  const fileSpecialChars = (file) => {
    const fileName = file.name;
    if (/[^A-Za-z0-9_.-]/.test(fileName)) {
      return false
    }
    return true;
}
  

  
  return (
    <ThemeProvider theme={themeForButton}>
    <div>
        <form autoComplete="off" dir="rtl" /*className={classes.root}*/>
    <Box marginTop={5} bgcolor="#f7f1e5" boxShadow={0} borderRadius={2} border={2} display="flex" flexDirection={"column"} width={580} height={142.5} alignItems={"center"} justifyContent={"center"} margin={3} mt={4} padding={20} sx={{border: '1.5px solid #f7f1e5'}}  >
    <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} fontSize={50} mr={2.3} marginTop="-7.9rem" variant='h3' textAlign={"center"}> הרשמת חקלאי </Typography>
    <Typography color="#37474f" fontFamily="aleph" minHeight={45} fontWeight={'bold'} fontSize={22} mr={2} marginBottom={2} marginTop={3} variant='h2'  textAlign={"center"}> שלב 4 - מוצרי המשק החקלאי</Typography>
      <Grid container height={278} style={{ marginTop:"-4rem"}} >
  <Grid item xs={12} style={{ marginBottom:"-1.2rem"}}>
  <Box marginBottom={2} marginTop={8} style={{ marginBottom:"-1rem"}}>
  <Box mb={2} dir="rtl">
    <CheckboxMenu
    anchorEl={anchorEl}
    selectedItems={selectedItems}
    setSelectedItems={setSelectedItems}
    handleToggle={handleToggle}
    handleClick={handleClick}
    handleClose={handleClose}
    handleRemove={handleRemove}
    setChecked={setChecked}
    checked={checked}
    labels={labels}
     />
  {/* <Typography color="#757575"fontFamily="aleph" marginTop={1} > מוכרים מוצרים מיוחדים? סמנו כאן! </Typography>
    <Box>
        <Grid container justifyContent="space-around">
            {additionalItems.map((item, index) => (
                <Grid item xs={2} key={index}>
                    <FormControlLabel
                        control={<Checkbox />}
                        label={item}
                    />
                </Grid>
            ))}
            {[...Array(3)].map((_, index) => (
                <Grid item xs={2} key={index}></Grid>
            ))}
        </Grid>
    </Box>*/}
  </Box> 
  <Typography color="#757575"fontFamily="aleph" marginTop={-2} > פירוט מבחר המוצרים ומחיריהם: </Typography>
    <Paper>
      <TextField fullWidth multiline dir="rtl"
        name ="name"
        variant='outlined'
        type="text"
        defaultValue={values.products} 
        onChange={handleChange('products')}
        placeholder='דוגמה: עגבניות - 8 ש"ח לק"ג, ענבים - 25 ש"ח למארז.'
        required="required"
        rows={2}
        rowsMax={5}       
      />
    </Paper> 
  </Box>
  {/* <ProductList /> */}
  <Typography color="#757575"fontFamily="aleph" marginTop={3} marginBottom={-5}> הוספת תמונות: </Typography>

  </Grid> 

<form onSubmit={submitHandler} autoComplete="off" dir="rtl" /*className={classes.root}*/ encType="multipart/form-data">
             <Box style={{marginRight: "10%"}}>              
          <Grid marginTop={8} item xs={6} style={{ marginBottom:"-1rem"}}>
              
              <Box margin={2} border="none" Width={1000} style={{ marginBottom:"2rem"}}>
                <Button
                /*margin={10}*/
                disableRipple
                variant="contained"
                component="label"
                color="addPicture"
                sx={{   display: 'flex',
                justifyContent: 'space-between',width:"450px",fontFamily: "aleph", boxShadow: 'none !important', '&:hover , &:active, &:focus':{color: 'initial',
                backgroundColor: 'initial', 
                boxShadow: 'none !important', opacity: 1,}}}
              >
              הוספת לוגו
                <input
                  type="file"
                  label =""
                  name="logo_picture"
                  onChange={handleChangePhotoLogo}
                />
              </Button>
            </Box>
          </Grid>
          <Grid item xs={6} style={{ marginBottom:"-1.5rem"}}>
              <Box margin={2.7}>
              </Box>

            </Grid>
            <Grid item xs={12} style={{ marginBottom:"-1rem"}}>
          {/* <Box margin={2} style={{ marginBottom:"0.2rem"}}>
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <FormLabel sx={{ typography: { fontFamily: 'aleph' } }}> כאן תוכלו להוסיף תמונות של המשק שתרצו שנפרסם בפרופיל שלכם! </FormLabel>
              </FormControl>
          </Box> */}
          </Grid>
          <Grid item xs={6} style={{ marginBottom:"-1rem"}}>
              <Box margin={2} border="none" Width={1000} style={{ marginBottom:"-1rem"}}>
                <Button
                /*margin={10}*/
                disableRipple
                variant="contained"
                component="label"
                color="addPicture"
                sx={{    display: 'flex',
                justifyContent: 'space-between',width:"450px",fontFamily: "aleph", boxShadow: 'none !important', '&:hover':{color: 'initial',
                backgroundColor: 'initial', 
                boxShadow: 'none !important', }}}
              >
                מוצרי המשק
                <Box margin={2.7}>
              </Box>
                <input
                  type="file"
                  label =""
                  name = "image"
                  multiple
                  sx={{color:'button'}}
                  onChange={handleChangePhotoProducts}
                />
              </Button>
            </Box>
          </Grid>
          <Grid item xs={6} style={{ marginBottom:"-1rem"}}>
              <Box margin={2.7}>
              </Box>
            </Grid>
            {/* <Box margin={2} marginRight={2} style={{ marginBottom:"-1rem"}}>
              <FormControl sx={{ m: 1, minWidth: 80}}>
                <FormLabel sx={{ typography: { fontFamily: 'aleph' } }}> כאן תוכלו להוסיף לוגו של המשק שלכם! </FormLabel>
              </FormControl>
          </Box> */}
            <Grid item xs={6} >
              <Box margin={2} border="none" Width={1000}>
                <Button
                /*margin={10}*/
                disableRipple
                variant="contained"
                component="label"
                color="addPicture"
                sx={{    display: 'flex',
                justifyContent: 'space-between', width:"450px"
,                fontFamily: "aleph", boxShadow: 'none !important', '&:hover':{color: 'initial',
                backgroundColor: 'initial', 
                boxShadow: 'none !important', }}}
              >
                תמונות המשק
                <input
                  type="file"
                  label =""
                  name = "farm_photo"
                  multiple
                  onChange={handleChangePhotoFarm}
                />
              </Button>
            </Box>

          </Grid>
          </Box> 
            {/* <Grid item xs={6} style={{ marginBottom:"-1rem"}}>
              <Box marginBottom ={2.8}>
                <Button type="submit">  בדיקה</Button> 
              </Box>
          
            </Grid> */}
                

     
</form>
</Grid>

  </Box> 
     
</form>
    </div>
    </ThemeProvider>

  )
}

export default FormProductsUpload
