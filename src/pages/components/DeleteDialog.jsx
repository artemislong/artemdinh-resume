import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DeleteDialog({ setDeleteBite, open, handleConfirmedDelete }) {

    const handleClose = () => {
        setDeleteBite(false);
    };

    const confirmDelete = () => {
        setDeleteBite(false);
        handleConfirmedDelete();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Think twice before deleting this bite!"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this bite? It will be gone forever!
          </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    No, go back
          </Button>
                <Button onClick={confirmDelete} color="primary" autoFocus>
                    Yes, delete
          </Button>
            </DialogActions>
        </Dialog>
    );
}