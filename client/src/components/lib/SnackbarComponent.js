import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const SnackbarComponent = (props) => {
    console.log('snack render: ' + props.openSnack);
    let { openSnack } = props;
    return (
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={openSnack}
          autoHideDuration={6000}
          onClose={props.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{props.snackMessage}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={props.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        >
        <SnackbarContent
            style={styles.root}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar">
                {/* <Icon /> */}
                {props.snackMessage}
                </span>
            }
            action={[
                <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                // className={classes.close}
                // onClick={onClose}
                >
                <CloseIcon />
                </IconButton>,
            ]}
            // {...other}
            />
        </Snackbar>
    );
}
export default SnackbarComponent;
const styles = {
    root: {
        backgroundColor: '#394'
    }
}