import React, { useContext, useState, useEffect } from 'react'
import ClassesContext from './../../context/classesContext';
//materialUI
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import { Avatar, Grid, Typography, Paper, CardHeader, Card, Divider, Chip, IconButton } from '@material-ui/core';
import { Container } from '@material-ui/core';
import LaunchIcon from '@material-ui/icons/Launch';
import history from './../../utils/history'
import teaching from './../../images/onlineTeaching.svg'
import WhatshotIcon from '@material-ui/icons/Whatshot';
import Truncate from 'react-truncate';
import VisibilityIcon from '@material-ui/icons/Visibility';


const CourseCard = ({ data, myProfile = false }) => {
    const classes = useContext(ClassesContext);
    const colors = {
        //dark
        // milestone: "rgba(0, 84, 28, 0.8)",
        // update: "rgba(35, 43, 43, 0.8)",
        // challenge: "rgba(113, 0, 15, 0.8)"
        //pastel
        milestone: "rgba(158, 224, 158, 0.8)",
        update: "rgba(56,62,86, 0.8)",
        challenge: "rgba(255, 102, 99, 0.8)"
    }
    console.log("data piece", data)

    return (
        <div className={classes.guideCard} style={{ height: (data.img) ? 500 : 250, }}>
            { data.img && <div className={classes.guideCardBackgroundImage} style={{
                backgroundImage: `url(${data.img})`,
            }} />}
            <div style={{ background: colors["update"], }} className={classes.guideCardContent}>
                <Typography variant="body1" component="p" style={{ margin: "15px 0px", width: "90%" }}>
                    <Link style={{ fontWeight: 600, color: "white", cursor: "pointer" }} onClick={() => history.push(`/profile/${data.authorId}`)}> {data.authorName} </Link> · {data.date}</Typography>
                {data.img && <div className={classes.guideCardImage}>
                    <img src={data.img} style={{ height: "100%" }} />
                </div>}
                <div style={{ width: "90%", }}>
                    <Typography variant="h5" style={{ marginTop: 20, width: "95%", lineHeight: "1.1em" }}>
                        <Truncate lines={2} ellipsis={<span>...</span>}>
                            {data.title}
                        </Truncate>
                    </Typography>
                    <Typography variant="subtitle1" style={{ marginTop: 20, width: "95%", lineHeight: "1em" }}>
                        <Truncate lines={3} ellipsis={<span>...</span>}>
                            {data.description}
                        </Truncate>
                    </Typography>
                </div>

                {!myProfile && <Button onClick={() => history.push(`/guide/${data._id}`)} variant="outlined" color="secondary" style={{ position: "absolute", bottom: 15, left: 15, }}>
                    Start now
                    </ Button>}
                {myProfile && <Button onClick={() => history.push(`/editor/${data._id}`)} variant="outlined" color="secondary" style={{ position: "absolute", bottom: 15, left: 15, }}>
                    Update now
                    </ Button>}

                {/* <div style={{ position: "absolute", bottom: 15, right: 15, color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <VisibilityIcon style={{ marginRight: 10 }} /> <Typography variant="subtitle1">59</Typography>
                </div> */}
            </div>

        </div >
    )
}

export default CourseCard;