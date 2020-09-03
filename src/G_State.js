import G_State from "g_state-management"
let GlobalState = {
    user: {
        object: undefined,
        change: () => { },
    }
}


//Design events below explicitly or implicitly.

GlobalState.user.change = (user) => {
    //Explicitly:
    let newState = {} //Define a new state object.
    newState.user = () => {
        /*Add a method property that is the
        same name of the property being changed.*/

        GlobalState.user.object = user; //Describe how it is changed
        return "added/logged in user"
    }
    G_State.changesTo(newState)//Commit the event using the G_State library.
}
export default GlobalState;
// GlobalState.property.increment = () => {
//     //Implicitly: *note that it only works with properties that have a values property
//     let newValue = GlobalState.property.value++
//     GlobalState.property.changesTo("incremented", newValue)
//     //The embedded method changesTo is only available to properties that have a value property.
//     //It can be overrided.
//     //-------------------//
// }
