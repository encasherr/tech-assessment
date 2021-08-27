const fs = require('fs');
let skillsToUse = ["csharp"];

const getAllQuestions = (importPath) => {
    console.log('importPath', importPath);
    let skills = fs.readdirSync(importPath);
    let allQuestions = [];
    console.log('skillstouse', skillsToUse);
    
    skills.forEach((skillItem) => {
        if(skillsToUse.includes(skillItem)) {
            let fileContent = require(`${importPath}\\${skillItem}`);
            let skillQuestions = fileContent.getAllQuestions(`${importPath}\\${skillItem}`);
            skillQuestions.forEach((q) => {
                allQuestions.push(q);
            })
        }
    })
    // console.log('allQuestions1', JSON.stringify(allQuestions[0]));
    // console.log('allQuestions1', allQuestions[0].mcq_meta.description.substr(0,10));
    // console.log('allQuestions2', allQuestions[1].mcq_meta.description.substr(0,10));
    return allQuestions;
}

// let data = getAllQuestions();

module.exports = {
    getAllQuestions
};