import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { CardHeader, CardContent, CardActions, IconButton } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ListIcon from '@material-ui/icons/ViewHeadline';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField'
import Hidden from '@material-ui/core/Hidden';
import Collapse from '@material-ui/core/Collapse';
import Zoom from '@material-ui/core/Zoom';
import Chip from '@material-ui/core/Chip';

const SkillList = (props) => {
        console.log(props);
        return (
            <Card style={{padding: "4%"}}>
                <CardHeader 
                    avatar={
                        <Avatar aria-label="Recipe" style={styles.avatar}>
                            <ListIcon />
                        </Avatar>
                    }    
                    action={
                        <IconButton onClick={() => props.onSearchEnable()}>
                            {!props.searchEnabled && <SearchIcon />}
                            {props.searchEnabled && <CloseIcon />}
                        </IconButton>
                    }            
                    title={`Skills ${props.skills ? "("+props.skills.length+")" : "" }`}>
                </CardHeader>
                <CardContent>
                    {
                        <Collapse in={props.searchEnabled}>
                        <FormControl variant="outlined" style={styles.formControl}>
                            <TextField
                                id="outlined-name"
                                label="Search"
                                placeholder="Enter search text here"
                                value={props.searchTerm}
                                onChange={(e) => props.onSearchSkill(e.target.value)}
                                margin="normal"
                                variant="outlined"
                            />
                        </FormControl>
                        </Collapse>
                    }
                    <List dense={true}>
                        {props.skills && props.skills.length > 0
                        && props.skills.map((item, index) => {
                            return(
                            <Chip label={item.skill} key={index}
                                style={styles.chip}
                                avatar={
                                    <Avatar>
                                        {item.skill[0]}
                                    </Avatar>   
                                }/>
                            )
                        })}
                        
                    </List>
                {(!props.skills || props.skills.length === 0) &&
                <Typography variant="h6" align="center">
                    There are currently no skills added
                </Typography>}
                </CardContent>
            </Card>
        );
}

export default SkillList;

const styles = {
    avatar: {
        backgroundColor: '#555'
    },
    formControl: {
        width: '70%'
    },
    chip: {
        margin: 10
    }
}