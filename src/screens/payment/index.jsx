import React, { useState } from 'react';
import {
  FormControl, FormLabel, RadioGroup, FormControlLabel, Radio,
  TextField, Button, Box, Dialog, DialogTitle, DialogContent, Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
  const token = localStorage.getItem('token')
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiryDate: '', cvv: '' });
  const [paypalDetails, setPaypalDetails] = useState({ email: '' });
  const [upiDetails, setUpiDetails] = useState({ upiId: '' });
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const navigate = useNavigate()
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCardDetailsChange = (event) => {
    const { name, value } = event.target;
    setCardDetails(prevState => ({ ...prevState, [name]: value }));
  };

  const handlePaypalDetailsChange = (event) => {
    const { name, value } = event.target;
    setPaypalDetails(prevState => ({ ...prevState, [name]: value }));
  };

  const handleUpiDetailsChange = (event) => {
    const { name, value } = event.target;
    setUpiDetails(prevState => ({ ...prevState, [name]: value }));
  };

  async function createOrder() {
    await axios.post('http://127.0.0.1:5000/api/orders', {}, {
      headers: { Authorization: token }
    }).then((res) => {
      console.log(res.data.data);
    }).catch((e) => {
      console.log(e);
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    createOrder();
    setIsSuccessModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsSuccessModalOpen(false);
    navigate('/')
  };

  return (
    <Box style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend">Choose Payment Method</FormLabel>
        <RadioGroup value={paymentMethod} onChange={handlePaymentMethodChange}>
          <FormControlLabel value="card" control={<Radio />} label="Credit/Debit Card" />
          <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
          <FormControlLabel value="upi" control={<Radio />} label="UPI" />
        </RadioGroup>
      </FormControl>

      {paymentMethod === 'card' && (
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Card Number"
            name="cardNumber"
            value={cardDetails.cardNumber}
            onChange={handleCardDetailsChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Expiry Date"
            name="expiryDate"
            value={cardDetails.expiryDate}
            onChange={handleCardDetailsChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="CVV"
            name="cvv"
            value={cardDetails.cvv}
            onChange={handleCardDetailsChange}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
            Pay
          </Button>
        </form>
      )}

      {paymentMethod === 'paypal' && (
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="PayPal Email"
            name="email"
            value={paypalDetails.email}
            onChange={handlePaypalDetailsChange}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
            Pay
          </Button>
        </form>
      )}

      {paymentMethod === 'upi' && (
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="UPI ID"
            name="upiId"
            value={upiDetails.upiId}
            onChange={handleUpiDetailsChange}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
            Pay
          </Button>
        </form>
      )}

      <Dialog open={isSuccessModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Order Successful</DialogTitle>
        <DialogContent>
          <Typography>Your order has been placed successfully.</Typography>
        </DialogContent>
        <Button onClick={handleCloseModal} color="primary">
          Close
        </Button>
      </Dialog>
    </Box>
  );
};

export default Payment;