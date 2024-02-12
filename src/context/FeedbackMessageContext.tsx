import { createContext, useState } from "react";
import FeedbackMessage from "../classes/FeedbackMessage";

const FeedbackMessageContext = createContext({
    feedbackMessage: new FeedbackMessage('', ''),
    changeFeedbackMessage:(feedbackMessage:FeedbackMessage)=>{}
})

export const FeedbackMessageProvider = ({children}:any) => {

    const [feedbackMessage, setFeedbackMessage] = useState<FeedbackMessage>(new FeedbackMessage('', ''))

    const changeFeedbackMessage = (feedbackMessage:FeedbackMessage) => {
        setFeedbackMessage(feedbackMessage)
    }

    return (
        <FeedbackMessageContext.Provider value={{feedbackMessage, changeFeedbackMessage}}>
            {children}
        </FeedbackMessageContext.Provider>
    )
}

export default FeedbackMessageContext