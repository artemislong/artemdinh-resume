import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const Bite = ({ data, selectedBite, handleListItemClick }) => {
    const selected = (selectedBite === data) ? true : false;

    return (
        <React.Fragment>
            <ListItem
                button
                selected={selected}
                onClick={(event) => handleListItemClick(event, data)}>
                <ListItemAvatar>
                    <Avatar style={{ background: (selected) ? "#f69e7b" : "#383e56" }}>
                        {data.index}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={data.title}
                //secondary={data.time} 
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </React.Fragment>
    )
}


const BitesList = ({ bitesArray, selectedBite, setSelectedBite }) => {


    const handleListItemClick = (event, bite) => {
        setSelectedBite(bite);
    };

    return (
        <List style={{ width: 250, padding: 0, borderRight: "1.5px solid #d6d6d6", borderTopLeftRadius: 20, borderBottomLeftRadius: 20, overflow: "hidden" }}>
            {bitesArray.map(b => {
                let index = bitesArray.indexOf(b);
                b.index = index;
                return <Bite data={b} key={index} selectedBite={selectedBite} handleListItemClick={handleListItemClick} />
            })}

        </List>
    );
}

export default BitesList;