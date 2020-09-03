import React, { useContext, useState, useEffect, useRef } from 'react'
import ClassesContext from '../context/classesContext';
//materialUI
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import { FormControl, Grid, Typography, InputLabel, Select, Button, Divider, Chip, IconButton } from '@material-ui/core';
import history from '../utils/history'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import './../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import BitesList from './components/BitesList';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteDialog from './components/DeleteDialog'
import LoginDialog from './components/LoginDialog';
import { createGuide, updateGuide, getGuideEditor } from './../api/api'
import { toast } from 'react-toastify';
import G_State from "g_state-management";
import Loading from './components/Loading';
import SaveIcon from '@material-ui/icons/Save';
let { user } = G_State.now

const getFullDate = () => {
    let d = new Date();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${months[d.getMonth()]} ${d.getDate()}${((d.getDate() === 1) ? 'st' : ((d.getDate() === 2) ? 'nd' : ((d.getDate() === 3) ? 'rd' : 'th')))}, ${d.getFullYear()}`
};

const defaultContent = {
    title: "My first guide!", description: "Write something about your guide such as what it is about or how it will help your learners.", date: getFullDate(),
    requirements: "Patience, curiosity, and most importantly, will.", img: "https://icatcare.org/app/uploads/2018/06/Layer-1704-1920x840.jpg", published: false,
    bites: [{
        title: "Orientation", description: "Welcome to my guide! This bite will give you an overview of this guide.", content: "<h2>This is the first section </h2> <p>Write something about this section here</ p> <h2>This is the second section</ h2>"
    },
    {
        title: "First bite", description: "A guide should be broken into small bites.", content: "<h2>Small bites are easier to chew. </h2> <p>Same thing applies to knowledge!</ p>"
    },
    ]
}



const EditorConvertToHTML = ({ onEditorStateChange, editorState }) => {




    return (
        <div>
            <Typography gutterBottom variant="body1" color="textSecondary" styel={{ padding: "0px 10px" }}>Please do not copy paste images or icons derectly into editor because it may cause the application to crash. We are currently working on this headache. Thank you!</Typography>
            <Editor
                editorState={editorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                toolbar={{
                    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'image', 'remove', 'history'],
                    image: {
                        urlEnabled: true,
                        uploadEnabled: false,
                        alignmentEnabled: true,
                        uploadCallback: undefined,
                        previewImage: true,
                        defaultSize: {
                            height: 'auto',
                            width: '80%',
                        }
                    }
                }}
                wrapperStyle={{ maxWidth: 1000 }}
                editorStyle={{ border: "1px solid #d6d6d6", boder: 20, minHeight: 400, padding: 10, paddingBottom: 30 }}
                onEditorStateChange={onEditorStateChange}
            />
        </div>
    )
}

const EditBite = React.memo(({ biteData, bites, handleBite, selectedBite }) => {


    //use to get default content
    const getFirstState = (content) => {
        const htmlString = (content) ? content : '<p>Hey, <strong>this bite</strong> should be easy to chew 😀</p>';
        const contentBlock = htmlToDraft(htmlString);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const newEditorState = EditorState.createWithContent(contentState);
            return newEditorState;
        } else return EditorState.createEmpty()
    }

    const [editorState, setEditorState] = useState(undefined);

    //when new bite is added, deleted, changed select
    useEffect(() => {
        console.log('SETTINGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG EDITORSSSSSSSSSSS STATE')
        setEditorState(getFirstState(biteData.content))
    }, [bites])


    const onEditorStateChange = (editorState) => {
        console.log(editorState)
        setEditorState(editorState)
        let event = { target: { value: String(draftToHtml(convertToRaw(editorState.getCurrentContent()))) } }
        console.log("handleBiteContent", event)
        handleBite(event, "content")
    }

    return (
        <React.Fragment>
            <TextField
                id="bite_title"
                label="Bite title"
                value={biteData.title}
                onChange={(event) => handleBite(event, "title")}
                variant="outlined"
                size="small"
                color="secondary"
                style={{ margin: 20 }}
                helperText="A bite is a small part of your guide, give it a unique name!"
            />
            <FormControl size="small" variant="outlined" style={{ margin: 20, width: 150 }}>
                <InputLabel htmlFor="bite_order">Bite order</InputLabel>
                <Select
                    native
                    color="secondary"
                    value={bites.indexOf(selectedBite)}
                    onChange={(event) => handleBite(event, 'order')}
                    inputProps={{
                        name: 'order',
                        id: 'bite_order',
                    }}
                >
                    {bites.map(b => {
                        let index = bites.indexOf(b);
                        return <option key={index} value={index}>{index}</option>
                    })}
                </Select>
                <FormHelperText>Change order</FormHelperText>
            </FormControl>

            <TextField
                id="bite_description"
                label="Overview"
                value={biteData.description}
                onChange={(event) => handleBite(event, 'description')}
                variant="outlined"
                size="small"
                multiline
                rows={3}
                color="secondary"
                style={{ margin: 20, }}
                helperText="Tell your learner what this bite about. Try to make it exciting!"
            />

            <EditorConvertToHTML onEditorStateChange={onEditorStateChange} editorState={editorState} />
        </React.Fragment>
    )
})

const EditorButtons = React.memo(({ handleSave, handlePublish, handleSeeGuide, published }) => {
    //handlePreview

    console.log("editorButtons, is published?", published)
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: 20 }}>
            <Button variant="outlined" startIcon={<SaveIcon style={{ color: "#77DD77" }} />} color="success" onClick={handleSave} >Save changes</Button>


            <FormControlLabel style={{ margin: "0px 15px" }}
                control={<Switch checked={published} onChange={handlePublish} name="Publish guide" color="primary" />}
                label="Publish"
            />
            <Button variant="outlined" color="primary" onClick={handleSeeGuide} disabled={(published) ? false : true}>View your guide</Button>
        </div>
    )
});

const EditCourse = React.memo(({ match, location }) => {
    const classes = useContext(ClassesContext);

    const [loading, setLoading] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [content, updateContent] = useState(defaultContent)

    const handleLoader = () => {
        setLoading(false);
    }

    const useDidMountEffect = (func, deps) => {
        const didMount = useRef(false);

        useEffect(() => {
            if (didMount.current) func();
            else didMount.current = true;
        }, deps);
    }

    const ligma = async (id) => {
        try {
            setLoading(true)
            console.log('getting editor guide content since id is not new')
            const response = await getGuideEditor(id);
            console.log(response);
            const guide = response.data;
            console.log("responded guide", guide)
            updateContent(guide)
            setTimeout(handleLoader, 1000) //1s loading after getting data
        } catch (exception) {
            handleLoader();
            console.log(exception)
            toast.error(`😓 uhhh something went wrong`)
            history.push('')
            console.log("Server not responding or data unavailable", exception)
        }
    }

    useDidMountEffect(() => {

        window.scrollTo(0, 0);
        //if id is 'new' then don't send request
        if (match.params.id !== 'new') ligma(match.params.id); //send request
    }, [loggedIn])

    useEffect(() => {
        //if change url
        window.scrollTo(0, 0);
        //if id is 'new' then don't send request
        if (user.object) {
            if (match.params.id !== 'new') ligma(match.params.id); //send request
            if (match.params.id === 'new') updateContent(defaultContent)
        }
    }, [location])


    const [title, setTitle] = useState(content.title);
    const [description, setDescription] = useState(content.description);
    const [requirements, setRequirements] = useState(content.requirements);
    const [img, setImg] = useState(content.img);
    const [bites, setBites] = useState(content.bites);
    const [published, setPublished] = useState(content.published)
    const [changePublished, setchangePublished] = useState(0)

    const [selectedBite, setSelectedBite] = useState(bites[0]);
    const [currentBiteState, setcurrentBiteState] = useState(bites[0]);
    console.log('selected BITE is', selectedBite)
    const [deleteBite, setDeleteBite] = useState(false);


    //when content changes
    useDidMountEffect(() => {
        setTitle(content.title);
        setDescription(content.description);
        setRequirements(content.requirements);
        setImg(content.img);
        setBites(content.bites);
        setPublished(content.published);
        setSelectedBite(content.bites[0])
    }, [content]);

    //update bite content
    const handleBite = (event, type) => {
        let newBites = [...bites]
        let index = bites.indexOf(selectedBite);
        if (type === "order") {
            //changing order
            newBites.splice(event.target.value, 0, newBites.splice(index, 1)[0]);
            setBites(newBites)
        } else {
            let newBite = { ...selectedBite, [`${type}`]: event.target.value }
            setcurrentBiteState(newBite)
        }

    }

    //save content of the current selected bite before changing to a new one
    const handleSelectedBite = (newSelect) => {
        let newBites = [...bites]
        let index = bites.indexOf(currentBiteState);
        newBites[index] = currentBiteState;
        setBites(newBites)
        setSelectedBite(newSelect)
        setcurrentBiteState(newSelect)
    }

    const handleNewBite = () => {
        const newBite = {
            title: "A new bite", description: "Hey, write something to describe me!", content: undefined
        };
        let newBites = [...bites];
        newBites.push(newBite);
        setBites(newBites);
        setSelectedBite(newBite);
    };

    const handleDelete = () => {
        setDeleteBite(true)
    }

    const handleConfirmedDelete = () => {
        let newBites = [...bites]
        let index = newBites.indexOf(selectedBite);
        newBites.splice(index, 1)

        setBites(newBites)

    };

    //if delete bite, to set first one as selected
    useDidMountEffect(() => {
        if (!deleteBite) setSelectedBite((bites[0]) ? bites[0] : undefined)
    }, [deleteBite]);



    const handleSave = async (event, text = 'Yay, your change was saved succesfully!') => {//if not saved yet, there is no id available. To prevent bugs, will always set id
        if (event) event.persist();
        try {
            const toPost = { ...content, title, description, requirements, img, published, authorName: user.object.name, authorId: user.object.id, authorId: user.object.id, date: getFullDate(), bites }
            console.log('toPost', toPost)
            if (toPost._id) {
                const response = await updateGuide(toPost);
                console.log("update response", response)
            }
            else {
                const response = await createGuide(toPost)
                console.log("create response", response)
                const newContent = response.data
                console.log("content after getting id", newContent)
                updateContent(newContent)
            }
            toast(text)

        } catch (exception) {
            console.log(exception)
            toast.error(`😓 uhhh something went wrong`)
            console.log("Server not responding or data unavailable", exception)
        }
    };

    const handlePublish = () => {
        const currentPublishedState = published;
        const newPublishedState = !currentPublishedState;
        setPublished(newPublishedState);
        setchangePublished(changePublished + 1)

    };

    useDidMountEffect(() => {
        const text = (published) ? "Your guide is now published!" : "Your guide now private."
        handleSave(false, text);
    }, [changePublished]);

    const handleSeeGuide = async () => {
        await handleSave(false);
        history.push(`/guide/${content._id} `)
    };

    //   const handlePreview = () => {
    //       handleSave()

    //   }


    console.log("currentUser Editor", user.object)
    return (
        <div className={classes.root} >
            {/* header */}
            {(user.object) && <EditorButtons handleSave={handleSave} handlePublish={handlePublish} handleSeeGuide={handleSeeGuide} published={published} />}
            <form noValidate autoComplete="off">
                <Grid container style={{ paddingTop: 30 }}>
                    {/* left side */}
                    < Grid item xs={12} lg={6} style={{ display: "flex", padding: 20, flexDirection: "column", justifyContent: "center" }}>

                        <TextField
                            id="title"
                            label="Course title"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            variant="outlined"
                            size="small"
                            color="secondary"
                            style={{ marginTop: 20 }}
                            helperText="Think of a catchy name that would describe your course well"
                        />
                        <TextField
                            id="description"
                            label="Description"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            variant="outlined"
                            size="small"
                            rows={4}
                            multiline
                            color="secondary"
                            style={{ marginTop: 30 }}
                            helperText="Tell your learners what this course is about and why they should learn it"
                        />
                        <TextField
                            id="tools"
                            label="What you will need"
                            value={requirements}
                            onChange={(event) => setRequirements(event.target.value)}
                            variant="outlined"
                            size="small"
                            multiline
                            rows={2}
                            color="secondary"
                            style={{ marginTop: 30 }}
                            helperText="Introduce any skill, tool, or characteristics that your learner should have in order to succeed in your course"
                        />
                        <TextField
                            id="image"
                            label="Image URL"
                            value={img}
                            onChange={(event) => setImg(event.target.value)}
                            variant="outlined"
                            size="small"
                            color="secondary"
                            style={{ marginTop: 30 }}
                            helperText="Paste a link of your image. You can use Pinterest, Imgur, Google Images,..."
                        />

                    </Grid>
                    {/* right side */}
                    <Grid item xs={12} lg={6} style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ maxWidth: 400 }}>
                            <Typography variant="h4" style={{ fontWeight: 600 }} component="p" gutterBottom >{title} </Typography>
                            <Typography variant="subtitle1" gutterBottom component="p" style={{ lineHeight: "1.4em" }}> {description}</Typography>
                            <Typography variant="subtitle1" gutterBottom component="p" style={{ lineHeight: "1.4em" }}><Typography variant="subtitle1" component="span" style={{ fontWeight: 600, lineHeight: "1.4em" }}>You will need: </ Typography> {requirements}</Typography>
                        </div>

                        <img src={img} style={{ width: 400, maxHeight: 500, marginTop: 20, borderRadius: 20, border: "1.5px solid #d6d6d6" }} />

                    </Grid>
                </Grid >

                <div style={{ display: "flex", justifyContent: "flex-start", borderRadius: 20, border: "1.5px solid #d6d6d6", marginTop: 50, overflow: "hidden" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <BitesList bitesArray={bites} selectedBite={selectedBite} setSelectedBite={handleSelectedBite} />
                        <IconButton style={{ margin: 20, border: "1px solid #f69e7b" }} onClick={handleNewBite}>
                            <AddBoxIcon color="secondary" />
                        </IconButton>
                    </div>
                    <div style={{ minHeight: 700, padding: 20, position: "relative" }} >

                        {!(selectedBite) && <Typography variant="h6" align="center" color="primary" style={{ margin: 20 }}>Come on, add a bite to your guide!</Typography>}

                        {selectedBite && <React.Fragment>
                            <IconButton
                                style={{ border: "1px solid #ff6961", position: "absolute", top: 20, right: 20 }}
                                onClick={handleDelete}
                            >
                                <DeleteIcon style={{ color: "#ff6961" }} />
                            </IconButton>

                            <EditBite biteData={currentBiteState} handleBite={handleBite} bites={bites} selectedBite={selectedBite} />
                        </React.Fragment>}
                    </div>
                </div >
                {(user.object) && <EditorButtons handleSave={handleSave} handlePublish={handlePublish} handleSeeGuide={handleSeeGuide} published={published} />}
            </form>
            {loading && <Loading />}
            {!(user.object) && <LoginDialog setLoggedIn={setLoggedIn} />}
            <DeleteDialog setDeleteBite={setDeleteBite} open={deleteBite} handleConfirmedDelete={handleConfirmedDelete} />
        </div >
    );
})

export default EditCourse;