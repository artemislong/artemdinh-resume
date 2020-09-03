

const themeObject = {
    typography: {
        // fontSize: 15,
        // subtitle2: { fontWeight: "bold" },
        // h4: {
        //     '@media (max-width:350px)': {
        //         fontSize: '1.2rem',
        //     }
        // },
        fontFamily: '"-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 450, //was 600
            md: 700, //was 960
            lg: 900, //was 1280
            xl: 1920,
        },
    },
    palette: {
        primary: {
            main: '#383e56',
        },
        secondary: {
            // main: '#eeb8b8',
            main: "#f69e7b"
        }
    },
};



export default themeObject;