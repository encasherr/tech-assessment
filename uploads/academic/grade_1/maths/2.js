let data = {
    questions: [
        {
            chapterNo: 1,
            description: `<p>Choose the correct answer</p><p>3 + 3 = ___</p>`,
            choices: [
                { key: "A", isCorrect: false, content: `9` },
                { key: "B", isCorrect: true, content: `6` },
                { key: "C", isCorrect: false, content: `0` },
                { key: "D", isCorrect: false, content: `4` },
            ]
        }
    ]
}
module.exports = {
    data
};