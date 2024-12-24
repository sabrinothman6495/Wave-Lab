import React from "react";
import '../App'
import { Button } from "@chakra-ui/react";


interface MainPage {
    title: string;
    logo: any;
    description: string;
}

const MainPage: React.FC = () => {
    const mainPage: MainPage = {
        title: 'Welcome to the Audio Waveform Generator',
        logo: 'https://via.placeholder.com/150',
        description: 'This is a simple audio waveform generator that allows you to upload an audio file and view its waveform.',
    };

    return (
        <div>
            <h1>{mainPage.title}</h1>
            <img src={mainPage.logo} alt='logo' />
            <p>{mainPage.description}</p>
            <a href='/createuser'>{mainPage.createuser}</a>
            <a href='/login'>{mainPage.login}</a>
            <Button mt="4" colorScheme="blue" size="sm">
                Create User
            </Button>
            <Button mt="4" colorScheme="blue" size="sm">
                Login
            </Button>
        </div>
    );
};

