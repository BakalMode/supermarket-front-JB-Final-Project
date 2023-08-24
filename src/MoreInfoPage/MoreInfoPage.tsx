import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { Card, CardContent, TextField, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { fetchProductFieldsAsync, purchasedBeforeAsync, submitReviewAsync } from './moreInfoSlicer';

export function MoreInfoPage() {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [reviews, setReviews] = useState([]);
  const [season, setSeason] = useState("");
  const [image, setImage] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [purchasedBefore, setPurchasedBefore] = useState(false); // New state for purchasedBefore

  useEffect(() => {
    const fetchData = async () => {
      if (productId) {
        const data = await dispatch(fetchProductFieldsAsync(productId));
        const productFields = data.payload.data;
        setCategory(productFields.category);
        setDescription(productFields.description);
        setName(productFields.name);
        setPrice(productFields.price);
        const parsedReviews = productFields.reviews ? JSON.parse(productFields.reviews) : [];
        setReviews(parsedReviews);
        setSeason(productFields.season);
        setImage(productFields.image);

  
        const purchasedPayload = await dispatch(purchasedBeforeAsync(productId));
        const purchased = purchasedPayload.payload.data


        if (typeof purchased === 'boolean') {
          setPurchasedBefore(purchased);
        } else {
          // Handle the error here, you can throw an error or handle it in any other way
          // For example, you can log the error or display an error message to the user
          console.error('Error: The value of "purchased" is not a boolean.');
        }
        

      }
    };

    fetchData();
  }, [dispatch, productId]);

  const handleReviewSubmit = () => {
    dispatch(submitReviewAsync({ productId, reviewText }));
    setReviewText(""); // Clear the review text input
  };

  return (
    <div style={{ backgroundColor: '#d4f1c5', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card style={{ minWidth: 300, maxWidth: 500 }}>
        <CardContent>
          <img src={"http://127.0.0.1:8000/" + image} alt="Product Image" className="product-image" />
          <div>
            <h1 style={{ textAlign: 'center' }}>{name}</h1>
            <p><strong>Category:</strong> {category}</p>
            <p><strong>Description:</strong> {description}</p>
            <p><strong>Price:</strong> ${price}</p>
            <p><strong>Season:</strong> {season}</p>
          </div>
          <div>
            <h2>Reviews</h2>
            {reviews.length > 0 ? (
              <ul>
                {reviews.map((review, index) => (
                  <li key={index}>{review}</li>
                ))}
              </ul>
            ) : (
              <p>No reviews available.</p>
            )}
          </div>
          {purchasedBefore && ( // Render the following section only if purchasedBefore is true
            <div>
              <h2>Write a Review</h2>
              <form>
                <TextField
                  label="Your Review"
                  multiline
                  rows={4}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
                <Button type="button" variant="contained" color="primary" fullWidth onClick={handleReviewSubmit}>
                  Submit Review
                </Button>
              </form>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
