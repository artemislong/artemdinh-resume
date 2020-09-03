import React, { useContext, useState, useEffect } from 'react'
import ClassesContext from './../context/classesContext';
//materialUI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import history from './../utils/history'
import teaching from './../images/onlineTeaching.svg'
import Loading from './components/Loading';
import { getAllGuides } from './../api/api'
import { toast } from 'react-toastify';
import CourseCard from './components/CourseCard';
import G_State from "g_state-management";

let { user } = G_State.now
let dependancies = G_State.link("user")





const Main = ({ location }) => {
    const classes = useContext(ClassesContext);
    window.scrollTo(0, 0);
    const [loading, setLoading] = useState(false)
    const [allGuides, setAllGuides] = useState([])

    const handleLoader = () => {
        setLoading(false);
    }


    useEffect(() => {
        const ligma = async () => {
            console.log('getting guides')
            setLoading(true);
            try {
                const response = await getAllGuides();
                console.log(response);
                const guides = response.data;
                console.log("guides", guides)
                setAllGuides(guides)
                setTimeout(handleLoader, 1000) //1s loading after getting data
            } catch (exception) {
                handleLoader();
                console.log(exception)
                toast.error(`😓 uhhh something went wrong`)
                history.push('')
                console.log("Server not responding or data unavailable", exception)
            }
        }
        window.scrollTo(0, 0);
        //const id = match.params.id;
        //console.log(id)
        handleLoader()
        ligma(); //send request
    }, [])

    console.log("currentState Main", user)
    console.log("currentUser Main", user.object)
    return (
        <div className={classes.root} >

            {/* header */}
            <Grid container style={{ paddingTop: 0 }}>
                {/* left side */}
                < Grid item xs={12} lg={6} style={{ display: "flex", padding: 20, flexDirection: "column", justifyContent: "center" }}>


                    <Typography variant="h4" style={{ fontWeight: 600 }} gutterBottom >Welcome!</Typography>
                    <Typography variant="h5" style={{ maxWidth: 500 }}> Learn valuable skills from others and teach whatever you are passionate about. </Typography>

                </Grid>
                {/* right side */}
                <Grid item xs={12} lg={6} style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>

                    <img src={teaching} style={{ width: "100%" }} />

                </Grid>
            </Grid >
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h6" align="center" style={{ fontStyle: "italic", color: "rgba(150,150,150,0.8)" }}>"Teaching is the best way to learn"</Typography>
                <Button variant="outlined" color="primary" style={{ margin: 10, height: 50 }} onClick={() => history.push('/editor/new')}>Click to begin</Button>
            </div>
            <Divider style={{ margin: "40px 40px" }} />
            <div style={{ display: "flex", alignItems: 'center', justifyContent: "center", flexWrap: "wrap" }}>

                {allGuides.map(d => {
                    let index = allGuides.length - allGuides.indexOf(d);
                    d.index = index;
                    return <CourseCard key={index} data={d} />
                })}


            </div >
            {loading && <Loading />}
        </div >
    );
}

export default G_State.updates(Main, dependancies);