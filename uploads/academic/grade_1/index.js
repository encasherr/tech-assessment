const fs = require('fs');
let subjectsToUse = ["maths"];

const getAllQuestions = (importPath) => {
    console.log('importPath', importPath);
    let subjects = fs.readdirSync(importPath);
    let allQuestions = [];
    console.log('subjectsToUse', subjectsToUse);
    
    subjects.forEach((subjectItem) => {
        if(subjectsToUse.includes(subjectItem)) {
            let fileContent = require(`${importPath}\\${subjectItem}`);
            let subjectQuestions = fileContent.getAllQuestions(`${importPath}\\${subjectItem}`);
            subjectQuestions.forEach((q) => {
                allQuestions.push(q);
            })
        }
    })
    return allQuestions;
}

module.exports = {
    getAllQuestions
};