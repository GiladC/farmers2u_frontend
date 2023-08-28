import React, { useEffect, useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { Box, Stack, Typography } from '@mui/material';
import validator from 'validator';
import {Client} from '@googlemaps/google-maps-services-js';

// export function ValidateEmail({email, setValidFlag}) {
//     useEffect(() => {
//         isValidEmail();
//     }, [email, setValidFlag])

//     function isValidEmail() {
//         const regexp = new RegExp('^.+@[^\\.].*\\[a-z]{2,}$');
//         const res = regexp.test(email);
//         if(!res) {
//             setValidFlag(false);
//         }
//         else {
//             setValidFlag(true);
//         }
//         return res;
//       }

//     return (
//         isValidEmail()? null
//         :
//         <Stack sx={{color: 'red'}}>נא להזין כתובת מייל תקינה</Stack>
//     )
// }

export function ValidateWhatsapp({whatsapp, setValidFlag}) {

    const [valid, setValid] = useState(true);

    useEffect(() => {
        setValid(isValidWhatsapp());
    }, [whatsapp, setValidFlag]);
    
    // Regex for 10 digit numbers starting with 05 or 07
    const tenDigitPattern = /^0[57][0-9]{8}$/;

    // Regex for 9 digit numbers starting with 02, 03, 04, 08 or 09
    const nineDigitPattern = /^0[23489][0-9]{7}$/;
    
    const isValid = tenDigitPattern.test(whatsapp) || nineDigitPattern.test(whatsapp);
    function isValidWhatsapp() {
        //const regexp = new RegExp('^[0][5][0|2|3|4|5|9]{1}[-]{0,1}[0-9]{7}$', 'g');
        const res = isValid || whatsapp === "";
        setValidFlag(res);
        return res;
      }
  
    return (
      <div style={{ height: "0px" }}>
      {!valid && <Typography variant="body2" color="error">טלפון לא חוקי</Typography>}
    </div>
  );
}

export function ValidatePhone({phone, setValidFlag}) {
    const [valid ,setValid] = useState(true);

    useEffect(() => {
        setValid(isValidPhone());
    }, [phone, setValidFlag]);
    // Regex for 10 digit numbers starting with 05 or 07
    const tenDigitPattern = /^0[57][0-9]{8}$/;

    // Regex for 9 digit numbers starting with 02, 03, 04, 08 or 09
    const nineDigitPattern = /^0[23489][0-9]{7}$/;
    
    const isValid = tenDigitPattern.test(phone) || nineDigitPattern.test(phone);
    function isValidPhone() {
        //const regexp = new RegExp('^0(?:[234689]|5[0-689]|7[246789])(?![01])(\\d{7})$');
        const res = isValid || phone === "";
        setValidFlag(res);
        return res;
      }
  
    return (
      <div style={{ height: "0px" }}>
      {!valid && <Typography variant="body2" color="error">טלפון לא חוקי</Typography>}
    </div>
  );
}

export function ValidateWebsite({url, setValidFlag}) {
    const [valid ,setValid] = useState(true);
    
    useEffect(() => {
        setValid(isValidWebsite());
    }, [url, setValidFlag]);

    function isValidWebsite() {
        const regexp = new RegExp('(https:\\/\\/www\\.|http:\\/\\/www\\.|https:\\/\\/|http:\\/\\/)?[a-zA-Z]{2,}(\\.[a-zA-Z]{2,})(\\.[a-zA-Z]{2,})?\\/[a-zA-Z0-9]{2,}|((https:\\/\\/www\.|http:\\/\\/www\\.|https:\\/\\/|http:\\/\\/)?[a-zA-Z]{2,}(\\.[a-zA-Z]{2,})(\\.[a-zA-Z]{2,})?)|(https:\\/\\/www\\.|http:\\/\\/www\\.|https:\\/\\/|http:\\/\\/)?[a-zA-Z0-9]{2,}\\.[a-zA-Z0-9]{2,}\\.[a-zA-Z0-9]{2,}(\\.[a-zA-Z0-9]{2,})?');
        const res = regexp.test(url) || url === "";
        setValidFlag(res);
        return res;
      }
  
    return (
      <div style={{ height: "0px" }}>
      {!valid && <Typography variant="body2" color="error">קישור לא תקין</Typography>}
    </div>
  );
}

export function ValidateInstagram({instagram, setValidFlag}) {
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


export function ValidateFacebook({facebook, setValidFlag}) {
    const [valid ,setValid] = useState(true);
    
    useEffect(() => {
        setValid(isValidFacebook());
    }, [facebook, setValidFlag]);

    function isValidFacebook() {
        const regexp = new RegExp('/(?:https?:\\/\\/)?(?:www\\.)?(mbasic.facebook|m\\.facebook|facebook|fb)\\.(com|me)\\/?(?:(?:\\w\\.)*#!\\/)?(?:pages\\/)?(?:[\\w\\-\\.]*\\/)*([\\w\\-\\.]*)/');
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


// day, setOpenening, setClosing
export function ValidateWorkingHours({open, close, setValidFlag}) {
    // const [value2, setValue2] = React.useState(dayjs('2022-04-17T17:300'));
  
    const [validRange, setValidRange] = useState(true);
    const [valid, setValid] = useState(true);
  
    useEffect(() => {
      validateHours();
    }, [open, close, setValidFlag]);
  
    function validateHours()
    {
      if (!(open) && !(close)) // in this day the business does not work
      {
        setValid(true);
        setValidRange(true);
        setValidFlag(true);
      }
      else if (open && close)
      {
        if (!(open.isValid() && close.isValid())) // not valid hours
        {
          setValid(false);
          setValidRange(true);
          setValidFlag(false);
        }
        else if(open.diff(close) >= 0) // not valid hours range
        {
          setValidRange(false);
          setValid(true);
          setValidFlag(false);
        }
        else // valid hours range
        {
          setValidRange(true);
          setValid(true);
          setValidFlag(true);
        }
      }
      else // at least one of the hour fields (open, close) is empty
      {
        if(open && !open.isValid()) // open is notempty and npt valid
        {
          setValid(false);
          setValidRange(true);
          setValidFlag(false);
        }
        else if(close && !close.isValid()) // close is not empty and not valid
        {
          setValid(false);
          setValidRange(true);
          setValidFlag(false);
        }
        else // both are valid, but only one is not empty
        {
          setValidRange(false);
          setValid(true);
          setValidFlag(false);
        }
      }
    }
    return (
        <div style={{ height: "0px" }}>
        {!validRange && <Typography variant="body2" color="error">יש להזין טווח שעות תקין</Typography>}
      </div>
    );
};

export function ValidateFarmerName({name, setValidFlag}){
  const [valid ,setValid] = useState(true);

  useEffect(() => {
       setValid(isValidName());
  }, [name, setValidFlag]);

  function isValidName(){
    const regexp = new RegExp(/[0-9]/);
    const res =  !regexp.test(name);
    setValidFlag(res);
    return res;
  }

  return (
    <div style={{ height: "0px" }}>
    {!valid && <Typography variant="body2" color="error">השם בפורמט לא תקין</Typography>}
  </div>
);
}

export function ValidateAddress({address, setValidFlag, isInitialized}){
    const [valid ,setValid] = useState(true);

    useEffect(() => {
        if(isInitialized) 
        {
           isValidAddress();
        }
    }, [address, setValidFlag]);

    async function isValidAddress(){
        const client = new Client();
        try {
            const response = await client.geocode({
                params: {
                address: address,
                country: 'il',
                language: 'iw',
                components: 'country: IL',
                key: 'AIzaSyAW-HDgK8fdEceybLwvRN_7wYgI_TtHmQ0'
                }
            });
            
            if (response.data.status === 'OK') {
                const res = response.data.results;
                const res_0 = res[0];
                const formatted_address = res_0.formatted_address;
                console.log(response.data);
                if(res > 1)
                {
                    setValid(false);
                    setValidFlag(false);
                }
                else if(res_0.partial_match)
                {
                    setValid(false);
                    setValidFlag(false);
                }
                else
                {
                    setValid(true);
                    setValidFlag(true);
                    // const len = formatted_address.length;
                    // console.log(formatted_address.slice(0,formatted_address.length - 7));
                    // if(address === formatted_address.slice(0,formatted_address.length - 7))
                    // {
                    //     setValid(true);
                    //     setValidFlag(true);
                    // }
                    // else {
                    //     setValid(false);
                    //     setValidFlag(false);
                    // }
                }
            }
            else
            {
                setValid(false);
                setValidFlag(false);
            }
        }
        catch (error) {
            console.log(error);
            setValid(false);
            setValidFlag(false);
        }
    }

    return (
        valid? null
        :
        <Stack sx={{color: 'red'}}> נא לוודא שנבחרה במדויק אופציה מבין הקיימות</Stack>
    )

}

