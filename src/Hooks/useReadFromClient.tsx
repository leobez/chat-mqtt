import { useContext, useEffect, useState } from "react"
import ClientMessage from "../classes/ClientMessage"
import ClientContext from "../context/ClientContext"
import { MQTTClientContextType } from "../@types/mqtt"

const useReadFromClient = () => {

    const {client} = useContext(ClientContext) as MQTTClientContextType

    const [messages, setMessages] = useState<ClientMessage[]>([])

    useEffect(() => {
        client?.on('message', (topic:string, content:any) => {
            const message = new ClientMessage(topic, content.toString())
            console.log('New message: ', message)
            setMessages(prev => [...prev, message])
        })
    }, [])

    return {
        messages,
    }
}

export default useReadFromClient;