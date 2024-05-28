import { Box } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from '@mui/material/CardMedia';
const ProductList = () => {
  const arr = [1, 2, 3, 4, 5, 6];
  return (
    <Box
      sx={{
        marginTop: "20px",
        padding: "40px",
        display: "flex",
        flexWrap: "wrap",
        gap: "40px",
      }}
    >
      {arr?.map((e) => {
        return (
          <Card sx={{ width: "300px", minHeight: "200px", cursor: "pointer" }}>
            <CardContent>
              <CardMedia
                component="img"
                height="194"
                image="data:image/jpeg;base64,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"
                alt="Paella dish"
              />
              <Typography
                sx={{ fontSize: 16, lineHeight: "50px", fontWeight: "bold",textAlign:'left' }}
                color="text.secondary"
                gutterBottom
              >
                Title
              </Typography>
              <Typography
                sx={{ fontSize: 13, lineHeight: "10px",textAlign:'left' }}
                color="text.secondary"
                gutterBottom
              >
                description
              </Typography>
              <Typography
                sx={{ fontSize: 16, lineHeight: "50px", fontWeight: "bold",textAlign:'left' }}
                color="text.secondary"
                gutterBottom
              >
                Rs 100 /-
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};
export default ProductList;
