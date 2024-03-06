export interface ExerciseDifficulty {
    overdrawPenalty: number,
    massiveOverdrawPenalty: number,
    massiveOverdrawPenaltyThreshold: number,
    underdrawPenalty: number,
    massiveUnderdrawPenalty: number,
    massiveUnderdrawPenaltyThreshold: number,
}

export const EXERCISE_DIFFICULTY_BEGINNER: ExerciseDifficulty = {
    overdrawPenalty: 0.1,
    massiveOverdrawPenalty: 0.5,
    massiveOverdrawPenaltyThreshold: .3,
    underdrawPenalty: 0.1,
    massiveUnderdrawPenalty: 0.5,
    massiveUnderdrawPenaltyThreshold: .3,
}