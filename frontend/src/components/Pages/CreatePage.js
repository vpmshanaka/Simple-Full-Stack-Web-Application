import React, { useState } from 'react';
import { Typography, TextField, Button, Container, Grid } from '@mui/material';
import api from '../../api';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';

const CreatePage = () => {
    const [pageData, setPageData] = useState({
        title: '',
        content: '',
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
    });

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errors, setErrors] = useState({});
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPageData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let newErrors = { ...errors };

        switch (name) {
            case 'title':
            case 'content':
                newErrors[name] = value ? '' : 'This field is required.';
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

        for (let name in pageData) {
            const error = validateField(name, pageData[name]);
            if (error) {
                isValid = false;
                newErrors[name] = error;
            }
        }

        setErrors(newErrors);

        if (isValid) {
            api.post('pages', pageData)
                .then(() => {
                    setAlertMessage('Page created successfully!');
                    setAlertSeverity('success');
                    setOpenSnackbar(true);
                    setTimeout(() => {
                        navigate('/page/list');
                    }, 2000);
                })
                .catch((err) => {
                    console.error('Error creating page:', err);
                    setAlertMessage('An error occurred. Please try again.');
                    setAlertSeverity('error');
                    setOpenSnackbar(true);
                });
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h2" gutterBottom>
                Create Page
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="text"
                            name="title"
                            label="Title"
                            variant="outlined"
                            value={pageData.title}
                            onChange={handleChange}
                            error={Boolean(errors.title)}
                            helperText={errors.title}
                        />
                    </Grid>
                  
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            name="content"
                            label="Content"
                            variant="outlined"
                            value={pageData.content}
                            onChange={handleChange}
                            error={Boolean(errors.content)}
                            helperText={errors.content}
                        />
                    </Grid>
                </Grid>
                <br />
                <Button type="submit" variant="contained" color="primary">
                    Create Page
                </Button>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity={alertSeverity}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default CreatePage;
