import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';


export default function Dashboard() {
    const arr=[1,2,3,4,5,6]
  return (
    <Box sx={{marginTop:'20px',padding:'40px',display:'flex',flexWrap:'wrap',gap:'20px'}}>
        {arr?.map((e)=>{
            return(
                <Card sx={{ width:'330px',minHeight:'200px',cursor:'pointer' }}>
                <CardContent>
                  <Typography sx={{ fontSize: 18,fontWeight:'bold' }} color="text.secondary" gutterBottom>
                    Product
                  </Typography>
                  <Typography sx={{ fontSize: 16,lineHeight:'120px',fontWeight:'bold' }} color="text.secondary" gutterBottom>
                    20
                  </Typography>
           
                </CardContent>
              </Card>
            )
        })}
 
    </Box>
  );
}
