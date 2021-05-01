import React, { Component } from 'react';
import TestConsoleContainer from '../../Containers/TestConsole/TestConsoleContainer';
import OpMenu from '../Home/OpMenu';
import OpPublishTest from './OpPublishTest';

const OpTestConsole = (props) => {
    
    return(
        <>
            {/* <OpMenu /> */}
            {/* <OpPublishTest
                {...props}
            /> */}
            <TestConsoleContainer
                {...props} 
                publishWithInvites={true}
            />
        </>
    );
}
export default OpTestConsole;