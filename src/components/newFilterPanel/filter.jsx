import React, { useState } from 'react'
import './filter.css'
import { Button, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material'
import { CheckBox } from '@mui/icons-material'
import { green } from '@mui/material/colors'
import ReadMore from '../ReadMore/readMore'

const areas = [
  {
    id: 1,
    label:' צפון'
  },
  {
    id: 2,
    label:' מרכז'
  },
  {
    id: 3,
    label:' דרום'
  },
];

const extraAreas = [
  {
    id: 1,
    label:' אשדוד והסביבה'
  },
  {
    id: 2,
    label:'גבעת זאב, בית חורון והסביבה', 
  },
  {
    id: 3,
    label:'הרצליה פיתוח ונוף הים'
  },
  {
    id: 4,
    label:'הרצליה רחבי העיר',
  },
  {
    id: 5,
    label:'חולון, בת ים',
  },
  {
    id: 6,
    label:"חיפה וחוף הכרמל",
  },
  {
    id: 7,
    label:'חשמונאים מודיעין עילית והסביבה'
  },
  {
    id: 8,
    label:'יקנעם, טבעון והסביבה'
  },
  {
    id: 9,
    label: 'ירושלים והסביבה'
  },
  {
    id: 10,
    label:'כוכב יאיר,סלעית, גוש חורשים והסביבה',
  },
  {
    id: 11,
    label:'עמק חפר, חדרה, פרדס חנה ועד זיכרון יעקב',
  },
  {
    id: 12,
    label:'עפולה, כפר תבור והסביבה'
  },
  {
    id: 13,
    label:'צפון תל אביב ורמת השרון'
  },
  {
    id: 14,
    label:"קריות וצפונה"
  },
  {
    id: 15,
    label:'קריית אונו, יהוד, שוהם והסביבה'
  },
  {
    id: 16,
    label:'רמת גן, גבעתיים והסביבה'
  },
  {
    id: 17,
    label:'ראשון לציון, רחובות והסביבה'
  },
  {
    id: 18,
    label:'תל אביב מרכז + יפו',
  },
  {
    id: 19,
    label:'תל אביב - צפון ישן'
  },
];

const products = [
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
]

const extraProducts = [
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

const special = [
  {
    id: 1,
    label: 'אורגני'
  },
  {
    id: 2,
    label: 'טבעוני'
  },
]

const extraSpecial = [
  {
    id: 2,
    label: 'דבש טהור'
  },
  {
    id: 3,
    label: 'ביצי חופש'
  },
  {
    id: 4,
    label: 'גידול מקומי'
  },
  {
    id: 5,
    label: 'ארוז'
  },
  {
    id: 6,
    label: 'במבצע'
  },
]

const Filter = () => {

  return (
    <div>
        <div className="input-group">
            <p className="label">אזורים בארץ</p>
            <div className="areas">
            <FormGroup>
              {areas.map(a => (
                <FormControlLabel  key= {a.id} control={<Checkbox sx={{'&.Mui-checked':{color: "#E8AA42"}}} />} label={<Typography 
                  sx={{fontSize: '1rem'}}>{a.label}</Typography>}
                  sx={{
                    width:'100%',
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft:0,
                    direction: 'rtl'
                }} />
              ))}
            </FormGroup>
            <ReadMore label1= 'הצג אזורים נוספים' label2= 'הצג פחות' children={
              <FormGroup>
                  {extraAreas.map(a => (
                  <FormControlLabel  key= {a.id} control={<Checkbox sx={{'&.Mui-checked':{color: "#E8AA42"}}} />} label={<Typography 
                      sx={{fontSize: '1rem'}}>{a.label}</Typography>}
                      sx={{
                        width:'100%',
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft:0,
                        direction: 'rtl'
                    }} />
                  ))}
              </FormGroup>}
              />
            </div>
        </div>
        <div className="input-group">
            <p className="label">סוג המוצר</p>
            <FormGroup>
              {products.map(p => (
                <FormControlLabel  key= {p.id} control={<Checkbox sx={{'&.Mui-checked':{color: "#E8AA42"}}} />} label={<Typography 
                  sx={{fontSize: '1rem'}}>{p.label}</Typography>}
                  sx={{
                    width:'100%',
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft:0,
                    direction: 'rtl'
                }} />
              ))}
            </FormGroup>
            <ReadMore  label1= 'הצג סוגים נוספים' label2= 'הצג פחות' children={
              <FormGroup>
              {extraProducts.map(p => (
                <FormControlLabel  key= {p.id} control={<Checkbox sx={{'&.Mui-checked':{color: "#E8AA42"}}} />} label={<Typography 
                  sx={{fontSize: '1rem'}}>{p.label}</Typography>}
                  sx={{
                    width:'100%',
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft:0,
                    direction: 'rtl'
                }} />
              ))}
            </FormGroup>
            } />
        </div>
        <div className="input-group">
            <p className="label">מיוחדים</p>
            <FormGroup>
              {special.map(s => (
                <FormControlLabel  key= {s.id} control={<Checkbox sx={{'&.Mui-checked':{color: "#E8AA42"}}} />} label={<Typography 
                  sx={{fontSize: '1rem'}}>{s.label}</Typography>}
                  sx={{
                    width:'100%',
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft:0,
                    direction: 'rtl'
                }} />
              ))}
            </FormGroup>
            <ReadMore label1= 'הצג אופציות נוספות' label2= 'הצג פחות' children={
              <FormGroup>
              {extraSpecial.map(s => (
                <FormControlLabel  key= {s.id} control={<Checkbox sx={{'&.Mui-checked':{color: "#E8AA42"}}} />} label={<Typography 
                  sx={{fontSize: '1rem'}}>{s.label}</Typography>}
                  sx={{
                    width:'100%',
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft:0,
                    direction: 'rtl'
                }} />
              ))}
            </FormGroup>
            } />
        </div>
    </div>
  )
}

export default Filter