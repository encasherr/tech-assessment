import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import MailIcon from '@material-ui/icons/Mail';
import { Dashboard, Book, Assessment, ViewQuilt, PermIdentity, SupervisorAccount, Polymer  } from '@material-ui/icons';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom'

const MenuItems = [
    { routeName: 'dashboard', routeCaption: 'Dashboard', icon: Dashboard },
    { routeName: 'tests', routeCaption: 'Tests', icon: Assessment },
    { routeName: 'mcqs', routeCaption: 'Library', icon: Book },
    { routeName: 'categories', routeCaption: 'Categories', icon: ViewQuilt },
    { routeName: 'skills', routeCaption: 'Skills', icon: Polymer },
    { routeName: 'candidates', routeCaption: 'Invite Candidates', icon: SupervisorAccount },
    { routeName: 'users', routeCaption: 'Users', icon: PermIdentity }
];

const getIcon = (menuItem) => {
    let icon = menuItem.icon;
    return (
        React.createElement(icon)
    )
}

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
                    {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                    <ListItemIcon title={menuItem.routeCaption}>{getIcon(menuItem)}</ListItemIcon>
                    <ListItemText style={{textDecoration: 'none'}} primary={menuItem.routeCaption} />
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