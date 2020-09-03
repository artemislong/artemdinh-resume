import React, { useContext } from 'react'
import ClassesContext from '../../context/classesContext';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Zoom from '@material-ui/core/Zoom';
import { Typography } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom direction="up" ref={ref} {...props} />;
});

export default function AlertDialog({ closeAlert, content }) {
    const classes = useContext(ClassesContext);
    const { title, description, deny, confirm, denyAction, confirmAction } = content;

    return (
        <Dialog
            open={true}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => denyAction()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Typography variant="body1" align="justify" component="span">{description}</Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => denyAction()} color="primary">
                    {deny}
                </Button>
                <Button onClick={() => confirmAction(false)} color="primary">
                    {confirm}
                </Button>
            </DialogActions>
        </Dialog>
    );
}