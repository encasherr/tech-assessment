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
import { Dashboard, Book, Assessment, ViewQuilt, PermIdentity, Polymer, Airplay  } from '@material-ui/icons';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom'
import AuthHelper from '../../AuthHelper';

const MenuItems = [
    // { routeName: 'login', routeCaption: 'Login', icon: Polymer },
    { routeName: 'dashboard', routeCaption: 'Dashboard', icon: Dashboard, app: 'TeachAssesment' },
    { routeName: 'tests', routeCaption: 'Tests', icon: Assessment, app: 'TeachAssesment' },
    { routeName: 'mcqs', routeCaption: 'Library', icon: Book, app: 'TeachAssesment' },
    { routeName: 'categories', routeCaption: 'Categories', icon: ViewQuilt, app: 'TeachAssesment' },
    { routeName: 'skills', routeCaption: 'Skills', icon: Polymer, app: 'TeachAssesment' },
    // { routeName: 'candidates', routeCaption: 'Invite Candidates', icon: SupervisorAccount },
    { routeName: 'users', routeCaption: 'Users', icon: PermIdentity, app: 'TeachAssesment' },
    { routeName: 'simulator', routeCaption: 'Simulator', icon: Airplay, app: 'TeachAssesment' },

    /* HiTech Routes */
    { routeName: 'rmaRequests', routeCaption: 'RMA', icon: Book, app: 'Hitech' },
];

const getIcon = (menuItem) => {
    let icon = menuItem.icon;
    return (
        React.createElement(icon)
    )
}

const SideDrawer = (props) => {
    const { classes, openState, theme } = props;
    // console.log('Menuitems', MenuItems);
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
                <div key={index}>
                    {AuthHelper.isLoggedIn() && menuItem.routeName !== 'login' &&
                    <Link to={"/" + menuItem.routeName} key={index}>
                        <ListItem button key={menuItem.routeCaption}>
                            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                            <ListItemIcon title={menuItem.routeCaption}>{getIcon(menuItem)}</ListItemIcon>
                            <ListItemText style={{textDecoration: 'none'}} primary={menuItem.routeCaption} />
                        </ListItem>
                    </Link>
                    }
                    {!AuthHelper.isLoggedIn() && menuItem.routeName === 'login' &&
                    <Link to={"/" + menuItem.routeName} key={index}>
                        <ListItem button key={menuItem.routeCaption}>
                            <ListItemIcon title={menuItem.routeCaption}>{getIcon(menuItem)}</ListItemIcon>
                            <ListItemText style={{textDecoration: 'none'}} primary={menuItem.routeCaption} />
                        </ListItem>
                    </Link>
                    }
                    {menuItem.app === 'Hitech' &&
                    <Link to={"/" + menuItem.routeName} key={index}>
                        <ListItem button key={menuItem.routeCaption}>
                            <ListItemIcon title={menuItem.routeCaption}>{getIcon(menuItem)}</ListItemIcon>
                            <ListItemText style={{textDecoration: 'none'}} primary={menuItem.routeCaption} />
                        </ListItem>
                    </Link>}
            </div>
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