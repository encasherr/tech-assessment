import React, { Component } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { testListModes } from "../Tests/OpTestContainer";

const OpHeader = (props) => {
    return (
        <div className="">
            <div className="btn-group">
                <button className={`btn ${props.activeTestList===testListModes.PublicTests ? 'btn-primary' : 'btn-secondary'}`} 
                        onClick={() => props.showPublicTests()}>All Tests</button>
                <button className={`btn ${props.activeTestList===testListModes.MyTests ? 'btn-primary' : 'btn-secondary'}`} 
                    onClick={() => props.showMyTests()}>My Tests</button>
            </div>
        </div>
    )
}
export default OpHeader;
