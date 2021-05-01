const jwt = require("jsonwebtoken");
import { AuthConfig } from '../commons/ServerConfig';

const resources = [
    { 
        resource: '/admin/getAllMcqs',
        allowedRoles: [ 'admin', 'orgadmin', 'staff', 'teacher' ] 
    },
    { 
        resource: '/admin/getMcqsBySkill',
        allowedRoles: [ 'admin', 'orgadmin', 'staff', 'teacher' ] 
    },
    { 
        resource: '/admin/mcq',
        allowedRoles: [ 'admin', 'orgadmin', 'staff', 'teacher' ] 
    },
    { 
        resource: '/admin/bulkMcq',
        allowedRoles: [ 'admin', 'orgadmin', 'staff' ] 
    },
    { 
        resource: '/admin/getAllCategories',
        allowedRoles: [ 'admin', 'orgadmin', 'staff', 'teacher' ] 
    },
    { 
        resource: '/admin/category',
        allowedRoles: [ 'admin', 'recruiter' ] 
    },
    { 
        resource: '/admin/getAllSkills',
        allowedRoles: [ 'admin', 'orgadmin', 'staff', 'teacher' ] 
    },
    { 
        resource: '/admin/skill',
        allowedRoles: [ 'admin', 'recruiter' ] 
    },
    { 
        resource: '/candidate/sendInvite',
        allowedRoles: [ 'admin', 'recruiter', 'teacher' ] 
    },
    { 
        resource: '/admin/getAllTests',
        allowedRoles: [ 'admin', 'orgadmin', 'staff', 'candidate', 'teacher' ] 
    },
    { 
        resource: '/admin/getMyTests',
        allowedRoles: [ 'admin', 'orgadmin', 'staff', 'candidate', 'teacher' ] 
    },
    { 
        resource: '/admin/getTest',
        allowedRoles: [ 'admin', 'orgadmin', 'staff', 'teacher' ] 
    },
    { 
        resource: '/admin/test',
        allowedRoles: [ 'admin', 'recruiter', 'staff', 'teacher' ] 
    },
    { 
        resource: '/admin/getAllUsers',
        allowedRoles: [ 'admin', 'orgadmin', 'staff', 'teacher' ] 
    },
    { 
        resource: '/admin/user',
        allowedRoles: [ 'admin', 'orgadmin' ] 
    },
    { 
        resource: '/admin/getAllOrgs',
        allowedRoles: [ 'admin', 'orgadmin' ] 
    },
    { 
        resource: '/admin/org',
        allowedRoles: [ 'admin' ] 
    },
    { 
        resource: '/admin/getCandidatesByTestId',
        allowedRoles: [ 'admin', 'orgadmin', 'staff', 'teacher' ] 
    },
    { 
        resource: '/admin/getMcqsByTestId',
        allowedRoles: [ 'admin', 'orgadmin', 'staff', 'teacher' ] 
    },
    { 
        resource: '/admin/dashboard/test/count',
        allowedRoles: [ 'admin', 'orgadmin', 'staff', 'teacher' ] 
    },
    { 
        resource: '/admin/dashboard/mcq/count',
        allowedRoles: [ 'admin', 'orgadmin', 'staff', 'teacher' ] 
    },
    { 
        resource: '/admin/dashboard/invitation/count',
        allowedRoles: [ 'admin', 'orgadmin', 'staff', 'teacher' ] 
    },
    { 
        resource: '/candidate/startTest',
        allowedRoles: [ 'admin', 'candidate' ] 
    },
    {
        resource: '/candidate/submitAnswers',
        allowedRoles: [ 'admin', 'candidate' ]
    },
    {
        resource: '/candidate/getAllInvites',
        allowedRoles: [ 'admin', 'orgadmin', 'staff', 'teacher' ]
    },
    {
        resource: '/candidate/evaluateAnswers',
        allowedRoles: [ 'admin', 'orgadmin', 'teacher' ]
    },
    {
        resource: '/loadConfig',
        allowedRoles: [ 'admin', 'orgadmin', null, undefined, '' ]
    },
    { 
        resource: '/admin/getCandidateResponseReport',
        allowedRoles: [ 'admin', 'orgadmin', 'staff', 'teacher' ] 
    },
    { 
        resource: '/admin/getCandidateDetails',
        allowedRoles: [ 'admin', 'orgadmin', 'staff', 'teacher' ] 
    },
    { 
        resource: '/admin/getAllGrades',
        allowedRoles: [ 'admin', 'teacher' ] 
    },
    { 
        resource: '/admin/grade',
        allowedRoles: [ 'admin', 'teacher' ] 
    }
];

const isTokenExpired = (decodedToken) => {
    var isExpiredToken = false;
    var dateNow = new Date().getTime() / 1000;
    console.log(`now: ${dateNow}`);
    console.log(`expiryTime: ${decodedToken.exp}`);
    if(decodedToken && decodedToken.exp < dateNow)
    {
        console.log(`Token expired, expiry at: ${decodedToken.exp}`);
        isExpiredToken = true;
    }
    return isExpiredToken;
}

module.exports = function(req, res, next) {
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    const requestedPath = req.path;
    console.log('requested path: ', requestedPath);
    // console.log('auth middleware check', token);
    if (!token || token === "null") {
        console.log('token missing', token);
        return res.status(401).send("Access denied. No token provided.");
    }
    try {
        //if can verify the token, set req.user and pass to next middleware
        // console.log('verifying with token', token);
        const decoded = jwt.verify(token, AuthConfig.myPrivateKey);
        if(isTokenExpired(decoded)) {
            return res.status(401).send("Token expired. Please login again.");
        }
        req.user = decoded;
        console.log('user: ', req.user);
        if(req.user && req.user.role) {
            let currentUserRole = req.user.role;
            // console.log('current user role: ', currentUserRole);
            let currentResource = resources.filter((item, index) => {
                // console.log('checking item', item.resource);
                return item.resource === requestedPath;
            });
            if(currentResource && currentResource.length > 0) {
                if(currentResource[0].allowedRoles.includes(currentUserRole)) {
                    console.log("authorized");
                    next();
                } else {
                    console.log('not authorized');
                    res.status(401).send('User is not authorized to perform requested operation');    
                }
            }
            else {
                console.log('not found');
                return res.status(404).send("Not Found");
            }
        }
        else {
            console.log('role missing');
            res.status(401).send('User role is missing');
        }    
    } catch (ex) {
            console.log('exception in authorization, token expired:', ex.TokenExpiredError);
            res.status(401).json({message: "Invalid token."});
            // res.status(500).send("Invalid token.");
    }
};
