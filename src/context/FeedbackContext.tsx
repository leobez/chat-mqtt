import { ReactNode, createContext, useState } from "react";
import { FeedbackType, ITFeedback } from "../@types/feedback";

export const FeedbackContext = createContext<FeedbackType|null>(null)

type Props = {
    children: ReactNode
}

export const FeedbackContextProvider = ({children}:Props) => {

    // Base value
    const [feedback, setFeedback] = useState<ITFeedback|null>(null)
    
    const updateFeedback = (feedback:ITFeedback|null) => {
        setFeedback(feedback)
    }

    return (
        <FeedbackContext.Provider value={{feedback, updateFeedback}}>
            {children}
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext