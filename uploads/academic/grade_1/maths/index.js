const fs = require('fs');
let filesToUse = ["1.js"];

const getAllQuestions = (importPath) => {
    let qFiles = fs.readdirSync(importPath);
    let mcqsToAdd = [];

    console.log('maths files to use', filesToUse);
    qFiles.forEach((qFile) => {
        if(qFile.indexOf('index') === -1) {
            if(filesToUse.includes(`${qFile}`)) {
                let filePath = `${importPath}\\${qFile}`;
                let fileContent = require(filePath);
                let json = fileContent.data;
                
                if(json.questions && json.questions.length) {
                    json.questions.forEach((question) => {
                        let mcqToAdd = { mcq_meta: {} };
                        mcqToAdd.mcq_meta.category = "Academic";
                        mcqToAdd.mcq_meta.grade = "Grade 1";
                        mcqToAdd.mcq_meta.subject = "Maths";
                        mcqToAdd.mcq_meta.chapterNo = question.chapterNo;
                        mcqToAdd.mcq_meta.description = question.description;
                        mcqToAdd.mcq_meta.choices = question.choices;
                        mcqsToAdd.push(mcqToAdd);
                    })
                }
            }
        }
    })
    console.log('mcqtoaddlength', mcqsToAdd.length);
    // console.log('mcqtoadd', mcqsToAdd[0].mcq_meta.description.substr(0,10));
    // console.log('mcqtoadd', mcqsToAdd[1].mcq_meta.description.substr(0,10));
    return mcqsToAdd;
}

module.exports = {
    getAllQuestions
};