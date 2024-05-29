import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const SignIn = ({setToken}) => {
  const [input, setInput] = useState({ email: '', password: '' });
  const Navigate = useNavigate()


  const handleChange = (event) => {
    const { name, value } = event.target;

    setInput({
      ...input,
      [name]: value
    })
  }

  const handleSubmit = () => {
    axios.post('http://15.206.92.112/api/login', input).then((res) => {
      localStorage.setItem('token',res?.data?.data?.token);
      localStorage.setItem('user',JSON.stringify(res?.data?.data?.user));
      setToken(res?.data?.data?.token)
      Navigate('/');
    }).catch((error) => {
      console.log(error)
    });
  };
  
  return (
    <Box
      sx={{
        height: '90vh',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'center',
        padding: "20px",
      }}
    >
      <Box
        boxShadow={4}
        p={2}
        bgcolor="background.paper"
        sx={{
          width: { xs: "100%", sm: "70%", md: "50%", lg: "40%", xl: "30%" },
        }}
      >
        <h1>Sign In</h1>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              sx={{ textAlign: "left", lineHeight: "50px", fontWeight: "700" }}
            >
              Email
            </Typography>
            <TextField
              label="Email"
              name="email"
              value={input?.email}
              onChange={handleChange}
              required
              sx={{ width: "100%" }} // Full width on all screens
            />
          </Grid>

          <Grid item xs={12}>
            <Typography
              sx={{ textAlign: "left", lineHeight: "50px", fontWeight: "700" }}
            >
              Password
            </Typography>
            <TextField
              label="Password"
              name="password"
              value={input?.password}
              onChange={handleChange}
              type="password"
              minLength={8}
              required
              sx={{ width: "100%" }}
            />
          </Grid>
        </Grid>
        <Button variant="contained" onClick={handleSubmit} sx={{ marginTop: "20px" }}>
          Sign In
        </Button>
        <Box sx={{ display: 'flex', marginTop: '20px', gap: '2px' }}>
          <Typography
            sx={{ textAlign: "left", lineHeight: "50px", }}
          >
            If you are not register ?
          </Typography>
          <Typography
            sx={{ textAlign: "left", lineHeight: "50px", color: '#1876d1', cursor: 'pointer' }}
            onClick={() => Navigate("/signup")}
          >
            Register
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
