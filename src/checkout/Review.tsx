import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CreateOrderActions, CreateOrderData, OnApproveData, OnApproveActions } from "@paypal/paypal-js";
import { useAppDispatch } from '../app/hooks';
import { GetTotalAsync, PurchaseDetailsAsync } from './reviewSlicer';

export default function Review() {
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  const dispatch = useAppDispatch();
  const formData = JSON.parse(sessionStorage.getItem('formData') || '{}');
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const fetchTotal = async () => {
      const action = await dispatch(GetTotalAsync());
      const total = action.payload.total_cost; // Extract the total value from the payload
      setTotal(total);
    };

    // Check if the address and city fields are empty and redirect if necessary
    const isAddressAndCityEmpty = formData.address.trim() === '' || formData.city.trim() === '';
    if (isAddressAndCityEmpty) {
      alert("Please fill address and city fields");
      window.location.href = "/checkout";
      return; // Exit the function early if redirecting
    }

    fetchTotal();
  }, [dispatch, formData]);

  const createOrder = (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
    // Check if the total is zero or negative
    if (total <= 0) {
      // Refetch the total asynchronously to avoid any possible race conditions
      return dispatch(GetTotalAsync()).then((action) => {
        const newTotal = action.payload.total_cost;
        if (newTotal <= 0) {
          alert("Total cannot be zero or negative. Please try again later.");
          throw new Error("Invalid total");
        }
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: newTotal.toFixed(2),
              },
            },
          ],
        });
      });
    }

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total.toFixed(2),
          },
        },
      ],
    });
  };

  const onApprove = (data: OnApproveData, actions: OnApproveActions): Promise<void> => {
    const details = { cartItems, formData };
    return actions.order!.capture().then(function () {
      dispatch(PurchaseDetailsAsync(details));
      alert(`Thank you for your order`);
      localStorage.setItem('cart', '[]');
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cartItems.map((item: any) => (
          <ListItem key={item.product.id} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={`${item.product.name} x ${item.quantity}`}
              secondary={item.product.desc}
            />
            <Typography variant="body2">
              {`$${(item.product.price * item.quantity).toFixed(2)}`}
            </Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {`$${total.toFixed(2)}`}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Delivery details
          </Typography>
          <Typography gutterBottom>
            Full name: {formData.firstName} {formData.lastName}
          </Typography>
          <Typography gutterBottom>Address: {formData.address}</Typography>
          <Typography gutterBottom>Second address: {formData.address2}</Typography>
          <Typography gutterBottom>City: {formData.city}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <PayPalScriptProvider options={{ clientId: "AYXCphjQQWP-wFWpG68KX5aMfJ2QRIrFPfLb-7k1RXxl8ZROYIi5vgf2YWlIeLItW0Z6K6WIhNvJGW0e" }}>
            <PayPalButtons onError={err => console.log(err)} createOrder={createOrder} onApprove={onApprove} />
          </PayPalScriptProvider>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
