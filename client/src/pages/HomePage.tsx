// HomePage.tsx
import React from 'react';
import { Typography, Button, Grid, Container } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Container style={{ marginTop: '2rem' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to the Soundboard App
      </Typography>
      <Typography variant="h6" component="p" gutterBottom>
        Explore and interact with various soundboards for all your audio needs.
      </Typography>
      <Grid container spacing={3} style={{ marginTop: '1.5rem' }}>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => console.log('Navigating to soundboards...')}
          >
            Explore Soundboards
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => console.log('Navigating to create a soundboard...')}
          >
            Create a Soundboard
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
