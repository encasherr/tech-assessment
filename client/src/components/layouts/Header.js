import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { Button, Menu, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import AuthHelper from '../../AuthHelper';
import config from '../../config';
import TickComponent from '../lib/TickComponent';

const Header = (props) => {
    const { classes, openState, isTokenExpired } = props;
    const logout = () => {
        props.onLogout();
    }
    let userInfo = AuthHelper.GetUserInfo();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
      
    return (
        <div>
        <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
            [classes.appBarShift]: openState,
            })}
        >
            <Toolbar disableGutters={!openState}>
                {
                    props.isDrawerRequired &&
                    <IconButton
                        color="inherit"
                        edge="start"
                        aria-label="Open drawer"
                        onClick={() => props.onDrawerOpen()}
                        className={classNames(classes.menuButton, {
                        [classes.hide]: openState,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                }
            <Typography  style={styles.paddingLeft} variant="h6" color="inherit" noWrap>
                    <a href={config.instance.getValue('site_url')} style={{color: '#fff'}}>
                        {config.instance.getValue('site_title')}
                    </a>
            </Typography>
            {userInfo && props.isLogoutButtonRequired &&
            <Typography variant="subtitle1" color="inherit" noWrap style={styles.welcomeMessage}>
                {userInfo.name}
            </Typography>
            }
            {
                AuthHelper.isLoggedIn() && props.isLogoutButtonRequired && 
                <div style={styles.menuButton}>
                <IconButton 
                    onClick={handleMenu}
                    edge="end"
                    aria-label="Account of current user"
                    aria-haspopup="true"
                    color="inherit"
                    >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                    >
                    <MenuItem >Role: {userInfo && userInfo.role}</MenuItem>
                    <MenuItem onClick={logout} >Logout</MenuItem>
                </Menu>
                </div>
            }
            {/* {
                props.isTickerRequired &&
                <IconButton style={styles.paddingLeft}>
                    <TickComponent />
                </IconButton>
            } */}
            
            </Toolbar>
            </AppBar>
        </div>
    )
}
export default Header;
const styles = {
    menuButton: {
        right: '4px'
    },
    welcomeMessage: {
        marginLeft: '40%'
    },
    paddingLeft: {
        paddingLeft: '1%'
    }
}