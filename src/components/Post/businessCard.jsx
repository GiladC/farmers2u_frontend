
import styled from '@emotion/styled'
import { Email, Facebook, Home, Instagram, Language, Phone, WhatsApp } from '@mui/icons-material'
import { Box, Button, Container, IconButton, Modal, Rating, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import './businessCard.css'
import Price from '../../components/prices/prices'
import Shipping from '../../components/shipping/shipping'
import Slider from '../../Pages/ShowFarmerProfile/ImageSlider'
import image1 from '../../DummyData/ProfilePageImages/image1.jpg'
import image2 from '../../DummyData/ProfilePageImages/image2.jpg'
import image3 from '../../DummyData/ProfilePageImages/image3.jpg'
import image4 from '../../DummyData/ProfilePageImages/image4.jpg'
import image5 from '../../DummyData/ProfilePageImages/image5.jpg'


import Work from '../days/work'
import dayjs from 'dayjs'
import UserPosts from '../../Pages/Settings/userPosts'

const StyledModal = styled(Modal)({
    direction: 'rtl',
    display: 'block',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginRight: '13%',
    marginTop: '7%'
})

const slides = [
    { url: image1 },
    { url: image2 },
    { url: image3 },
    { url: image4 },
    { url: image5 },
  ];

// const days = {
//     sunday: '08:00 - 17:00',
//     monday: '08:00 - 17:00',
//     tuesday: '08:00 - 17:00',
//     wednesday: '08:00 - 17:00',
//     thursday: '08:00 - 17:00',
//     friday: 'סגור',
//     saturday: 'סגור',
// };

export default function BusinessCard({image, business, open, close}){
    // const [open, setOpen] = useState(false)
    function addZero(val) {
        const ret = val < 10 ? "0" + val : val;
        return ret;
    }

    function hoursFormat(start, end){
        if(start === "none" || end === "none "){
            return "סגור";
        }
        else{
            return addZero(dayjs(end).hour()) + ":" + addZero(dayjs(end).minute()) + " - " + addZero(dayjs(start).hour()) + ":" + addZero(dayjs(start).minute())
        }
    }
    const sunday = hoursFormat(business.opening_hours[0], business.closing_hours[0])
    const monday = hoursFormat(business.opening_hours[1], business.closing_hours[1])
    const tuesday = hoursFormat(business.opening_hours[2], business.closing_hours[2])
    const wednesday = hoursFormat(business.opening_hours[3], business.closing_hours[3])
    const thursday = hoursFormat(business.opening_hours[4], business.closing_hours[4])
    const friday = hoursFormat(business.opening_hours[5], business.closing_hours[5])
    const saturday = hoursFormat(business.opening_hours[6], business.closing_hours[6])

    const days = {
        sunday : sunday,
        monday: monday,
        tuesday: tuesday,
        wednesday: wednesday,
        thursday: thursday,
        friday: friday,
        saturday: saturday
    }
  return (
    <div>
        <StyledModal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        display= 'flex'
        >
            <Box width={900} height={420} bgcolor="white" p={3} sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'scroll', direction: 'ltr'
            }}>
                <Container sx={{display: 'grid', gridTemplateColumns: '1fr 0fr', direction: 'rtl'}}>
                    <Box>
                        <Box sx={{direction: 'rtl', flex: '7', paddingRight: '200px', justifyContent: 'center', alignContent: 'center'}}>
                            <h1>{business.farm_name}</h1>
                            {/* <div className="products">
                                <div className="products-wrapper">
                                    <div className="product-item">מלפפונים</div>
                                    <div className="product-item">עגבניות</div>
                                    <div className="product-item">גזרים</div>
                                    <div className="product-item">בצלים</div>
                                    <div className="product-item">חצילים</div>
                                </div>
                            </div> */}
                        </Box>
                        <Box paddingRight = {8}>
                            <Stack
                                direction= 'row'
                                alignItems= 'center'
                                gap= {1}>
                                    <Home />
                                    <Typography variants= 'body1' marginLeft={3}>{business.location}</Typography>
                            </Stack>
                            <Stack
                            paddingTop={2}
                            direction= 'row'
                            alignItems= 'center'
                            gap= {1}>
                                <Phone />
                                <Typography variants= 'body1' sx={{direction: 'ltr'}}>{business.phone}</Typography>
                            </Stack>
                                <Stack 
                                direction= 'row'
                                alignItems= 'center'
                                paddingTop={2}
                                gap= {1}
                                sx={{flex: '5'}}>
                                    <Email />
                                    <Typography variants= 'body1'>{business.mail}</Typography>
                                </Stack>
                        </Box>
                    </Box>
                    <Box display='flex' direction= 'ltr' paddingRight= '200px' flexDirection= 'column' sx={{flex: '1', position: 'flex-end'}}>
                        <img src={image} alt="" className="cardImg" />
                        <Box width = '200px' position= 'relative' paddingTop={3} paddingRight={4}>
                        {/* <Rating name="read-only" value={4} readOnly /> */}
                        </Box>
                    </Box>
                </Container>
                <Box sx={{
                    direction: 'rtl',
                    fontSize: '15px',
                    position: 'relative',
                    width: '700px',
                    top: '0px'}}>
                    <Box paddingBottom={5} sx={{whiteSpace: 'pre-line'}}> {business.about}</Box>
                    <div className="workContainer">
                        <Work days={days} />
                    </div>
                    <div className="pricesContainer">
                        <Price prices={business.products}/>
                    </div>
                    <div className="shippingContainer">
                        <Shipping policy={business.delivery_details} />
                    </div>
                    <Container sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        justifyItems: 'space-between'
                    }}>
                        <Box sx={{
                            width: '450px',
                            height: '230px',
                            marginBottom: '80px'
                        }}>
                            <Typography variant='h6'>תמונות של המקום:</Typography>
                            <Slider slides={business.farm_images_list} farm={true}/>
                        </Box>
                        <Box sx={{
                            width: '450px',
                            height: '230px',
                            marginBottom: '80px'
                        }}>
                            <Typography variant= 'h6'>תמונות של המוצרים:</Typography>
                            <Slider slides={business.products_images_list} farm={false} />
                        </Box>
                        <Typography  sx={{fontWeight: '600', fontSize: '30px',justifySelf: 'center', color: '#1d3c45'}}>מודעות שפורסמו</Typography>
                        <Box sx={{border: '5px solid #1d3c45',
                                direction: 'ltr', marginBottom: '30px'}}>
                                   { console.log(business.mail)}
                                <UserPosts width={480} height={420} email={business.mail}/>
                        </Box>
                    </Container>
                    <div className="social">
                        {!business.whatsapp ? null :
                            <Stack
                            direction= 'row'
                            alignItems= 'center'
                            ml={4}
                            gap= {1}>
                                <WhatsApp />
                                <Typography variants= 'body1' sx={{direction: 'ltr'}}>{business.whatsapp} </Typography>
                            </Stack>
                        }
                        {
                            !business.instagram ? null :
                            <Stack
                            direction= 'row'
                            alignItems= 'center'
                            ml={4}
                            gap= {1}>
                                <IconButton onClick={() => window.open(business.instagram, "_blank")}>
                                    <Instagram />
                                </IconButton>
                                {/* <Typography variants= 'body1'>{business.instagram}</Typography> */}
                            </Stack>
                        }
                        {!business.facebook ? null :
                            <Stack
                            direction= 'row'
                            alignItems= 'center'
                            gap= {1}
                            ml={4}>
                                <IconButton onClick={() => window.open(business.facebook,"_blank")}>
                                    <Facebook />
                                </IconButton>
                                {/* <Typography variants= 'body1'>{business.facebook}</Typography> */}
                            </Stack>
                        }
                        {!business.website ? null : 
                            <Stack
                            direction= 'row'
                            alignItems= 'center'
                            gap= {1}>
                                <IconButton onClick={() => window.open(business.farm_site,"_blank")}>
                                    <Language />
                                </IconButton>
                                {/* <Typography variants= 'body1'>{business.facebook}</Typography> */}
                        </Stack>
                        }
                    </div>
                    {/* <Stack direction= 'row' sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        direction: 'rtl',
                        mb: '40px',
                    }}>
                        <Typography display= 'flex' justifyContent= 'center'>מעוניינים לקבל עדכונים מהמשק לפני כולם? הירשמו לניוזלטר:</Typography>
                        <Box display= 'flex' justifyContent= 'center' width= '100%'>
                        <TextField id="standard-basic" placeholder='דוא"ל' variant="standard" direction= 'rtl' sx={{
                            direction:'rtl', width: '300px', ml: '20px'
                        }} />
                        <Button variant='contained'>הרשמה</Button>
                        </Box>
                    </Stack> */}
                </Box>
            </Box>
        </StyledModal>
    </div>
  )
}

