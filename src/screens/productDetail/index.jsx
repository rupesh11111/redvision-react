import { Box } from '@mui/material'
import React from 'react'
const ProductDetail =()=>{
    return(
        <Box sx={{width:'100%',height:'80vh',display:'flex',alignItems:'center',justifyContent:'center'}}>

            <Box sx={{width:'70%',height:'60%',border:'2px solid red',display:'flex',gap:'10px',alignItems:'center',justifyContent:'space-between'}}>
                <Box sx={{width:'60%',height:'100%',border:'1px solid green'}}></Box>
                <Box sx={{width:'35%',height:'100%',border:'1px solid green'}}></Box>
            </Box>
        </Box>
    )
}
export default ProductDetail