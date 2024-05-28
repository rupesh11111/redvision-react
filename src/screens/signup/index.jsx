import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [input, setInput] = useState({
    username: "",
    mobile: "",
    email: "",
    password: "",
  });
  const Navigate=useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if(input.username === '' || input.mobile === '' || input.email === '' || input.password === ''){
        alert("plz fill credentials")
    }else{
        console.log("Submitted form data:", input);
        Navigate('/signin')
    }
   
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
        <h1>Sign Up</h1>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              sx={{ textAlign: "left", lineHeight: "45px", fontWeight: "700" }}
            >
              Username
            </Typography>
            <TextField
              label="Username"
              name="username"
              value={input?.username}
              onChange={handleChange}
              required
              sx={{ width: "100%" }} // Full width on all screens
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ textAlign: "left", lineHeight: "45px", fontWeight: "700" }}
            >
              Mobile
            </Typography>
            <TextField
              label="Mobile Number"
              name="mobile"
              value={input?.mobile}
              onChange={handleChange}
              type="tel"
              pattern="[0-9]{10}"
              required
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ textAlign: "left", lineHeight: "45px", fontWeight: "700" }}
            >
              Email
            </Typography>
            <TextField
              label="Email Address"
              name="email"
              value={input?.email}
              onChange={handleChange}
              type="email"
              required
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ textAlign: "left", lineHeight: "45px", fontWeight: "700" }}
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
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ marginTop: "20px",width:'100%' }}
        >
          Sign Up
        </Button>
        <Box sx={{ display: "flex", marginTop: "20px", gap: "2px" }}>
          <Typography sx={{ textAlign: "left", lineHeight: "50px" }}>
            If you are already User?
          </Typography>
          <Typography
            sx={{
              textAlign: "left",
              lineHeight: "50px",
              color: "#1876d1",
              cursor: "pointer",
            }}
            onClick={()=>Navigate("/signin")}
          >
            Sign In
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
