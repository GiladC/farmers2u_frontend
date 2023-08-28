
import styled from '@emotion/styled'
import { Email, Facebook, Home, Instagram, Phone, WhatsApp } from '@mui/icons-material'
import { Box, Button, Container, Modal, Rating, Stack, TextField, Typography } from '@mui/material'
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

const days = {
    sunday: '08:00 - 17:00',
    monday: '08:00 - 17:00',
    tuesday: '08:00 - 17:00',
    wednesday: '08:00 - 17:00',
    thursday: '08:00 - 17:00',
    friday: 'סגור',
    saturday: 'סגור',
};

export default function BusinessCard({image, business, open, close}){
    // const [open, setOpen] = useState(false)

  return (
    <div>
        <StyledModal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        display= 'flex'
        >
            <Box width={900} height={400} bgcolor="white" p={3} sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'scroll', direction: 'ltr'
            }}>
                <Container sx={{display: 'grid', gridTemplateColumns: '1fr 0fr', direction: 'rtl'}}>
                    <Box>
                        <Box sx={{direction: 'rtl', flex: '7', paddingRight: '200px', justifyContent: 'center', alignContent: 'center'}}>
                            <h1>{business.name}</h1>
                            <div className="products">
                                <div className="products-wrapper">
                                    <div className="product-item">מלפפונים</div>
                                    <div className="product-item">עגבניות</div>
                                    <div className="product-item">גזרים</div>
                                    <div className="product-item">בצלים</div>
                                    <div className="product-item">חצילים</div>
                                </div>
                            </div>
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
                                <Typography variants= 'body1'>{business.phone}</Typography>
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
                        <Rating name="read-only" value={4} readOnly />
                        </Box>
                    </Box>
                </Container>
                <Box sx={{
                    direction: 'rtl',
                    fontSize: '15px',
                    position: 'relative',
                    width: '700px',
                    top: '30px'}}>
                    <Box> {business.about}</Box>
                    <div className="workContainer">
                        <Work days={days} />
                    </div>
                    <div className="pricesContainer">
                        <Price />
                    </div>
                    <div className="shippingContainer">
                        <Shipping />
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
                            width: '350px',
                            height: '200px',
                            marginBottom: '80px'
                        }}>
                            <Typography variant='h6'>תמונות של המקום:</Typography>
                            <Slider slides={slides} />
                        </Box>
                        <Box sx={{
                            width: '350px',
                            height: '200px',
                            marginBottom: '80px'
                        }}>
                            <Typography variant= 'h6'>תמונות של המוצרים:</Typography>
                            <Slider slides={slides} />
                        </Box>
                    </Container>
                    <div className="social">
                        <Stack
                        direction= 'row'
                        alignItems= 'center'
                        ml={4}
                        gap= {1}>
                            <WhatsApp />
                            <Typography variants= 'body1'>{business.whatsApp} </Typography>
                        </Stack>
                        <Stack
                        direction= 'row'
                        alignItems= 'center'
                        ml={4}
                        gap= {1}>
                            <Instagram />
                            <Typography variants= 'body1'>{business.instagram}</Typography>
                        </Stack>
                        <Stack
                            direction= 'row'
                            alignItems= 'center'
                            gap= {1}>
                                <Facebook />
                                <Typography variants= 'body1'>{business.facebook}</Typography>
                        </Stack>
                    </div>
                    <Stack direction= 'row' sx={{
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
                    </Stack>
                </Box>
            </Box>
        </StyledModal>
    </div>
  )
}

