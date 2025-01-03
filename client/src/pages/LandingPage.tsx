import React from 'react';
import './LandingPage.css';
import { Button } from '@chakra-ui/react';

const LandingPage: React.FC = () => {
  return (
    <div>
      <div className="Title">
        <h1>WaveLab</h1>
      </div>
      <div className="Description">
        <p>WaveLab is a web application that allows users to create, edit, and share music. Users can create music by selecting from a variety of instruments and notes, and can edit their music by changing the tempo, volume, and pitch. WaveLab is a fun and easy way to create music online!</p>
      </div>
      <div className="Account">
        <p>In order to access this website, you must log in or create an account</p>
      </div>
      <div>
        <Button mt="4" colorScheme="blue" size="lg">LOG IN</Button>
        <Button mt="4" colorScheme="blue" size="lg">SIGN UP</Button>
      </div>
    </div>
  );
};

export default LandingPage;
