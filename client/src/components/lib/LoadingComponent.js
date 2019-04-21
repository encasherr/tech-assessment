import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingComponent = (props) => {
    return (
        <div>
            <CircularProgress color="secondary" />
        </div>
    );
}
export default LoadingComponent;