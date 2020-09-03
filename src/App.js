import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
//styling
import './App.css';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { stylingObject, theme } from "./style/general";
//component
import Main from './pages/Main';
import NavBar from './pages/components/NavBar';
import Footer from './pages/components/Footer';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ReactGA from 'react-ga';
//context
import ClassesContext from './context/classesContext';
import Course from './pages/Course';
import EditCourse from './pages/Editor'
import Profile from './pages/Profile';
import G_State from "g_state-management";

let { user } = G_State.now
let dependancies = G_State.link("user")
G_State.debug({ live: true, showMount: true });

//-------app function--------
function App() {
  const classes = makeStyles(stylingObject)();
  //google analytics
  //  ReactGA.initialize('UA-175442767-1');
  //  history.listen(location => {
  //    ReactGA.set({ page: location.pathname }); // Update the user's current page
  //    ReactGA.pageview(location.pathname); // Record a pageview for the given page
  //  });
  return (
    <ThemeProvider theme={theme}>
      <ClassesContext.Provider value={classes}>
        <ToastContainer />
        <NavBar />
        <Switch>
          <Route path="/guide/:id" render={(props) => (<Course {...props} />)} />
          <Route path="/profile/:id" render={(props) => (<Profile {...props} />)} />
          <Route path="/editor/:id" render={(props) => (<EditCourse {...props} />)} />
          <Route path="/profile/" render={(props) => (<Profile {...props} myProfile={true} />)} />
          <Route path="" render={(props) => (<Main {...props} />)} />
          <Redirect to="" />
        </Switch>
        <Footer />
      </ClassesContext.Provider>
    </ThemeProvider>
  );
}

export default G_State.updates(App, dependancies);