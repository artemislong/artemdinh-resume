import React, { useState, useContext } from 'react';
import { GoogleLogin, useGoogleLogout } from 'react-google-login';
import ClassesContext from '../../context/classesContext';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// refresh token
// import { refreshTokenSetup } from './../../utils/refreshToken';
import { login } from '../../api/api';
import history from './../../utils/history';
import G_State from "g_state-management";
import { toast } from 'react-toastify';

let { user } = G_State.now

const clientId =
    '156693441252-2qou5n94e7q74c9r51uu88fnbo4c5afp.apps.googleusercontent.com';

function LoginDialog({ setLoggedIn }) {
    const classes = useContext(ClassesContext);

    const setUser = (userObj) => {
        user.change(userObj)
    };

    const onSuccess = async (res) => {
        console.log('Login Success: currentUser:', res.profileObj);


        try {
            console.log("data sent to server")
            const response = await login(res)
            const userData = response.data
            toast(
                `Logged in successfully, welcome ${userData.name}!`
            )
            console.log(userData)
            console.log("Gstate user before", user.object)
            setUser(userData)
            console.log("Gstate user after", user.object)
            handleLoggedIn()
        } catch (exception) {
            console.log(exception.response.status)
            if (exception.response.status === 404) {
                document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
                signOut();
                toast.error(
                    'You are not registered. Click "Become a Guru"!'
                )
            }
            else toast.error(
                'Login failed...'
            )
            history.push('')
            console.log("Server not responding")
        }
    };

    //logout if denied
    const { signOut } = useGoogleLogout({ clientId, cookiePolicy: "none" })

    const onFailure = (res) => {
        console.log('Login failed: res:', res);

        toast(
            `Failed to login. 😢 `
        );
    };


    const [open, setOpen] = React.useState(true);

    const handleCancel = () => {
        setOpen(false);
        history.push('')
    };
    const handleLoggedIn = () => {
        setLoggedIn(true)
        setOpen(false);
    };


    //begin execution
    if (user.object) { handleLoggedIn() }


    return (
        <Dialog open={open} aria-labelledby="form-dialog-title" >
            <DialogTitle id="form-dialog-title">Guru's zone</DialogTitle>
            <DialogContent>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <DialogContentText>
                        Gurus are the individuals that create guides to share their knowledge and experiences with users like you. If you already are our Guru, please sign in.
          </DialogContentText>
                    <GoogleLogin
                        clientId={clientId}
                        buttonText="Login"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'none'}

                    />
                    <DialogContentText style={{ marginTop: 20, marginBottom: 5 }}>
                        Not a Guru? Click below and tell us about you!
          </DialogContentText>
                    <Button variant="outlined" href="www.ligma.com" target="_blank" style={{ marginLeft: "auto", marginRight: "auto" }}>Become a Guru</Button>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    Cancel
          </Button>
            </DialogActions>
        </Dialog>

    );
}
export default LoginDialog;