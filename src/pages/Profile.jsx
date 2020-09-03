import React, { useContext, useState, useEffect } from 'react'
import ClassesContext from './../context/classesContext';
//materialUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { Avatar, Grid, Typography, Paper, CardHeader, Card, Divider, Chip, IconButton } from '@material-ui/core';
import history from './../utils/history'
import backgroundImage from './../images/graduationHands.svg'
import WhatshotIcon from '@material-ui/icons/Whatshot';
import Truncate from 'react-truncate';
import VisibilityIcon from '@material-ui/icons/Visibility';
import LoginDialog from './components/LoginDialog';
import CourseCard from './components/CourseCard';
import Loading from './components/Loading';
import { getProfile, updateProfile } from './../api/api'
import { toast } from 'react-toastify';
import G_State from "g_state-management";
import { GoogleLogout } from 'react-google-login';
let { user } = G_State.now




const Profile = ({ match, myProfile = false }) => {
    const classes = useContext(ClassesContext);
    window.scrollTo(0, 0);

    const [loading, setLoading] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    const [editProfile, setEditProfile] = useState(false)
    const [profile, setProfile] = useState({
        id: undefined, name: "Naruto", guides: 0, views: 0, about: "I am Naruto!",
        img: "https://vignette.wikia.nocookie.net/shipping/images/3/36/Naruto_Uzumaki.png/revision/latest?cb=20160331152428",
        guides: [
            { id: 35345342, date: "March 10, 2019", title: "Teach a cat to wear mask!", content: "Look at this adorable cat wearing a mask. Then there is no reason for you not to wear it!", img: "https://images.theconversation.com/files/350865/original/file-20200803-24-50u91u.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop" }
        ]
    })

    const handleLoader = () => {
        setLoading(false);
    }

    useEffect(() => {
        const ligma = async (id) => {
            try {
                const response = await getProfile(id);
                console.log(response);
                const guide = response.data;
                console.log("responded profile", guide)
                setProfile(guide)
                setTimeout(handleLoader, 1000) //1s loading after getting data
            } catch (exception) {
                handleLoader();
                console.log(exception)
                toast.error(`😓 uhhh something went wrong`)
                history.push('')
                console.log("Server not responding or data unavailable", exception)
            }
        }
        if (myProfile) { if (user.object) { ligma(user.object.id) }; }//send request
        if (!myProfile) {
            const id = match.params.id;
            console.log(id)
            ligma(id); //send request
        }


    }, [loggedIn])

    const handleChangeProfile = (event, type) => {
        let newProfile = { ...profile, [`${type}`]: event.target.value }
        setProfile(newProfile);
    }

    const handleSaveProfile = async () => {
        try {
            const toPost = profile;
            const response = await updateProfile(toPost);
            console.log("updated profile", response)
            toast('Profile saved succesfully!')
            setEditProfile(false);
        } catch (exception) {
            console.log(exception)
            toast.error(`😓 uhhh something went wrong`)
            console.log("Updated profile failed", exception)
        }
    }

    const handleLogout = () => {
        user.change(undefined);
        history.push('')
        toast('Logged out succesfully. See you soon!')
    }

    const handleErrorLogout = () => {
        toast.error('Opps, something went wrong...')
    }

    console.log("currentUser", user.object)

    return (
        <div className={classes.root} >

            {/* header */}

            <Grid container style={{ paddingTop: 0, marginBottom: 30 }}>
                {/* left side */}
                < Grid item xs={12} lg={6} style={{ display: "flex", padding: 20, flexDirection: "column", justifyContent: "center" }}>

                    {!editProfile && <React.Fragment>
                        <Typography variant="h4" style={{ fontWeight: 600 }} gutterBottom >{profile.name}</Typography>
                        <Typography variant="body1" style={{ maxWidth: 500, marginBottom: 20 }}>{profile.about}</Typography>

                        <Typography color="primary" variant="h6" component="p"> Guides: <Typography variant="subtitle1" style={{ marginRight: 20 }} component="span">{profile.guides.length}</Typography>  </Typography>
                        {/* <Typography color="primary" variant="h6" component="p"> Guides: <Typography variant="subtitle1" style={{ marginRight: 20 }} component="span">{profile.guides.length}</Typography> Total views: <Typography variant="subtitle1" component="span">{profile.views}</Typography> </Typography> */}
                    </React.Fragment>}
                    {editProfile && <React.Fragment>
                        <TextField
                            id="name"
                            label="Profile name"
                            value={profile.name}
                            onChange={(event) => handleChangeProfile(event, 'name')}
                            variant="outlined"
                            size="small"
                            color="secondary"
                            style={{ marginTop: 20 }}
                            helperText="Think of a catchy name that would describe your course well"
                        />
                        <TextField
                            id="about"
                            label="About"
                            value={profile.about}
                            onChange={(event) => handleChangeProfile(event, 'about')}
                            variant="outlined"
                            size="small"
                            rows={4}
                            multiline
                            color="secondary"
                            style={{ marginTop: 30 }}
                            helperText="Tell your learners what this course is about and why they should learn it"
                        />
                        <TextField
                            id="image"
                            label="Image URL"
                            value={profile.img}
                            onChange={(event) => handleChangeProfile(event, 'img')}
                            variant="outlined"
                            size="small"
                            color="secondary"
                            style={{ marginTop: 30 }}
                            helperText="Paste a link of your image. You can use Pinterest, Imgur, Google Images,..."
                        />


                    </React.Fragment>}
                    <div style={{ marginTop: 20, display: "flex" }}>
                        {!editProfile && <Button variant='outlined' color='primary' onClick={() => setEditProfile(true)}>Edit Profile</Button>}
                        {editProfile && <Button variant='outlined' color='primary' onClick={() => handleSaveProfile()}>Save Profile</Button>}
                        <div style={{ marginLeft: 20 }}><GoogleLogout
                            clientId='156693441252-2qou5n94e7q74c9r51uu88fnbo4c5afp.apps.googleusercontent.com'
                            buttonText="Logout"
                            onLogoutSuccess={handleLogout}
                            onFailure={handleErrorLogout}
                        >
                        </GoogleLogout></div>
                    </div>
                </Grid>
                {/* right side */}
                <Grid item xs={12} lg={6} style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>

                    <img src={backgroundImage} style={{ height: "100%", minHeight: 400 }} />
                    <Avatar src={profile.img} style={{ width: 200, height: 200, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
                </Grid>
            </Grid >
            {!myProfile && <Typography variant="h5" align="center" color="primary">{profile.name}'s guides</Typography>}
            {myProfile && <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h5" align="center" color="primary">My guides</Typography>
                <Button variant="outlined" color="primary" style={{ margin: 10, height: 50 }} onClick={() => history.push('/editor/new')}>Create new</Button>
            </div>}


            <Divider style={{ margin: "20px 40px 40px 40px" }} />
            <div style={{ display: "flex", alignItems: 'center', justifyContent: "center", flexWrap: "wrap" }}>

                {profile.guides.map(d => {
                    let index = profile.guides.length - profile.guides.indexOf(d);
                    d.index = index;
                    return <CourseCard key={index} data={d} myProfile={myProfile} />
                })}


            </div >
            {!(user.object) && <LoginDialog setLoggedIn={setLoggedIn} />}
        </div >
    );
}

export default Profile;