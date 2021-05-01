import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingComponent = (props) => {
    return (
        <div className="" style={styles.center}>
            <CircularProgress color="secondary" />
        </div>
    );
}
const styles = {
    center: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }
}
export default LoadingComponent;