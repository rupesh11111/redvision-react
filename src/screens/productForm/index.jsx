import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductForm = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setInput({
      ...input,
      [name]: files[0],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (const key in input) {
      formData.append(key, input[key]);
    }

    const token = localStorage.getItem("token");
    axios
      .post("https://redvision-node.onrender.com/api/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("There was an error creating the product!", error);
      });
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
        <h1>Add Product</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                sx={{ textAlign: "left", lineHeight: "45px", fontWeight: "700" }}
              >
                Product Name
              </Typography>
              <TextField
                label="name"
                name="name"
                value={input?.name}
                onChange={handleChange}
                required
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                sx={{ textAlign: "left", lineHeight: "45px", fontWeight: "700" }}
              >
                Price
              </Typography>
              <TextField
                label="Product Price"
                name="price"
                value={input?.price}
                onChange={handleChange}
                type="number"
                required
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                sx={{ textAlign: "left", lineHeight: "45px", fontWeight: "700" }}
              >
                Category
              </Typography>
              <TextField
                label="Category"
                name="category"
                value={input?.category}
                onChange={handleChange}
                required
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                sx={{ textAlign: "left", lineHeight: "45px", fontWeight: "700" }}
              >
                Stock
              </Typography>
              <TextField
                label="Stock"
                name="stock"
                value={input?.stock}
                onChange={handleChange}
                type="number"
                required
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                sx={{ textAlign: "left", lineHeight: "45px", fontWeight: "700" }}
              >
                Image
              </Typography>
              <TextField
                label="Image"
                name="image"
                onChange={handleFileChange}
                type="file"
                required
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                sx={{ textAlign: "left", lineHeight: "45px", fontWeight: "700" }}
              >
                Description
              </Typography>
              <TextField
                label="Description"
                name="description"
                onChange={handleChange}
                type="text"
                required
                sx={{ width: "100%" }}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            type="submit"
            sx={{ marginTop: "20px", width: "100%" }}
          >
            Create
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ProductForm;
