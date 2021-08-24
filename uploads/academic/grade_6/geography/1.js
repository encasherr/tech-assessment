let data = {
    questions: [
        {
            chapterNo: 2,
            description: `What is the true shape of the earth?`,
            choices: [
                { key: "A", isCorrect: false, content: `The true shape of earth is cuboid.` },
                { key: "B", isCorrect: false, content: `The true shape of earth is cylindrical.` },
                { key: "C", isCorrect: true, content: `The true shape of earth is geoid.` },
                { key: "D", isCorrect: false, content: `The true shape of earth is circular.` },
            ]
        },
        {
            chapterNo: 2,
                description: `What is a globe?`,
                choices: [
                    { key: "A", isCorrect: false, content: `Globe is a southern part of earth.` },
                    { key: "B", isCorrect: false, content: `Central portion of earth is referred as globe.` },
                    { key: "C", isCorrect: false, content: `The land which is covered by water is referred as globe.` },
                    { key: "D", isCorrect: true, content: `Globe is a true model, miniature form of earth.` },
                ]
        },
        {
            chapterNo: 2,
                description: `What is the latitudinal value of the Tropic of Cancer?`,
                choices: [
                    { key: "A", isCorrect: false, content: `22 1/4 degrees N` },
                    { key: "B", isCorrect: true, content: `22 1/2 degrees N` },
                    { key: "C", isCorrect: false, content: `23 1/2 degrees N` },
                    { key: "D", isCorrect: false, content: `23 1/4 degrees N` },
                ]
        },
        {
            chapterNo: 2,
                description: `What are the three heat zones of the Earth?`,
                choices: [
                    { key: "A", isCorrect: false, content: `Torrid Zone, North Zone, Frigid Zone` },
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