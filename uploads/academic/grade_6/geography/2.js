let data = {
    questions: [
        {
            chapterNo: 2,
            description: `What is the value of Prime Meridian?`,
            choices: [
                { key: "A", isCorrect: false, content: `90 degrees` },
                { key: "B", isCorrect: false, content: `45 degrees` },
                { key: "C", isCorrect: false, content: `0 degree` },
                { key: "D", isCorrect: false, content: `60 degrees` }
            ]
        },
        {
            chapterNo: 2,
            description: `What are parallels of latitude and meridians of longitude?`,
            choices: [
                { key: "A", isCorrect: true, 
                    content: `<p>All the parallel circles from the equator up to the poles are called parallels of latitude.</p>
                    <p>All the semi-circles which join north pole to south pole are termed as meridians of longitude.</p>` },
                { key: "B", isCorrect: false, 
                content: `<p>All the semi-circles which join north pole to south pole are termed as parallels of latitude.</p>
                <p>All the parallel circles from the equator up to the poles are called meridians of longitude.</p>` },
                { key: "C", isCorrect: false, 
                content: `<p>All the circles which join north pole to south pole are termed as parallels of latitude.</p>
                <p>All the parallel circles from the equator up to the poles are called meridians of longitude.</p>` },
                { key: "D", isCorrect: false, 
                content: `None of above` }
            ]
        },
        {
            chapterNo: 2,
            description: `Why does the Torrid Zone receive the maximum amount of heat?`,
            choices: [
                { key: "A", isCorrect: false, 
                    content: `<p>The Sun shines perpendicular between Tropic of Cancer and Tropic of Capricorn for six months in a year.
                    Perpendicular sun rays give more heat than slanting sun rays.</p>` },
                { key: "B", isCorrect: true, 
                content: `<p>The Sun shines perpendicular between Tropic of Cancer and Tropic of Capricorn throughout the year.
                Perpendicular sun rays give more heat than slanting sun rays.</p>` },
                { key: "C", isCorrect: false, 
                content: `<p>The Sun shines perpendicular between Tropic of Cancer and Tropic of Capricorn throughout the year.
                Perpendicular sun rays give less heat than slanting sun rays.</p>` },
                { key: "D", isCorrect: false, 
                content: `None of above` }
            ]
        },
        {
            chapterNo: 2,
            description: `Why is it 5.30 p.m in India and 12.00 noon in London?`,
            choices: [
                { key: "A", isCorrect: false,
                    content: `<p>London is located at 10 degree longitude while India located at East of Greenwich and 82 1/2 degree E longitude is 
                    taken as standard time in India</p>` },
                { key: "B", isCorrect: true, 
                content: `<p>London is located at 0 degree longitude while India located at East of Greenwich and 82 1/2 degree E longitude is 
                taken as standard time in India</p>` },
                { key: "C", isCorrect: false, 
                content: `<p>London is located at 0 degree longitude while India located at East of Greenwich and 81 1/2 degree E longitude is 
                taken as standard time in India</p>` },
                { key: "D", isCorrect: false, 
                content: `None of above` }
            ]
        },
        {
            chapterNo: 2,
            description: `<p>Fill in the blank</p><p>The frigid zone lies near _______</p> `,
            choices: [
                { key: "A", isCorrect: false,
                    content: `<p>the Tropic of Cancer</p>` },
                { key: "B", isCorrect: true, 
                content: `<p>the Poles</p>` },
                { key: "C", isCorrect: false, 
                content: `<p>the Equator</p>` },
                { key: "D", isCorrect: false, 
                content: `<p>the South Pole</p>` }
            ]
        },
        {
            chapterNo: 2,
            description: `<p>Fill in the blank</p><p>The total number of longitudes are _______</p> `,
            choices: [
                { key: "A", isCorrect: true,
                    content: `<p>360</p>` },
                { key: "B", isCorrect: false, 
                content: `<p>120</p>` },
                { key: "C", isCorrect: false, 
                content: `<p>180</p>` },
                { key: "D", isCorrect: false, 
                content: `<p>90</p>` }
            ]
        },
        {
            chapterNo: 2,
            description: `<p>Fill in the blank</p><p>The Antarctic circle is located in _______</p> `,
            choices: [
                { key: "A", isCorrect: false,
                    content: `<p>the Western hemisphere</p>` },
                { key: "B", isCorrect: false, 
                content: `<p>the Eastern hemisphere</p>` },
                { key: "C", isCorrect: false, 
                content: `<p>the Northern hemisphere</p>` },
                { key: "D", isCorrect: true, 
                content: `<p>the Southern hemisphere</p>` }
            ]
        },
        {
            chapterNo: 2,
            description: `<p>Fill in the blank</p><p>Parallels of latitudes and meridians of longitudes form a _______</p> `,
            choices: [
                { key: "A", isCorrect: false,
                    content: `<p>network called heat zone</p>` },
                { key: "B", isCorrect: false, 
                content: `<p>network called torrid zone</p>` },
                { key: "C", isCorrect: true, 
                content: `<p>network called grid</p>` },
                { key: "D", isCorrect: false, 
                content: `<p>layer called grid</p>` }
            ]
        },
        {
            chapterNo: 2,
            description: `<p>Fill in the blank</p><p>The distance between the longitudes _______ towards poles</p> `,
            choices: [
                { key: "A", isCorrect: false,
                    content: `<p>increases</p>` },
                { key: "B", isCorrect: false, 
                content: `<p>is always same</p>` },
                { key: "C", isCorrect: true, 
                content: `<p>decreases</p>` },
                { key: "D", isCorrect: false, 
                content: `<p>None of above</p>` }
            ]
        },
        {
            chapterNo: 2,
            description: `<p>Fill in the blank</p><p>The The Tropic of Capricorn is located at ____</p> `,
            choices: [
                { key: "A", isCorrect: false,
                    content: `<p>23 1/2 degree N</p>` },
                { key: "B", isCorrect: true, 
                content: `<p>23 1/2 degree S</p>` },
                { key: "C", isCorrect: false, 
                content: `<p>23 1/2 E</p>` },
                { key: "D", isCorrect: false, 
                content: `<p>23 1/2 degree W</p>` }
            ]
        },
        {
            chapterNo: 2,
            description: `<p>Fill in the blank</p><p>The Standard Meridian of India is ____</p> `,
            choices: [
                { key: "A", isCorrect: true,
                    content: `<p>82 1/2 degree E</p>` },
                { key: "B", isCorrect: false, 
                content: `<p>23 1/2 degree S</p>` },
                { key: "C", isCorrect: false, 
                content: `<p>82 3/2 E</p>` },
                { key: "D", isCorrect: false, 
                content: `<p>23 1/2 degree W</p>` }
            ]
        },
        {
            chapterNo: 2,
            description: `<p>Fill in the blank</p><p>The 0 degree Meridian is alsso know as ____</p> `,
            choices: [
                { key: "A", isCorrect: false,
                    content: `<p>Standard Meridian</p>` },
                { key: "B", isCorrect: false, 
                content: `<p>Frigid Zone</p>` },
                { key: "C", isCorrect: true, 
                content: `<p>Prime Meridian</p>` },
                { key: "D", isCorrect: false, 
                content: `<p>South Pole</p>` }
            ]
        },
        {
            chapterNo: 2,
            description: `<p>Fill in the blank</p><p>The Arctic Circle is located in the ____ hemisphere.</p> `,
            choices: [
                { key: "A", isCorrect: false,
                    content: `<p>Western</p>` },
                { key: "B", isCorrect: true, 
                content: `<p>Northern</p>` },
                { key: "C", isCorrect: false, 
                content: `<p>Southern</p>` },
                { key: "D", isCorrect: false, 
                content: `<p>None of above</p>` }
            ]
        }
    ]
    
}
module.exports = {
    data
};