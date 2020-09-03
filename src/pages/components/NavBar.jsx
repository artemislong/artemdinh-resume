import React, { useContext, useState } from 'react'
import ClassesContext from '../../context/classesContext';
import history from './../../utils/history';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';


export default function NavBar() {
    const classes = useContext(ClassesContext);


    return (
        <div className={classes.appBar}>
            <AppBar style={{ position: "absolute" }}>
                <Toolbar className={classes.toolbar}>
                    <Typography className={classes.title} onClick={() => history.push('')} variant="h6" >
                        BiteGuide
                    </Typography>
                    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                        <Button variant="outlined" color="secondary" style={{ margin: 10, height: 40 }} onClick={() => history.push('')}>All guides</Button>
                        <Button title="create a guide" variant="outlined" color="secondary" style={{ margin: 10, height: 40 }} onClick={() => history.push('/editor/new')}>Create</Button>
                        <IconButton title="My profile" color="secondary" style={{ margin: 10 }} onClick={() => history.push('/profile')}><AccountCircleIcon /></IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div >
    );
}