import React, { useState, useEffect, ChangeEvent } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export default function PaymentForm() {
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardType, setCardType] = useState('');

  useEffect(() => {
    sessionStorage.setItem(
      'CCI',
      JSON.stringify({ cardName, cardNumber, expDate, cvv, cardType })
    );
  }, [cardName, cardNumber, expDate, cvv, cardType]);

  const handleCardNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCardName(event.target.value);
  };

  const handleCardNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCardNumber(event.target.value);
  };

  const handleExpDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setExpDate(event.target.value);
  };

  const handleCvvChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCvv(event.target.value);
  };

  const handleCardTypeChange = (event: ChangeEvent<{ value: unknown }>) => {
    setCardType(event.target.value as string);
  };

  React.useEffect(() => { // this use effect is for security reasons
    window.onbeforeunload = () => {
      sessionStorage.setItem('CCI', '{}');
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            value={cardName}
            onChange={handleCardNameChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            value={cardNumber}
            onChange={handleCardNumberChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            value={expDate}
            onChange={handleExpDateChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            value={cvv}
            onChange={handleCvvChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="cardType"
            select
            label="Card type"
            fullWidth
            variant="standard"
            value={cardType}
            onChange={handleCardTypeChange}
          >
            <option value="visa">Visa</option>
            <option value="mastercard">Mastercard</option>
            <option value="amex">American Express</option>
          </TextField>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
