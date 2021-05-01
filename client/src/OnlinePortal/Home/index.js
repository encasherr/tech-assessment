import React, { Component } from "react";
import OpHeader from "./OpHeader";
import OpBanner from "./OpBanner";
import OpLoginSignup from "./OpLoginSignup";
import OpAuthHelper from '../Utils/OpAuthHelper';
import OpContent from "./OpContent";
import OpMenu from "./OpMenu";

const OpShell = () => {

    return (
        <div>
            {/* <OpMenu /> */}
            {/* <OpBanner /> */}
            <OpContent />
        </div>
    );
}
export default OpShell;