let data = {
    levels: ["beginner", "intermediate", "expert"],
    questions: [
        {
            description: `Which of the following features does Inheritance provide?
            1. Extend the base class functionality
            2. Use existing functionality from base class
            3. Override the base class functionality
            4. All of the above
            `,
            choices: [
                {
                    key: "A",
                    isCorrect: false,
                    content: `
                        1 and 2
                        `
                },
                {
                    key: "B",
                    isCorrect: false,
                    content: `
                        2 and 3
                        `
                },
                {
                    key: "C",
                    isCorrect: false,
                    content: `
                        1 and 3
                        `
                },
                {
                    key: "D",
                    isCorrect: true,
                    content: `
                        4
                        `
                }
            ]
        },
        {
            description: `Which of the following type of inheritance is not directly supported by C#?`,
            choices: [
                {
                    key: "A",
                    isCorrect: false,
                    content: `
                        Multilevel inheritance
                        `
                },
                {
                    key: "B",
                    isCorrect: true,
                    content: `
                        Multiple inheritance
                        `
                },
                {
                    key: "C",
                    isCorrect: false,
                    content: `
                        Two level inheritance
                        `
                },
                {
                    key: "D",
                    isCorrect: false,
                    content: `
                        None of the above
                        `
                }
            ]
        },
        {
            description: `What is the default access modifier of a class when not specified?`,
            choices: [
                {
                    key: "A",
                    isCorrect: false,
                    content: `
                    protected
                        `
                },
                {
                    key: "B",
                    isCorrect: false,
                    content: `
                    internal
                        `
                },
                {
                    key: "C",
                    isCorrect: true,
                    content: `
                    private
                        `
                },
                {
                    key: "D",
                    isCorrect: false,
                    content: `
                    public
                        `
                }
            ]
        },
        {
            description: `Which of the following statements are true regarding overloading and overriding?
            1. Overriding is an ability to define a method in derived class with same name and signature as one of the methods in base class.
            2. Overloading is an ability to define a method in derived class with same name and signature as one of the methods in base class.
            3. Overloading is also known as compile time polymorphism.
            4. Overriding is also known as early binding.
            `,
            choices: [
                {
                    key: "A",
                    isCorrect: false,
                    content: `
                    1 and 2
                        `
                },
                {
                    key: "B",
                    isCorrect: false,
                    content: `
                    2 and 4
                        `
                },
                {
                    key: "C",
                    isCorrect: true,
                    content: `
                    1 and 3
                        `
                },
                {
                    key: "D",
                    isCorrect: false,
                    content: `
                    1 and 4
                        `
                }
            ]
        }
    ]
}
module.exports = {
    data
};