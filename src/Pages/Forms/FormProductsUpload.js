
import { TextField, Button, Box, Typography, Grid, Paper, ThemeProvider, Menu, MenuItem, FormControlLabel, Checkbox, createTheme, Autocomplete, ListItem} from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { CheckBox, CheckBoxOutlineBlank, Close } from '@mui/icons-material';
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles'

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <Close onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(
  ({ theme }) => `
  display: flex;
  color: ${'black'};
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#E8AA42'
  };
  border: 1.5px solid ${theme.palette.mode === 'dark' ? '#1d3c45' : '#1d3c45'};
  border-radius: 22px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: '#E8AA42';
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }

`,
);


const products_categories = [
  {
    id: 1,
    label: 'ירקות'
  },
  {
    id: 2,
    label: 'פירות'
  },
  {
    id: 3,
    label: 'גבינות ומוצרי חלב'
  },
  {
    id: 4,
    label: 'ביצים'
  },
  {
    id: 5,
    label: 'דבש'
  },
  {
    id: 6,
    label: 'צמחים'
  },
  {
    id: 7,
    label: 'יינות ושמן זית'
  },
  {
    id: 8,
    label: 'תבלינים'
  },
  {
    id: 9,
    label: 'דגנים'
  },
]
  
const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

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
  const matchingProducts = products_categories.filter((prod) => 
                values.types_of_products.includes(prod.label));

  const handleChangeCategories = (newValue) => {
    const types = newValue.map(t => t.label).join();
    setFormValue("types_of_products", types);
  }

  // useEffect(() => {
  //   // Splitting the types_of_products into an array
  //   const currentTypes = types_of_products ? types_of_products.split(",") : [];

  //   if (arraysDiffer(currentTypes, selectedItems)) {
  //       // Updating the checked array based on the current types
  //       const currentChecked = labels.map(label => currentTypes.includes(label));
  //       setChecked(currentChecked);

  //       // Updating the selectedItems state with the current types
  //       setSelectedItems(currentTypes);
  //   }
  // }, [types_of_products, labels, selectedItems]);


  const handleChangePhotoLogo = (e) => {
    if (e.target.files.length > 0) {
      const selectedPhotos = e.target.files;
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
      setFormValue("logo_picture", selectedPhotos)
    }
    else {
      setFormValue("logo_picture", "");
    }
  };
  const handleChangePhotoFarm = (e) => {
    if (e.target.files.length > 0) {
      const selectedPhotos = e.target.files;
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
      setFormValue("farm_pictures", selectedPhotos)
    }
    else {
      setFormValue("farm_pictures", "");
    }
  };
  const handleChangePhotoProducts = (e) => {
    if (e.target.files.length > 0) {
      const selectedPhotos = e.target.files;
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
      setFormValue("products_pictures", selectedPhotos)
    }
    else {
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
    {/* <CheckboxMenu
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
     /> */}
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
    <Autocomplete
    style={{backgroundColor:'white'}}
          multiple
          id="checkboxes-tags-demo"
          // value={categories}
          defaultValue = {matchingProducts}
          onChange={handleChangeCategories}
          options={products_categories}
          direction= 'rtl'
          disableCloseOnSelect
          disablePortal
          position='relative'
          placement='top'
          noOptionsText = 'אין תוצאות'
          ListboxProps={
            {
              style:{
                  maxHeight: '100px',
                  border: '2px solid #E8AA42',
                  direction: 'ltr'
              }
            }
          }
          getOptionLabel={(option) => option.label}
          renderOption={(props, option, { selected }) => (
            <ListItem {...props} sx={{direction: 'rtl', fontSize: '18px', position: 'relative', overflowY: 'scroll',
            '&:hover': {backgroundColor: '#E8AA42!important'}, '&&.Mui-selected':{color: '#E8AA42!important'}}}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
                sx={{direction: 'rtl', '&.Mui-checked':{color: "black"} }}
              />
              {option.label}
            </ListItem>
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <StyledTag label={option.label} {...getTagProps({ index })} />
          ))}
          sx={{ width: '100%'
         }}
          renderInput={(params) => (
            <TextField {...params} placeholder="סוגי מוצרים"  direction= 'rtl' />
          )}
        />
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

<form autoComplete="off" dir="rtl" /*className={classes.root}*/ encType="multipart/form-data">
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
