import React, { useContext, useState, useRef, useEffect } from 'react'
import ClassesContext from './../context/classesContext';
import { toast } from 'react-toastify';
//materialUI

import { Grid, Typography, Divider, Link } from '@material-ui/core';
import history from './../utils/history'

import Loading from './components/Loading';
import { getGuide } from './../api/api'
import { StickyContainer, Sticky } from 'react-sticky';
import ReactHtmlParser from 'react-html-parser';
//component
import BitesList from './components/BitesList';

const sample = {
    title: "Everything about cats", authorName: "Cat_Lover", authorId: "0000", description: "Who doesn't love cats? Let's learn more how to be friends with them!", date: "March 30, 2020",
    requirements: "You need a big heart", img: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg",
    bites: [{
        title: "Orientation", description: "Welcome to my guide!", content: "<h2> Cats are friends </h2>"
    },
    {
        title: "First bite", description: "Catssss", content: "<h2> My cat </h2>"
    },
    ]
}


const Course = ({ match }) => {
    const classes = useContext(ClassesContext);

    const [loading, setLoading] = useState(true)
    const [currentGuide, setGuide] = useState(sample)
    const [selectedBite, setSelectedBite] = React.useState(sample.bites[0]);

    //custom hook to ignore first render
    const useDidMountEffect = (func, deps) => {
        const didMount = useRef(false);

        useEffect(() => {
            if (didMount.current) func();
            else didMount.current = true;
        }, deps);
    }


    const handleLoader = () => {
        setLoading(false);
    }

    useEffect(() => {
        const ligma = async (id) => {
            try {
                const response = await getGuide(id);
                console.log(response);
                const guide = response.data;
                console.log("responded guide", guide)
                setGuide(guide)
                window.scrollTo(0, 0);
                setTimeout(handleLoader, 1000) //1s loading after getting data
            } catch (exception) {
                handleLoader();
                console.log(exception)
                toast.error(`😓 uhhh something went wrong`)
                history.push('')
                console.log("Server not responding or data unavailable", exception)
            }
        }

        const id = match.params.id;
        console.log(id)
        ligma(id); //send request

    }, [])

    //set bite after getting the general guide

    useDidMountEffect(() => {
        setSelectedBite(currentGuide.bites[0])
    }, [currentGuide]);


    return (
        <div className={classes.root} >
            <React.Fragment>
                {/* header */}
                <Grid container style={{ paddingTop: 30 }}>
                    {/* left side */}
                    < Grid item xs={12} lg={6} style={{ display: "flex", padding: 20, flexDirection: "column", justifyContent: "center" }}>


                        <Typography variant="h4" style={{ fontWeight: 600 }} component="p" gutterBottom >{currentGuide.title} <Typography variant="subtitle1" component="span">by
                        <Link style={{ cursor: "pointer" }} onClick={() => history.push(`/profile/${currentGuide.authorId}`)}> {currentGuide.authorName} </Link>
                        </Typography></Typography>
                        <Typography variant="subtitle1" gutterBottom style={{ maxWidth: 500 }}> {currentGuide.description} </Typography>
                        <Typography variant="subtitle1" gutterBottom component="p" style={{ lineHeight: "1.4em" }}><Typography variant="subtitle1" component="span" style={{ fontWeight: 600, lineHeight: "1.4em" }}>You will need: </ Typography> {currentGuide.requirements}</Typography>
                        <Typography variant="subtitle1" style={{ fontWeight: 600 }} component="p"> Last updated: <Typography variant="subtitle1" style={{ marginRight: 20 }} component="span">{currentGuide.date}</Typography> Bites: <Typography variant="subtitle1" component="span">{currentGuide.bites.length}</Typography> </Typography>

                    </Grid>
                    {/* right side */}
                    <Grid item xs={12} lg={6} style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>

                        <img src={currentGuide.img} style={{ width: 400, maxHeight: 500, borderRadius: 20, border: "1.5px solid #d6d6d6" }} />

                    </Grid>
                </Grid >

                <StickyContainer>
                    <div style={{ display: "flex", justifyContent: "flex-end", borderRadius: 20, border: "1.5px solid #d6d6d6", marginTop: 50, overflow: "hidden", position: "relative" }}>

                        {/* Other elements can be in between `StickyContainer` and `Sticky`,
        but certain styles can break the positioning logic used. */}
                        <div style={{ height: "100%", width: 250, overFlow: "hidden" }}>
                            <Sticky >
                                {({
                                    style,
                                }) => (
                                        <div style={style}>
                                            <BitesList bitesArray={currentGuide.bites} selectedBite={selectedBite} setSelectedBite={setSelectedBite} />
                                        </div>
                                    )}
                            </Sticky>
                        </div>

                        <div style={{ flexGrow: 5, minHeight: 700, padding: 20 }} >
                            <Typography gutterBottom variant="h5" style={{ fontWeight: 600 }} component="p" gutterBottom >{selectedBite.title}</Typography>
                            <Typography variant="subtitle1" gutterBottom style={{ maxWidth: 500 }}>{selectedBite.description}</Typography>
                            <Divider style={{ margin: "40px 0px 20px 0px" }} />
                            <div style={{ padding: 10 }}>
                                {ReactHtmlParser(selectedBite.content)}
                            </div>
                        </div>
                    </div >
                </StickyContainer>
                {loading && <Loading />}
            </React.Fragment>
        </div >
    );
}

export default Course;