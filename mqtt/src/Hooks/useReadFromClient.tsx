import { useEffect, useState } from "react"
import ClientMessage from "../classes/ClientMessage"
import { MqttClient } from "mqtt"

const useReadFromClient = (client:MqttClient) => {

    const [messages, setMessages] = useState<ClientMessage[]>([])

    useEffect(() => {
        client.on('message', (topic:string, content:any) => {
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