import "babel-core/register";
import "babel-polyfill";
import chalk from 'chalk';
import path from "path";
import { exit } from "process";
// import invitationRepo from "../../../src/Controllers/candidate/InvitationRepo";
const { exception } = require('console');
const readl = require('readline');
// const McqModel = require('../../../wwwroot/Models/McqModel');
// import McqModel from '../../src/Models/McqModel.js';
// const { default: McqModel } = require('../../src/Models/McqModel');
// const UserModel = require('../../../wwwroot/Models/UserModel');
const config = require('./config/mcqConfig');
import McqModel from '../../../wwwroot/Models/McqModel';
import UserModel from '../../../wwwroot/Models/UserModel';
import invitationRepo from '../../../wwwroot/Controllers/candidate/InvitationRepo';
import testResultGenerator from '../../../wwwroot/Controllers/candidate/TestResultGenerator';
import mcqResponseRepo from '../../../wwwroot/Controllers/candidate/McqResponseRepo';

console.log('Welcome to Admin area');
let readline = readl.createInterface({
    input: process.stdin, output: process.stdout
});

let adminUser = {};
const setAdminUser = async () => {
    let adminEmail = 'encasherr@gmail.com';
    let userModel = new UserModel();
    let users = await userModel.GetUserByEmail(adminEmail)
                // .then((users) => {
                    let existingUser = users[0];
                    if(existingUser) {
                        let userMeta = JSON.parse(existingUser.user_meta);
                        let userEntity = {
                            id: existingUser.id,
                            emailId: adminEmail,
                            name: userMeta.name ? userMeta.name : adminEmail,
                            role: userMeta.role,
                            orgId: userMeta.orgId
                        };
                        // console.log('user found', userEntity);
                        adminUser = userEntity;
                    }
                    else {
                        console.log(`User ${adminEmail} not found`);
                    }
                // })
                // .catch((error) => {
                //     console.log('Exception occurred in getting current user details', error);
                // });

}

const buildMenu = (menuOptions) => {
    let finalStr = '';
    finalStr += `\nWelcome ${adminUser.name}! What would you like to do now?`;
    finalStr += '\n';
    menuOptions.forEach(option => {
        finalStr += `${option.optionIndex}:  ${option.optionText}\n`;
    });
    finalStr += '\n';
    return finalStr;
}

let menuOptions = [
    { optionIndex: "1", optionText: "Create a Programming MCQ" },
    { optionIndex: "2", optionText: "Create an Academic MCQ" },
    { optionIndex: "3", optionText: "Edit a Programming MCQ" },
    { optionIndex: "4", optionText: "Edit an Academic MCQ" },
    { optionIndex: "5", optionText: "Delete a MCQ" },
    { optionIndex: "6", optionText: "Send Invitation" },
    { optionIndex: "7", optionText: "Get Test Link" },
    { optionIndex: "8", optionText: "Create a Test" },
    { optionIndex: "9", optionText: "Edit a Test" },
    { optionIndex: "10", optionText: "Delete a Test" },
    { optionIndex: "11", optionText: "List All MCQs" },
    { optionIndex: "12", optionText: "Get MCQ" },
    { optionIndex: "13", optionText: "List All Tests" },
    { optionIndex: "14", optionText: "Evaluate Test" },
    { optionIndex: "15", optionText: "Send Test Results to Org" },
    { optionIndex: "16", optionText: "Exit" }
];

const askUser = (query) => {
    return new Promise((resolve, reject) => {
        readline.question(query, (userInput) => {
            if(!userInput) reject('no user input received');
            resolve(userInput);
        })
    })
}

const goToSelectedOption = async (menuOption) => {
    if(!adminUser.id) throw exception('user not initialized');
    switch(menuOption.optionIndex) {
        case "1": {
            let mcqImportPath = path.resolve(config.default.programming.mcqImportPath);
            let programmingMcqs = require(mcqImportPath).getAllQuestions(mcqImportPath);
            console.log('programmingmcqs length', programmingMcqs.length);
            // break;
            programmingMcqs.forEach((mcqToAdd) => {

                let { mcq_meta } = mcqToAdd;
                let model = new McqModel();
                mcq_meta.createdBy = adminUser.id;
                mcq_meta.createdOn = (new Date()).toLocaleDateString();

                model.Add(mcq_meta)
                    .then((res) => {
                        console.log('MCQ Added', res);
                    })
                    .catch((error) => {
                        let msg = "Error in add MCQ: " + error;
                        console.log(msg);
                    });
            })
            break;
        }
        case "2": {
            let mcqImportPath = path.resolve(config.default.academic.mcqImportPath);
            let academicMcqs = require(mcqImportPath).getAllQuestions(mcqImportPath);
            console.log('academicMcqs length', academicMcqs.length);
            // break;
            // let tempMcqs = [ academicMcqs[0] ];
            academicMcqs.forEach((mcqToAdd) => {

                let { mcq_meta } = mcqToAdd;
                let model = new McqModel();
                model.GetMcqByDescription(adminUser, mcq_meta.description)
                    .then((existingMcq) => {
                        console.log('existingMcq', existingMcq);

                        if(existingMcq && existingMcq.length === 0) {
                            mcq_meta.createdBy = adminUser.id;
                            mcq_meta.createdOn = (new Date()).toLocaleDateString();

                            model.AddAcademicMcq(mcq_meta)
                                .then((res) => {
                                    console.log('MCQ Added', res);
                                })
                                .catch((error) => {
                                    let msg = "Error in add MCQ: " + error;
                                    console.log(msg);
                                });
                        }
                        else {
                            console.log(`MCQ already exists, mcqId: ${existingMcq[0].id}`)
                        }

                    })
            })
            break;
        }
        case "3": {
            console.log('edit programming mcq')
        }
        case "4": {
            console.log('edit academic mcq')
        }
        case "5": {
            let mcqId = 128;
            mcqId = await askUser(chalk.yellow.bgBlack('Enter the MCQ Id to be deleted\n'))
            console.log(`You entered ${mcqId}`);
            let model = new McqModel();
            await model.DeleteById(mcqId);
            console.log('MCQ deleted');
            break;
        }
        case "6": {
            let testId = 21;
            testId = await askUser('Enter Test Id to send invite for.\n');
            let emailId = await askUser('Enter Email Id to send invite to.\n');
            let inviteeName = await askUser('Enter name of the candidate\\student to send invite to.\n');
            let invitees = [{
                emailId: emailId,
                name: inviteeName
            }]

            invitationRepo.sendInviteAndGetLink(adminUser.id, invitees[0], testId)
                .then((testLink) => {
                    console.log(`Test registered for email: ${invitees[0].emailId}`);
                    console.log('testLink:  ', testLink);
                })
                .catch((err) => {
                    let response = { message: 'Error occured in register for test:' + err };
                    console.log(response);
                    console.log(`Failed registering test for email: ${invitees[0].emailId}`);
                });
                break;
        }
        case "7": {
            let invitationId = 164;
            invitationId = await askUser(chalk.yellow.bgBlack('Enter the Invitation Id\n'))
            console.log(`You entered ${invitationId}`);
            let testLink = await invitationRepo.getTestLink(invitationId)
            console.log(testLink);

            break;
        }
        case "8": {
            console.log('create a test')
        }
        case "9": {
            console.log('edit a test')
        }
        case "10": {
            console.log('delete a test')
        }
        case "11": {
            console.log('list all mcqs')
        }
        case "12": {
            let mcqId = 153;
            mcqId = await askUser('Enter MCQ Id to retrieve details for\n');
            console.log(`you entered ${mcqId}`); 
            let model = new McqModel();
            console.log('get mcq', mcqId);
            let entity = await model.GetMcqById(mcqId);
                    // .then((entity) => {
                        console.log('entity', entity);
                        if(entity) {
                            console.log(`McqId ${mcqId} returned`);
                            console.log(JSON.stringify(entity));
                        }
                        else {
                            console.log(`MCQ Id ${mcqId} not found`);
                        }
                    // });
            break;
        }
        case "14": {
            let invitationId = 175;
            invitationId = await askUser('Enter invitationId to evaluate results for\n');
            let responseEntity = await mcqResponseRepo.evaluateResults(invitationId);
            console.log(chalk.yellow.bgBlack(`Score: ${responseEntity.response_meta.scorePercentage}`));
            console.log(chalk.yellow.bgBlack(`Result: ${responseEntity.response_meta.result}`));
            break;
        }
        case "15": {
            let invitationId = 175;
            invitationId = await askUser('Enter invitationId to send results for\n');
            await testResultGenerator.generateAndSendResultsForInvitationId(adminUser, invitationId, true);
            break;
        }
        case "16": {
            console.log('Have a good day!');
            exitUserInteraction();
        }
    }
}

const initializeApp = async () => {
    await setAdminUser();
    askUserInput();
}

const exitUserInteraction = () => {
    console.log('Closing user input session');
    readline.close();
    exit();
}

const askUserInput = async () => {
    console.clear();
    let userInput = await askUser(chalk.yellow.bgBlack.bold(buildMenu(menuOptions)));
    if(userInput) {
        let selectedOp = {};
        menuOptions.forEach((option) => {
            if(userInput === option.optionIndex) {
                selectedOp = option;
            }
        })
        if(selectedOp.optionIndex) {
            console.log(`You have selected: ${selectedOp.optionText}`);
            await goToSelectedOption(selectedOp);
            let continueAnotherOp = await askUser('Do you want to continue? y/n\n');
            if(continueAnotherOp === 'y') {
                askUserInput();
            }
            else {
                exitUserInteraction();
            }
        }
        else {
            console.log(`You have selected invalid option ${userInput}`);
        }
    }
}

initializeApp();

