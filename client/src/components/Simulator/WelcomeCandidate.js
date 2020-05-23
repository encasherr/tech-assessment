import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

const WelcomeCandidate = (props) => {

    return (
        <Grid container style={styles.container}>
            <Typography variant="h2" gutterBottom={true} 
                align="center"    color="primary">Welcome to Tech Assessment</Typography>
                <Divider />
        </Grid>
    );
}
export default WelcomeCandidate;
const styles = {
    container: {
        paddingTop: '10%'
    },
    textCenter: {
        fontSize: '28px',
        paddingLeft: '25%',
    }
}