import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { Avatar, Link, Card, CardContent } from '@mui/material';
import { useParams } from 'react-router-dom';
import { fetchProductFields } from './moreInfoPageAPI';
import { fetchProductFieldsAsync } from './moreInfoSlicer';

export function MoreInfoPage() {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [season, setSeason] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (productId) {
        const data = await dispatch(fetchProductFieldsAsync(productId));
        const productFields = data.payload.data;
        setCategory(productFields.category);
        setDescription(productFields.description);
        setName(productFields.name);
        setPrice(productFields.price);
        setRating(productFields.rating);
        setSeason(productFields.season);
        setImage(productFields.image);
      }
    };

    fetchData();
  }, [dispatch, productId]);

  return (
    <div style={{ backgroundColor: '#d4f1c5', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card style={{ minWidth: 300, maxWidth: 500 }}>
        <CardContent>
        <img src={"http://127.0.0.1:8000/" +image} alt="Product Image" className="product-image" />
          <div>
            <h1 style={{ textAlign: 'center' }}>{name}</h1>
            <p><strong>Category:</strong> {category}</p>
            <p><strong>Description:</strong> {description}</p>
            <p><strong>Price:</strong> {price}</p>
            <p><strong>Rating:</strong> {rating}</p>
            <p><strong>Season:</strong> {season}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
