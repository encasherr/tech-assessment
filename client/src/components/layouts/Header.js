import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

const Header = (props) => {
    const { classes, openState } = props;
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
            </Toolbar>
        </AppBar>
    )
}
export default Header;