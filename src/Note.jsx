import React, { useContext, useState, useEffect } from 'react'
import ClassesContext from './../context/classesContext';
//materialUI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { Avatar, Grid, Typography, Paper, CardHeader, Card, Divider, Chip, IconButton } from '@material-ui/core';
import { Container } from '@material-ui/core';
import LaunchIcon from '@material-ui/icons/Launch';
import content from './data'
import history from './../utils/history'
//image
import paper from './../images/paper.svg'
import WhatshotIcon from '@material-ui/icons/Whatshot';
import Truncate from 'react-truncate';

const data = {
    type: "challenge", date: "March 10, 2019", title: "Ligma balls joemamamamam", content: "Hitler once said joe mama, so he was kicked out of his art school. Then he developed his leadership skills and attacked Poland", img: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Hitler_portrait_crop.jpg"
}

const NoteCard = ({ data }) => {
    const colors = {
        milestone: "rgba(0, 84, 28, 0.8)",
        update: "rgba(35, 43, 43, 0.8)",
        challenge: "rgba(113, 0, 15, 0.8)"
    }


    return (
        <div style={{
            maxWidth: 700, margin: 10, position: "relative",
            backgroundImage: `url(${data.img})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover", borderRadius: 20, overflow: "hidden"

        }}>
            <div style={{ background: colors[data.type], paddingBottom: 70, paddingTop: 30, boxSizing: "border-box", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", color: "#FFF" }}>
                <div style={{ position: "absolute", top: 10, left: 0, padding: "0px 10px", color: "#d9d9d9" }}>
                    <Typography variant="body1" component="p">{data.type.toUpperCase()}<Typography variant="body1" component="span"> · {data.date}</Typography></Typography>
                </div>

                {data.img && <div style={{ border: "1.5px solid white", display: "flex", justifyContent: "center", alignItems: "flex-start", position: "relative", background: "#fff5f4", marginTop: 30, width: "100%", height: 200, overflow: "hidden", boxSizing: "border-box" }}>
                    <img src={data.img} style={{ width: "100%" }} />
                </div>}
                <div style={{ width: "90%", }}>
                    <Typography variant="h5" style={{ marginTop: 20, width: "95%", lineHeight: "1.1em", fontWeight: 600 }}>

                        {data.title}

                    </Typography>
                    <Typography variant="subtitle1" style={{ marginTop: 20, width: "95%", lineHeight: "1em" }}>

                        {data.content}

                    </Typography>
                </div>

                <div style={{ position: "absolute", bottom: 15, left: 15, }}>
                    <IconButton style={{ border: "1.5px solid #FFB347", color: "#FFB347", padding: 8 }}><WhatshotIcon /></IconButton>
                </div>
                <div style={{ position: "absolute", bottom: 15, right: 15, width: 40, height: 40, borderRadius: "50%", border: "1.5px solid white", color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography variant="h6" component="p">{data.index}</Typography>
                </div>
            </div>

        </div >
    )
}
const Note = ({ location }) => {
    const classes = useContext(ClassesContext);


    return (
        <div className={classes.root} >
            <NoteCard key={index} data={d} />
        </ div>
    );
}

export default Note;