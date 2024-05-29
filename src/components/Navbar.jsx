import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ cart, setDrawerOpen , setToken , token }) => {

  const navigate = useNavigate()
  let authUser = localStorage.getItem('user') || "{}"
  authUser = (authUser == undefined) ? "{}" : authUser;
  authUser = JSON.parse(authUser)

  const clickHandle = () => {
      if(token) {
        localStorage.setItem('token',"")
        localStorage.setItem('user',"{}")
        setToken("")
      }
      navigate('/signin')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RedVision
          </Typography>
          {token ?<div>
           <Button color="inherit" onClick={ clickHandle }> {token ? "Logout" : "Login"} </Button>
           {authUser != 'admin' || <Button color="inherit" onClick={ () => navigate('./cart') }>Cart({(cart?.products)?.length})</Button>}
          </div>: <div></div>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Navbar