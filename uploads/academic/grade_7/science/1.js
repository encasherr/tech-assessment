let data = {
    questions: [
        {
            chapterNo: 1,
            description: `Fill in the blank:<br>
            The ___ and cultivated on a large scale at a place is called crop.
            `,
            choices: [
                { key: "A", isCorrect: false, content: `different kind of plants grown` },
                { key: "B", isCorrect: false, content: `different kind of cereals grown` },
                { key: "C", isCorrect: true, content: `same kind of plants grown` },
                { key: "D", isCorrect: false, content: `same kind of cereals grown` },
            ]
        },
        {
            chapterNo: 1,
                description: `Fill in the blank:<br>
                The first step before growing crops is ___ of the soil.
                `,
                choices: [
                    { key: "A", isCorrect: false, content: `levelling` },
                    { key: "B", isCorrect: true, content: `preparation` },
                    { key: "C", isCorrect: false, content: `tilling` },
                    { key: "D", isCorrect: false, content: `ploughing` },
                ]
        },
        {
            chapterNo: 1,
                description: `Fill in the blank:<br>
                Damaged seeds would ___ water.
                `,
                choices: [
                    { key: "A", isCorrect: false, content: `sow on top of` },
                    { key: "B", isCorrect: true, content: `sow under` },
                    { key: "C", isCorrect: false, content: `sink under` },
                    { key: "D", isCorrect: false, content: `float on top of` },
                ]
        },
        {
            chapterNo: 1,
                description: `What is essential for growing a crop?`,
                choices: [
                    { key: "A", isCorrect: false, content: `` },
                    { key: "B", isCorrect: false, content: `Torrid Zone, Prime Zone, Frigid Zone` },
                    { key: "C", isCorrect: false, content: `Torrid Zone, South Zone, Frigid Zone` },
                    { key: "D", isCorrect: true, content: `Torrid Zone, Temperature Zone, Frigid Zone` },
                ]
        }
    ]
    
}
module.exports = {
    data
};