import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Avatar } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import './profilePage.css'; // Import the CSS file for styling
import { editProfileAsync } from './profilePageSlicer';
import { useAppDispatch } from '../app/hooks';

const ProfilePage = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const dispatch = useAppDispatch();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(undefined);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  
    const profileData = {
      address,
      city,
      firstName,
      lastName,
      email,
      password,
      selectedImage,
    };
  
    await dispatch(editProfileAsync({ profileData }));
  };

  return (
    <div className="profile-container">
      <h1>Mi pinche perfil</h1>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="avatar-container">
          <Avatar src={selectedImage} alt="Profile Picture" sx={{ width: 200, height: 200 }} className="avatar" />
          {selectedImage && (
            <Button variant="contained" onClick={handleRemoveImage}>
              Remove Image
            </Button>
          )}
        </div>

        <div className="image-upload-container">
          <input
            accept="image/*"
            id="image-upload"
            type="file"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <label htmlFor="image-upload">
            <Button variant="contained" component="span" startIcon={<PhotoCamera />}>
              Select Image
            </Button>
          </label>
        </div>

        <div className="field-group">
          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="field-group">
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <TextField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <TextField label="City" value={city} onChange={(e) => setCity(e.target.value)} />

        <Button type="submit" variant="contained" color="primary" className="submit-button">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default ProfilePage;
