import React, { Component } from 'react';
import { GetCurrentUserRole } from '../../common/HelperFunctions';
import config from '../../config';

const OpMenu = (props) => {
  
    let menuItems = [];
    let userRole = GetCurrentUserRole();
    switch(userRole) {
        case config.instance.Roles.Teacher:
        {
            menuItems = teacherMenu;
            break;
        }
        case config.instance.Roles.Candidate:
        {
            menuItems = candidateMenu;
            break;
        }
    }
    return (
        <>
            <ul className="nav justify-content-end">
                {menuItems && menuItems.length > 0 &&
                    menuItems.map((menuItem) => {
                        return (
                            <li className="nav-item">
                                <a className="nav-link active" href={menuItem.path}>{menuItem.caption}</a>
                            </li>
                        )
                    })
                }
                {/* <li class="nav-item">
                    <a class="nav-link active" href="#">Active</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Disabled</a>
                </li> */}
            </ul>
        </>
    )
}

export default OpMenu;

const candidateMenu = [
    {
        caption: "Home",
        path: "/ophome"
    },
    {
        caption: "Tests",
        path: "/optests"
    }
]
const teacherMenu = [
    {
        caption: "Home",
        path: "/ophome"
    },
    {
        caption: "Tests",
        path: "/optests"
    },
    {
        caption: "MCQ Library",
        path: "/mcqs"
    }
]