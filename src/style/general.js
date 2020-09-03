import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { fade, makeStyles } from '@material-ui/core/styles';
import themeObject from "./theme";
import vietnamFlag from "./../images/vietnamFlag.svg"
import englishFlag from "./../images/englishFlag.svg"
//----------------------common styles---------------------
const mainColor = "#d56d6d";
const secondaryColor = '#eeb8b8';
const cardBackground = "#ebf5ff";
//----------------------generating MUI theme and assign responsive font size property
// then create a styling object and passing theme to it for styling.
//finally, we export both theme and stylingObject to App.js to execute in stateless function component.
// this way we prevented hook errors.

let theme = createMuiTheme(themeObject);
theme = responsiveFontSizes(theme);

const stylingObject = (theme) => ({
    root: {
        minHeight: "100vh",
        overflowX: 'hidden',
        //background: "#fff5f4",
        padding: "70px 70px",
        position: "relative",
        //appBardisplay: "flex", flexDirection: "column", alignItems: "center",
        [theme.breakpoints.down(500)]: {
            padding: "70px 10px",
        },
    },
    button: {
        margin: theme.spacing(1),
        borderRadius: 20,
        marginLeft: 12
    },
    stackCard: {
        width: "100%",
        background: cardBackground,
        borderRadius: 0,

    },
    avatar: {
        width: 50, height: 50, borderRadius: "50%", overflow: "hidden", display: "flex", color: mainColor, fontWeight: 700, fontSize: "1.5em",
        justifyContent: "center", alignItems: "center", boxShadow: "4px 4px 6px #ededed, -4px -4px 6px #ffffff"
    },
    avatarImage: { width: "100%" },
    cardContent: {
        [theme.breakpoints.down(500)]: {
            paddingLeft: 10,
            paddingRight: 40
        },
    },
    guideCard: {

        width: 350, margin: 10, position: "relative", borderRadius: 20, overflow: "hidden",
    },
    guideCardContent: {
        paddingBottom: 70, boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "center", color: "#FFF", position: "absolute", top: 0, left: 0, height: "100%", width: "100%"
    },
    guideCardImage: {
        border: "1px solid white", display: "flex", justifyContent: "center", alignItems: "flex-start", position: "relative", background: "#fff5f4", width: "100%", height: 200, overflow: "hidden", boxSizing: "border-box"
    },
    guideCardBackgroundImage: {
        height: "100%", width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        WebkitFilter: "blur(2px)",
        MozFilter: "blur(2px)",
        OFilter: "blur(2px)",
        MsFilter: "blur(2px)",
        filter: "blur(2px)",
    },
    footerContainer: {
        width: "100%", height: "auto", marginTop: 60,
        position: "relative",
        padding: 20,
        boxSizing: "border-box",
        paddingTop: 30,
        background: " #1e323e",
        display: "flex", justifyContent: 'center', flexDirection: "column",
        [theme.breakpoints.down(500)]: {
            height: "auto"
        },
    },
    footer2020Text: {
        margin: "20px auto"
    },
    footerImageContainer: {
        width: "90%",
        margin: "5px auto",
        maxWidth: 300, borderRadius: 30,
        display: "flex", flexDirection: "column", justifyContent: "center",
    },
    footerAboutUsImage: {
        width: "100%",
        margin: "10px 0px",
        borderRadius: 30
    },
    footerButton: {
        background: "linear-gradient(145deg, #61c69f, #52a786)",
        //boxShadow: "15px 15px 30px #4d9d7f, -15px -15px 30px #69d5ab",
        margin: "10px auto", marginLeft: "auto", marginRight: "auto", color: "#FFF"
    },
    //_______________________App Bar______________________________
    appBar: {
        width: "100%",
        zIndex: 50,

    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        cursor: "pointer"
    },

    //===========================Login===============================
    loginButton: {
        margin: "20px auto 0px",
        width: "70%",
        padding: "15px 20px",
        /* box-shadow: 0px 16px 60px rgba(78, 79, 114, 0.1), */
        boxShadow: "0px 16px 60px rgba(78, 79, 114, 0.08)",
    },
    loginButtonText: {
        color: " #4285f4",
        fontWeight: 600,
    },

    loginIcon: {
        height: 25,
        width: 25,

    },
    //===========================Welcome=============================
    welcomeLoginBox: {
        position: "absolute",
        left: "50%",
        top: "50%",
        WebkitTransform: "translate(-50%, -50%)",
        transform: "translate(-50%, -50%)",
        height: 300,
        width: 600,
        border: "2px solid gray",
        borderRadius: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
});


export { stylingObject, theme };