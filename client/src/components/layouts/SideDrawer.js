import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

const MenuItems = [
    { routeName: 'dashboard', routeCaption: 'Dashboard' },
    { routeName: 'mcq', routeCaption: 'Questions' },
    { routeName: 'categories', routeCaption: 'Categories' },
    { routeName: 'candidates', routeCaption: 'Candidates' },
    { routeName: 'users', routeCaption: 'Users' }
];

const SideDrawer = (props) => {
    const { classes, openState, theme } = props;
    return (
            <Drawer
            variant="permanent"
            className={classNames(classes.drawer, {
            [classes.drawerOpen]: openState,
            [classes.drawerClose]: !openState,
            })}
            classes={{
            paper: classNames({
                [classes.drawerOpen]: openState,
                [classes.drawerClose]: !openState,
            }),
            }}
            open={openState}
            >
            <div className={classes.toolbar}>
            <IconButton onClick={() => props.onDrawerClose()}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
            </div>
            <Divider />
            <List>
            {MenuItems.map((menuItem, index) => (
                <Link to={"/" + menuItem.routeName} key={index}>
                    <ListItem button key={menuItem.routeCaption}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={menuItem.routeCaption} />
                    </ListItem>
                </Link>
            ))}
            </List>
            {/* <Divider />
            <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <Link to="/">
                    <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItem>
                </Link>
            ))}
            </List> */}
            </Drawer>
                );
}
export default SideDrawer;