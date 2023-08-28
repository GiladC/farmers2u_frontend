import { Button } from '@mui/material'
import { green } from '@mui/material/colors'
import React, { useState } from 'react'

const ReadMore = ({children, label1, label2}) => {
    const [isReadMoreShown, setReadMore] = useState(false)
    const toggleBtn = () => {
        setReadMore(prevState => !prevState)
    }
  return (
    <div className='read-more-read-less'>
        {isReadMoreShown ? children : null}
        <Button className='more-areas-btn' onClick={toggleBtn} sx={{color: "#1d3c45", fontSize: '1rem', fontWeight:"bold" ,
            direction: 'rtl', ml: '50%'}}>{isReadMoreShown ? label2 : label1}</Button>
    </div>
  )
}

export default ReadMore