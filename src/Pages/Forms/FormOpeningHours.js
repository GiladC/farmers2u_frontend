import React, { useState, useEffect } from 'react';
import { Stack, Box, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import dayjs from 'dayjs';
import {ValidateWorkingHours} from '../../components/validations'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  margin: theme.spacing(1),
}));

function FormOpeningHours({values, setFormValue, setIsFormOpeningHoursValid}) {
  const {farm_name, email, google_profile_picture, google_name, google_family_name, 
  shipping_distance, is_shipping, opening_hours, closing_hours, logo_picture, products_pictures, types_of_products, 
  farm_pictures, phone_number_official, phone_number_whatsapp, phone_number_telegram, about, address,
  farmer_name, delivery_details, products, farm_site, facebook, instagram
  } = values
  const [openingTimesNew, setOpeningTimesNew] = useState(values.opening_hours || Array(7).fill(null));
  const [closingTimesNew, setClosingTimesNew] = useState(values.closing_hours || Array(7).fill(null));
  const [validDayHours, setValidDayHours] = useState(Array(7).fill(true));
  const [openingTimes, setOpeningTimes] = useState(Array(7).fill(null));
  const [closingTimes, setClosingTimes] = useState(Array(7).fill(null));
  const formValid = validDayHours;
    useEffect(() => {
      setIsFormOpeningHoursValid(formValid);
  }, [formValid]);

  const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

  const handleChangeOpeningTime = (index, newValue) => {
    const timeStr = formatTimeValue(newValue);
  
    setOpeningTimes(prevTimes => {
      const newTimes = [...prevTimes];
      newTimes[index] = timeStr;
      return newTimes;
    });
  };
  
  const handleChangeClosingTime = (index, newValue) => {
    const timeStr = formatTimeValue(newValue);
  
    setClosingTimes(prevTimes => {
      const newTimes = [...prevTimes];
      newTimes[index] = timeStr;
      return newTimes;
    });
  };
  
  const formatTimeValue = value => {
    if (value && value.length >= 2) {
      const hours = value.slice(0, 2);
      const minutes = value.slice(3, 5);
      return `${hours}:${minutes}`;
    }
    return value;
  };

  const handleSetOpeningTimeNew = (index, newValue) => {
    let inputTime = newValue;
    const newOpeningTime = [...openingTimesNew];
    newOpeningTime[index] = inputTime;
    setOpeningTimesNew(newOpeningTime);
    setFormValue("opening_hours",newOpeningTime);
};

  const handleSetClosingTimeNew = (index, newValue) => {
    const inputTime = newValue;
    const newClosingTime = [...closingTimesNew];
    newClosingTime[index] = inputTime
    setClosingTimesNew(newClosingTime)
    setFormValue("closing_hours",newClosingTime)
  }

  const validDayFlag = (index) => (flag) => {
    const flags = [...validDayHours];
    flags[index] = flag;
    setValidDayHours(flags);
  };

  return (
    <form autoComplete="off" dir="rtl">
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <Box style={{ marginBottom: '20px'}} marginTop={5}  bgcolor="#f7f1e5" boxShadow={0} borderRadius={2} border={2} display="flex" flexDirection="column" height={140} width={1300} alignItems="center" justifyContent="center" mt={3.8} mr={2.3} padding={20} sx={{ border: '1.5px solid #f7f1e5' }}>
        <Box style={{ marginBottom: '19px'}}>
        <Typography color="#37474f" fontFamily="aleph" fontWeight="bold" fontSize={50} marginTop="-9rem" variant="h3" textAlign="center">הרשמת חקלאי</Typography>
        <Typography color="#37474f" fontFamily="aleph" minHeight={45} fontWeight="bold" fontSize={22} marginBottom={2} marginTop={3} variant="h2" textAlign="center">שלב 5 - שעות פתיחה וימי פעילות</Typography>
        </Box>
        <Grid container spacing={22} mr={24}>
        {days.map((day, index) => (
            <Grid item xs={1} key={day}>
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <Box gap={2} display= 'flex' flexDirection='column'  gridTemplateColumns= '1fr 3fr 3fr' paddingTop={2} paddingRight={2} paddingLeft={2} sx={{direction: 'rtl'}} direction= 'row' alignItems= 'center'>
                  <Typography variant='h5' fontFamily="aleph" color= 'rgb(2, 0, 99)' fontSize={20} fontWeight={540}>
                    {day}
                  </Typography>
                  <Box position="relative">
                    <Paper>
                      <TimeField
                        direction= 'rtl'
                        label="פתיחה"
                        value={openingTimesNew[index]}
                        onChange={(newValue) => handleSetOpeningTimeNew(index, newValue)}
                        format='HH:mm'
                        sx={{
                          "& label":{left: "unset",
                          right: "1.75rem",
                          transformOrigin: "right"},
                          "& legend": {
                            textAlign: "right",
                          },
                          width: '150px',
                        }}
                      />
                    </Paper>
                  </Box>
                  <Paper>
                  <TimeField
                    label="סגירה"
                    value={closingTimesNew[index]}
                    onChange={(newValue) => handleSetClosingTimeNew(index, newValue)}
                    format='HH:mm'
                    sx={{
                      "& label": { left: "unset", right: "1.75rem", transformOrigin: "right" },
                      "& legend": {
                        textAlign: "right",
                      },
                      width: '150px',
                    }}
                  />
                  <ValidateWorkingHours open={openingTimesNew[index]} close={closingTimesNew[index]} setValidFlag={validDayFlag(index)}/>
                </Paper>
                </Box>
              </LocalizationProvider>
            </Grid>
        ))}
        </Grid>
      </Box>
      </LocalizationProvider>
    </form>
  );
}

export default FormOpeningHours;