import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { TextField, Button, Avatar, Link } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import './profilePage.css'; // Import the CSS file for styling
import { editProfileAsync, getCustomerDataAsync } from './profilePageSlicer';
import { useAppDispatch } from '../app/hooks';
import { getCustomerData } from './profilePageAPI';
import { log } from 'console';

const ProfilePage = () => {
  const [addresslabel, setAddresslabel] = useState('');
  const [citylabel, setCitylabel] = useState('');
  const [firstNamelabel, setFirstNamelabel] = useState('');
  const [lastNamelabel, setLastNamelabel] = useState('');
  const [emaillabel, setEmaillabel] = useState('');
  const [selectedImagelabel, setSelectedImagelabel] = useState<string | undefined>(undefined);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await dispatch(getCustomerDataAsync());
        const customerData = response.payload; // Access the payload property
  
        // Set the customer data as initial values for input fields
        setAddresslabel(customerData.address);
        setCitylabel(customerData.city);
        setFirstNamelabel(customerData.firstName);
        setLastNamelabel(customerData.lastName);
        setEmaillabel(customerData.email);
        setSelectedImagelabel("http://127.0.0.1:8000/" + customerData.image);
  
        // Set the selectedImage state
        if (customerData.image) {
          setSelectedImage("http://127.0.0.1:8000/" + customerData.image);
        }
      } catch (error) {
        console.log('Error fetching customer data:', error);
      }
    };
  
    fetchCustomerData();
  }, []);


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
    <div className="page-container">
      <div className="pagecard">
        <div className="profile-container">
          <h1>Profile Page</h1>
          <h4 style={{marginBottom:'40px',paddingLeft:'20px',paddingRight:'20px'}}>here you can edit your personal information please be careful when updating the email/password as they are essential for entering your account.</h4>
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="avatar-container">
              <Avatar src={selectedImage} alt="Profile Picture" sx={{ width: 200, height: 200 }} className="avatar" /> 
              {/* {`http://127.0.0.1:8000${selectedImagelabel}`}  */}
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
              <label htmlFor="first-name-input" style={{ margin: '-10px', paddingRight: '110px' }}>
                First Name:
              </label>
              <TextField
                id="first-name-input"
                label={firstNamelabel}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label htmlFor="last-name-input" style={{ margin: '-10px', paddingRight: '110px' }}>
                Last Name:
              </label>
              <TextField
                id="last-name-input"
                label={lastNamelabel}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="field-group">
              <label htmlFor="email-input" style={{ margin: '-10px', paddingRight: '148px' }}>
                Email:
              </label>
              <TextField
                id="email-input"
                label={emaillabel}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password-input" style={{ margin: '-10px', paddingRight: '118px' }}>
                Password:
              </label>
              <TextField
                id="password-input"
                label="*******"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="field-group">
              <label htmlFor="address-input" style={{ margin: '-10px', paddingRight: '130px' }}>
                Address:
              </label>
              <TextField
                id="address-input"
                label={addresslabel}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="field-group">
              <label htmlFor="city-input" style={{ margin: '-10px', paddingRight: '160px' }}>
                City:
              </label>
              <TextField id="city-input" label={citylabel} value={city} onChange={(e) => setCity(e.target.value)} />
            </div>

            <Button type="submit" variant="contained" color="primary" className="submit-button">
              Save Changes
            </Button>
            <Link href="/" variant="body2" style={{marginTop:"20px"}}>
                  Back to the shop page
                </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 

// fix edges of the screen when scolling 
