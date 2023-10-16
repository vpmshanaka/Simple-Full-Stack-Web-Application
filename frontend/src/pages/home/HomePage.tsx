import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

type Props = {};

const HomePage = (props: Props) => {
  return (
    <Container>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Paper elevation={3}>
          <Box p={4}>
            <Typography variant="h2" align="center" gutterBottom>
              Dashboard
            </Typography>
            <Typography variant="body1" align="center">
              Welcome to the main control center. Navigate through to manage and oversee your operations.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default HomePage;
