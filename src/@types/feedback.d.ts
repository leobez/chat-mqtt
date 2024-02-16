export interface ITFeedback {
    message: string,
    status: string,
    source: string | null,
}

export type FeedbackType = {
    feedback: ITFeedback|null
    updateFeedback: (feedbackMessage:ITFeedback) => void
}