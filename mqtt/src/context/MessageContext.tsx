import { createContext, useState } from "react";
import MessageAndStatus from "../classes/MessageAndStatus";

const MessageContext = createContext({
    messageAndStatus: new MessageAndStatus('', ''),
    changeMessageAndStatus:(newMsgStatus:MessageAndStatus)=>{}
})

export const MessageProvider = ({children}:any) => {

    const [messageAndStatus, setMessageAndStatus] = useState<MessageAndStatus>(new MessageAndStatus('', ''))

    const changeMessageAndStatus = (newMsgStatus:MessageAndStatus) => {
        setMessageAndStatus(newMsgStatus)
    }

    return (
        <MessageContext.Provider value={{messageAndStatus, changeMessageAndStatus}}>
            {children}
        </MessageContext.Provider>
    )
}

export default MessageContext