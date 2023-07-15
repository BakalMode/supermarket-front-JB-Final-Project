import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { getCustomerDataAsync } from './addressFromSlicer';
import { useAppDispatch } from '../app/hooks';


export default function AddressForm() {
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await dispatch(getCustomerDataAsync());
        const customerData = response.payload; // Access the payload property

        // Set the customer data as initial values for input fields
        setAddress(customerData.address);
        setCity(customerData.city);
        setFirstName(customerData.firstName);
        setLastName(customerData.lastName);
      } catch (error) {
        console.log('Error fetching customer data:', error);
      }
    };

    fetchCustomerData();
  }, []);
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleAddress2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress2(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  useEffect(() => {
    // Update session storage when form data changes
    const formData = {
      firstName,
      lastName,
      address,
      address2,
      city,
    };
    sessionStorage.setItem('formData', JSON.stringify(formData));
  }, [firstName, lastName, address, address2, city]);



  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={address}
            onChange={handleAddressChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
           autoComplete="shipping address-line2"
            variant="standard"
            onChange={handleAddress2Change}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value={city}
            onChange={handleCityChange}
          />
        </Grid>

      </Grid>
    </React.Fragment>
  );
}
