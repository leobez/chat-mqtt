import { createContext, useState } from "react";

const MessageContext = createContext({
    message: '',
    changeMessage:(m:string)=>{}
})

export const MessageProvider = ({children}:any) => {

    const [message, setMessage] = useState<string>('')

    const changeMessage = (newMsg:string) => {
        console.log('chegou.')
        setMessage(newMsg)
    }

    return (
        <MessageContext.Provider value={{message, changeMessage}}>
            {children}
        </MessageContext.Provider>
    )
}

export default MessageContext