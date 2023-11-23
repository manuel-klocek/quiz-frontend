export enum QuestionType { MULTIPLE = "multiple", TRUE_FALSE = "boolean"}

export enum QuestionDifficulty { EASY = "easy", MEDIUM = "medium", HARD = "hard" }

export type Category = {
    categoryId: number
    categoryName: string
}

export type Question = {
    id: string,
    categoryId: number,
    category: string,
    type: QuestionType,
    difficulty: QuestionDifficulty,
    question: string,
    answers: string[]
}

export type User = {
    id: string,
    username: string,
    highscore: number,
    totallyAnsweredQuestions: number,
    mail: string,
    icon: string
}

export type Answer = {
    questionId: string,
    takenAnswer: string
}

export type QuizResult = {
    score: number,
    highscore: number
}

export type AnswerResult = {
    correctAnswer: string
}