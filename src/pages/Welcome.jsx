import React, { useContext, useState, useEffect } from 'react'

import ClassesContext from './../context/classesContext';

//materialUI
import { Grid, Typography } from '@material-ui/core';
import { Container } from '@material-ui/core';
import LoginButton from './components/LoginButton';


const Welcome = ({ location }) => {
    const classes = useContext(ClassesContext);



    return (
        <Container className={classes.root} maxWidth="xl">

            <div className={classes.welcomeLoginBox}>
                <LoginButton />
            </div>

        </Container >
    );
}

export default Welcome;