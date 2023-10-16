import React, { useState } from 'react';
import { Typography, TextField, Button, Container, Grid } from '@mui/material';
// import '../../styles.css';
import api from '../../api';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';

const CreateUser = () => {

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success'); // 'success' or 'error'

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    switch (name) {
      case 'firstName':
      case 'lastName':
        newErrors[name] = value ? '' : 'This field is required.';
        break;
      case 'email':
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!value) {
          newErrors[name] = 'Email is required.';
        } else if (!emailRegex.test(value)) {
          newErrors[name] = 'Invalid email format.';
        } else {
          newErrors[name] = '';
        }
        break;
      case 'password':
        newErrors[name] = value.length >= 6 ? '' : 'Password must be at least 6 characters.';
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return newErrors[name];
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;
    let newErrors = { ...errors };

    for (let name in userData) {
      const error = validateField(name, userData[name]);
      if (error) {
        isValid = false;
        newErrors[name] = error;
      }
    }

    setErrors(newErrors);

    if (isValid) {
      api.post('users', userData)

      .then(() => {
     setAlertMessage('User created successfully!');
    setAlertSeverity('success');
    setOpenSnackbar(true);
    setTimeout(() => {
        navigate('/user/list');
    }, 2000); 
})
.catch((err) => {
    console.error('Error creating user:', err);
    setAlertMessage('An error occurred. Please try again.');
    setAlertSeverity('error');
    setOpenSnackbar(true);
});
  }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h2" gutterBottom>
        Create User
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="text"
              name="firstName"
              label="First Name"
              variant="outlined"
              value={userData.firstName}
              onChange={handleChange}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="text"
              name="lastName"
              label="Last Name"
              variant="outlined"
              value={userData.lastName}
              onChange={handleChange}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="email"
              name="email"
              label="Email"
              variant="outlined"
              value={userData.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="password"
              name="password"
              label="Password"
              variant="outlined"
              value={userData.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
          </Grid>
        </Grid>
        <br></br>
        <Button type="submit" variant="contained" color="primary">
          Create User
        </Button>
      </form>

      <Snackbar 
    open={openSnackbar} 
    autoHideDuration={6000} 
    onClose={() => setOpenSnackbar(false)}
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
>
    <Alert onClose={() => setOpenSnackbar(false)} severity={alertSeverity} sx={{ width: '100%' }}>
        {alertMessage}
    </Alert>
</Snackbar>


    </Container>
  );
};

export default CreateUser;
