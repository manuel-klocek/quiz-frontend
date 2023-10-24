export enum QuestionType { MULTIPLE = "multiple", TRUE_FALSE = "boolean"}

export enum QuestionDifficulty { EASY = "easy", MEDIUM = "medium", HARD = "hard" }

export type Category = {
    categoryId: number
    categoryName: string
}

export type Question = {
    id: number,
    categoryId: number,
    category: string,
    type: QuestionType,
    difficulty: QuestionDifficulty,
    question: string,
    correctAnswer: string,
    incorrectAnswers: string[]
}