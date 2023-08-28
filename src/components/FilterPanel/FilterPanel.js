import React, {useState} from "react";
import { Box, Button, FormControlLabel, Slider, FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";

const FilterPanel = () => {
    const [val, setVal] = useState([0,500])
    //const [showAdvancedSearch, setshowAdvancedSearch] = useState(false);
    const updatePriceRange=(e,data)=>{
        setVal(data)
    }

    return (
        <div>
        <Box dir= 'rtl' display='flex' sx={{
            backgroundColor: '#ffffff',
            color: 'white',
            height: '500px',
            width: '250px',
            padding: '16px',
            position: "fixed",
            overflowY: 'auto',
            top: "50%",
            right: "20px",
            transform: "translateY(-50%)",
            borderRadius: "2%",
            border: '1px #f4ff81 solid',
            boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.2)",
            '&:hover': {
                boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.5)",
            },
            fontFamily: "aleph" 

            }}>

            <Box sx={{
                 position: "absolute",
                 right: 25,
                 fontFamily: "aleph",
                 color:'#212121',
                 fontSize: '20px' 
                }}
                 >מיון וסינון
            </Box>
            <Box sx={{
                 position: "absolute",
                 right: 25,
                 top: 50,
                 fontFamily: "aleph",
                 color:'#616161',
                 fontSize: '15px' 
                }}
                 >איזור בארץ
                 <Button variant='text' sx={{
                 position: "absolute",
                 right: -5,
                 top: 80,
                 fontFamily: "aleph",
                 color:'#616161',
                 fontSize: '12px' }}>
                    הצג איזורים נוספים +
                 </Button>
                <Box
                sx={{
                position: "absolute",
                top: "140%",
                left: -23,
                right: -5,
                border: "1px solid #eceff1",
                transform: "translateY(-50%)",
                zIndex: "-1",
                height: "0px",
                content: "''",
                }}
            />  
                 <div style={{fontSize: '14px', display: "flex", flexWrap: "wrap", paddingBlock: '6px'}}>  
                     <div style={{display: "inline-block"}}>
                         <input type="checkbox" id="north" name="north" />
                         <label htmlFor="checkbox1">צפון</label>
                     </div>
                     <div style={{display: "inline-block", marginInline: '50px'}}>
                         <input type="checkbox" id="center" name="center" />
                         <label htmlFor="checkbox2">מרכז</label>
                     </div>
                 </div>
                 <div style={{fontSize: '14px',display: "inline-block", paddingBlock: '6px'}}>
                     <input type="checkbox" id="south" name="south" />
                     <label htmlFor="checkbox3">דרום</label>
                 </div>
                 <div style={{fontSize: '14px',display: "inline-block",  marginInline: '46.5px'}}>
                     <input type="checkbox" id="allCountry" name="allCountry" onclick="" />
                     <label htmlFor="checkbox4">כל הארץ</label>
                 </div>
            </Box>
            <Box sx={{
                 position: "absolute",
                 right: 25,
                 top: 180,
                 fontFamily: "aleph",
                 color:'#616161',
                 fontSize: '15px' 
                }}
                 >סוג המוצר
                <Box
                sx={{
                position: "absolute",
                top: "110%",
                left: -10.5,
                right: -5,
                border: "1px solid #eceff1",
                transform: "translateY(-50%)",
                zIndex: "-1",
                height: "0px",
                content: "''",
                }}
            />
                <div style={{display: "flex", flexWrap: "wrap", paddingBlock: '6px'}}>  
                    <div style={{display: "inline-block"}}>
                        <input type="checkbox" id="vegtables" name="vegtables" />
                        <label htmlFor="checkbox1">ירקות</label>
                    </div>
                    <div style={{display: "inline-block", marginInline: '37.5px'}}>
                        <input type="checkbox" id="fruits" name="fruits" />
                        <label htmlFor="checkbox2">פירות</label>
                    </div>
                </div>
                <div style={{display: "flex", flexWrap: "wrap", paddingBlock: '6px'}}>  
                    <div style={{display: "inline-block"}}>
                        <input type="checkbox" id="vegtables" name="vegtables" />
                        <label htmlFor="checkbox1">פרחים</label>
                    </div>
                    <div style={{display: "inline-block", marginInline: '33px'}}>
                        <input type="checkbox" id="fruits" name="fruits" />
                        <label htmlFor="checkbox2">יין</label>
                    </div>
                </div>
                <div style={{display: "flex", flexWrap: "wrap", paddingBlock: '6px'}}>  
                    <div style={{display: "inline-block"}}>
                        <input type="checkbox" id="vegtables" name="vegtables" />
                        <label htmlFor="checkbox1">גבינות</label>
                    </div>
                    <div style={{display: "inline-block", marginInline: '34px'}}>
                        <input type="checkbox" id="fruits" name="fruits" />
                        <label htmlFor="checkbox2">כל המוצרים</label>
                    </div>
                </div>

            </Box>
            <Box sx={{
                 position: "absolute",
                 right: 25,
                 top: 323,
                 fontFamily: "aleph",
                 color:'#616161',
                 fontSize: '15px' 
                }}
                 >להציג עסקים עם משלוחים בלבד
            <Box
                sx={{
                position: "absolute",
                top: "110%",
                left: 32,
                right: -4,
                border: "1px solid #eceff1",
                transform: "translateY(-50%)",
                zIndex: "-1",
                height: "0px",
                content: "''",
                }}
            />
                 <FormControl >
                    <FormLabel >
                    </FormLabel >
                    <RadioGroup row name='delivery-group' aria-labelledby='delivery-group'>
                        <FormControlLabel control={<Radio size="small" color="primary"/>} label= {'כן'} value={1} sx={{fontFamily: "aleph"}}/>
                        <FormControlLabel control={<Radio size="small" color="primary"/>} label={'לא'} value={0}/>
                    </RadioGroup>
                 </FormControl>
            </Box>
            <Box sx={{
                 position: "absolute",
                 right: 25,
                 top: 394,
                 fontFamily: "aleph",
                 color:'#616161',
                 fontSize: '15px' 
                }}
                 >מחיר
                <Box
                sx={{
                position: "absolute",
                top: 90,
                left: -191.5,
                right: -5,
                border: "1px solid #eceff1",
                transform: "translateY(-50%)",
                zIndex: "-1",
                height: "0px",
                content: "''",
                }}
            />
                <Slider
                 color= "primary" value={val} onChange={updatePriceRange} valueLabelDisplay="auto" min={0} max={500} step={500 / (500 - 0)}
                 marks={[
                   { value: 0, label: '0' },
                   { value: 500, label: '500' },
                 ]}
                 style={{position: 'absolute', top: '310%', right: '0', transform: 'translateY(-50%)', width: '230px'}}>
                </Slider>
            </Box>
            <Button variant="text" sx={{
                 position: "absolute",
                 right: 20,
                 top: 490,
                 fontFamily: "aleph",
                 color:'#616161',
                 fontSize: '12px' 
                }}
                 >סינון מתקדם +
                 </Button>
        </Box>
        </div>

    )
}
export default FilterPanel;

/*
'&:hover': {
    backgroundColor: 'primary.light',
},
                <div style={{display: "inline-block"}}>
                    <input type="checkbox" id="flowers" name="flowers" />
                    <label htmlFor="checkbox3">פרחים</label>
                </div>
                <div style={{display: "inline-block"}}>
                    <input type="checkbox" id="wine" name="wine" />
                    <label htmlFor="checkbox4">יין</label>
                </div>
                <div style={{display: "inline-block"}}>
                    <input type="checkbox" id="cheese" name="cheese" />
                    <label htmlFor="checkbox3">גבינות</label>
                </div>
                <div style={{display: "inline-block"}}>
                    <input type="checkbox" id="allProducts" name="allProducts" onclick />
                    <label htmlFor="checkbox4">כל המוצרים</label>
                </div>*/