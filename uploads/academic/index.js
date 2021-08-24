const fs = require('fs');
let gradesToUse = ["grade_1"];

const getAllQuestions = (importPath) => {
    console.log('importPath', importPath);
    let grades = fs.readdirSync(importPath);
    let allQuestions = [];
    console.log('gradesToUse', gradesToUse);
    
    grades.forEach((gradeItem) => {
        if(gradesToUse.includes(gradeItem)) {
            let fileContent = require(`${importPath}\\${gradeItem}`);
            let gradeQuestions = fileContent.getAllQuestions(`${importPath}\\${gradeItem}`);
            gradeQuestions.forEach((q) => {
                allQuestions.push(q);
            })
        }
    })
    return allQuestions;
}

module.exports = {
    getAllQuestions
};