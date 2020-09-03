import React, { useContext } from 'react'
import ClassesContext from '../../context/classesContext';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import NavMenu from './NavMenu';


export default function BottomNav() {
    const classes = useContext(ClassesContext);


    return (
        <AppBar position="fixed" color="primary" className={classes.bottomBar}>
            <Toolbar className={classes.toolbar}>
                <NavMenu />
            </Toolbar>
        </AppBar>
    );
}