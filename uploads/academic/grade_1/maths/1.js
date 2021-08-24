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
        },
        {
            chapterNo: 1,
            description: `<p>State True or False</p><p>6 + 1 + 2 = 6 +2 +1</p>`,
            choices: [
                { key: "A", isCorrect: true, content: `True` },
                { key: "B", isCorrect: false, content: `False` }
            ]
        },
        {
            chapterNo: 1,
            description: `<p>Find the Sum</p><p>2 + 3 + 4 = __</p>`,
            choices: [
                { key: "A", isCorrect: false, content: `7` },
                { key: "B", isCorrect: false, content: `10` },
                { key: "C", isCorrect: false, content: `5` },
                { key: "D", isCorrect: true, content: `9` }
            ]
        },
        {
            chapterNo: 1,
            description: `<p>Fill in the blank</p><p>___ + 5 = 5 + 3</p>`,
            choices: [
                { key: "A", isCorrect: false, content: `1` },
                { key: "B", isCorrect: false, content: `8` },
                { key: "C", isCorrect: true, content: `3` },
                { key: "D", isCorrect: false, content: `2` }
            ]
        },
        {
            chapterNo: 1,
            description: `<p>Word Problem</p>
            <p>11 Kittens and 7 Puppies are playing in the park. How many animals in all are playing in the park?</p>
            `,
            choices: [
                { key: "A", isCorrect: false, content: `14` },
                { key: "B", isCorrect: false, content: `19` },
                { key: "C", isCorrect: false, content: `20` },
                { key: "D", isCorrect: true, content: `18` }
            ]
        },
        {
            chapterNo: 1,
            description: `<p>Find the numbers that add up to 10.</p>
            <p>9</p><p>8</p><p>1</p>
            `,
            choices: [
                { key: "A", isCorrect: false, content: `9 and 8` },
                { key: "B", isCorrect: false, content: `8 and 1` },
                { key: "C", isCorrect: true, content: `9 and 1` },
                { key: "D", isCorrect: false, content: `None of above` }
            ]
        },
        {
            chapterNo: 1,
            description: `<p>Find the sum of following numbers.</p>
            <p>9</p><p>8</p><p>1</p>
            `,
            choices: [
                { key: "A", isCorrect: false, content: `17` },
                { key: "B", isCorrect: false, content: `19` },
                { key: "C", isCorrect: false, content: `11` },
                { key: "D", isCorrect: true, content: `18` }
            ]
        },
        {
            chapterNo: 1,
            description: `<p>Word Problem.</p>
            <p>There are 4 balloons. How many more balloons need to be drawn to have 15 balloons?</p>
            `,
            choices: [
                { key: "A", isCorrect: false, content: `5` },
                { key: "B", isCorrect: true, content: `11` },
                { key: "C", isCorrect: false, content: `14` },
                { key: "D", isCorrect: false, content: `10` }
            ]
        },
        {
            chapterNo: 1,
            description: `<p>Word Problem.</p>
            <p>6 more than 13 is __</p>
            `,
            choices: [
                { key: "A", isCorrect: false, content: `12` },
                { key: "B", isCorrect: false, content: `10` },
                { key: "C", isCorrect: true, content: `19` },
                { key: "D", isCorrect: false, content: `15` }
            ]
        },
        {
            chapterNo: 1,
            description: `<p>1 ten + 4 ones = ____</p>
            `,
            choices: [
                { key: "A", isCorrect: false, content: `24` },
                { key: "B", isCorrect: false, content: `1` },
                { key: "C", isCorrect: true, content: `14` },
                { key: "D", isCorrect: false, content: `4` }
            ]
        }
    ]
}
module.exports = {
    data
};