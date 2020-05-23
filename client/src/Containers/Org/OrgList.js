import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { CardHeader, CardContent, IconButton } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ListIcon from '@material-ui/icons/ViewHeadline';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField'
import Collapse from '@material-ui/core/Collapse';
import Remove from '@material-ui/icons/Remove';

const OrgList = (props) => {
        console.log(props);
        return (
            <Card style={{padding: "4%"}}>
                <CardHeader 
                    avatar={
                        <Avatar aria-label="Recipe" style={styles.avatar}>
                            <ListIcon />
                        </Avatar>
                    }    
                    title={`Organizations ${props.orgs ? "("+props.orgs.length+")" : "" }`}>
                </CardHeader>
                <CardContent>
                    <List dense={true}>
                        {props.orgs && props.orgs.length > 0
                        && props.orgs.map((org, index) => {
                            let item = org.org_meta;
                            return(
                            <ListItem key={org.id}
                                divider={true}
                                button={true} onClick={ () => props.onOrgSelect(org) }
                            >
                            <ListItemText
                                primary={item.name}
                                secondary={item.city}
                                />
                            </ListItem>)
                        })}
                        
                    </List>
                {(!props.orgs || props.orgs.length === 0) &&
                <Typography variant="h6" align="center">
                    There are currently no organizations added
                </Typography>}
                </CardContent>
            </Card>
        );
}

export default OrgList;

const styles = {
    avatar: {
        backgroundColor: '#555'
    },
    formControl: {
        width: '70%'
    }
}