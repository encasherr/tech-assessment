import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { PowerSettingsNew } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import AuthHelper from '../../AuthHelper';

const Header = (props) => {
    // const classes = useStyles();
    const { classes, openState } = props;
    const logout = () => {
        props.onLogout();
    }
    let userInfo = AuthHelper.GetUserInfo();
    // console.log('header props', userInfo.name);
    return (
        <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
            [classes.appBarShift]: openState,
            })}
        >
            <Toolbar disableGutters={!openState}>
            <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={() => props.onDrawerOpen()}
                className={classNames(classes.menuButton, {
                [classes.hide]: openState,
                })}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
                Technical Assessment Admin
            </Typography>
            {userInfo && 
            <Typography variant="subtitle1" color="inherit" noWrap style={styles.welcomeMessage}>
                {userInfo.name} ({userInfo.role})
            </Typography>
            }
            {AuthHelper.isLoggedIn() && 
                // <Button style={styles.menuButton}
                //     onClick={logout}
                // color="inherit">Logout</Button>
                <IconButton 
                    onClick={logout}
                    style={styles.menuButton}
                    edge="end"
                    aria-label="Account of current user"
                    // aria-controls={menuId}
                    aria-haspopup="true"
                    // onClick={handleProfileMenuOpen}
                    color="inherit"
                    >
                    <PowerSettingsNew />
                </IconButton>
            }
            </Toolbar>
        </AppBar>
    )
}
export default Header;
const styles = {
    menuButton: {
        marginLeft: '20%'
    },
    welcomeMessage: {
        marginLeft: '40%'
    }
}