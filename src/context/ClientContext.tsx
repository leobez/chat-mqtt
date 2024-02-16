import { MqttClient } from "mqtt";
import { ReactNode, createContext, useState } from "react";
import { MQTTClientContextType, Message } from "../@types/mqtt";

export const ClientContext = createContext<MQTTClientContextType|null>(null)

type Props = {
    children: ReactNode
}

export const ClientContextProvider = ({children}:Props) => {

    const [client, setClient] = useState<MqttClient|null>(null)
    const [topics, setTopics] = useState<string[]>([])
    const [messages, setMessages] = useState<Message[]>([])

    const updateClient = (client: MqttClient|null):void => {
        setClient(client)
    }

    const updateTopics = (topic:string, action:string):void => {
        if (action === 'add') {
            setTopics((prev) => [...prev, topic])
        }
        if (action === 'remove') {
            setTopics((prev) => prev.filter((t) => t !== topic))
        }
    }

    const updateMessages = (message:Message):void => {
        setMessages((prev) => [...prev, message])
    }

    return (
        
        <ClientContext.Provider value={{
            client, updateClient,
            topics, updateTopics,
            messages, updateMessages
        }}>

            {children}
            
        </ClientContext.Provider>        
    )

}

export default ClientContext