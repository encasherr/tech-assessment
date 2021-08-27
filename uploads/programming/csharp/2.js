let data = {
    levels: ["beginner", "intermediate", "expert"],
    questions: [
        {
            description: `<p>This is second sample C# code?</p>
                <pre>
                static void Main(string[] args)
                {
                    int a = 10; int b = 5; int c = 12; int e = 8;
                    int d;
                    string printMessage = 'Check 1 2 3';

                    d = Convert.ToInt32((a * (c - b) / e + (b + c)) <= (e * (c + a) / (b + c) + a));

                    if (d == 1)
                    {
                        printMessage += ' 4 5';
                    }
                    else
                    {
                        printMessage += ' 2 1';
                    }
                    
                    Console.WriteLine(printMessage)
                }
                </pre`,
            choices: [
                {
                    key: "A",
                    isCorrect: false,
                    content: `
                        <pre>
                        Check 1 2 3 4 5
                        </pre>
                        `
                },
                {
                    key: "B",
                    isCorrect: true,
                    content: `
                        <pre>
                        Check 1 2 3 2 1
                        </pre>
                        `
                },
                {
                    key: "C",
                    isCorrect: false,
                    content: `
                        <pre>
                        Check 1 2 3 4 5 2 1
                        </pre>
                        `
                },
                {
                    key: "D",
                    isCorrect: false,
                    content: `
                        <pre>
                        Compilation error
                        </pre>
                        `
                }
            ]
        }
    ]
}
module.exports = {
    data
};