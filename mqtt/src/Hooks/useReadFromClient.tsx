import { useEffect, useState } from "react"
import Message from "../classes/Message"

const useReadFromClient = (client:any) => {

    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        client.on('message', (topic:string, content:any) => {
            const message = new Message(topic, content.toString())
            console.log('New message: ', message)
            setMessages(prev => [...prev, message])
        })
    }, [])

    return {
        messages,
    }
}

export default useReadFromClient;