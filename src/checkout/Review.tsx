import React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CreateOrderActions, CreateOrderData, OnApproveData, OnApproveActions } from "@paypal/paypal-js";
import { useAppDispatch } from '../app/hooks';
import { PurchaseDetailsAsync } from './reviewSlicer';

export default function Review() {
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  const dispatch = useAppDispatch();

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item: any) => {
      total += item.product.price * item.quantity;
    });
    return total.toFixed(2);
  };

  const total = parseFloat(calculateTotal());

  const createOrder = (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
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
    const details = { cartItems }; // Remove formData if not needed
    return actions.order!.capture().then(function () {
      dispatch(PurchaseDetailsAsync(details));
      alert(`Thank you for your order`);

      localStorage.setItem('cart', '[]');

      setTimeout(() => {
        window.location.href = "/";
      }, 5000);
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
          {/* Existing code */}
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
