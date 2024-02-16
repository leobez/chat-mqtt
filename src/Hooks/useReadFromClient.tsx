import { useContext, useEffect } from "react"
import ClientContext from "../context/ClientContext"
import { MQTTClientContextType, Message } from "../@types/mqtt"

const useReadFromClient = () => {

    const {client, messages, updateMessages} = useContext(ClientContext) as MQTTClientContextType

    useEffect(() => {
        client?.on('message', (topic:string, content:any) => {

            const message:Message = {
                topic: topic, 
                message: content.toString()
            }

            console.log('New message: ', message)

            updateMessages(message)

        })

    }, [])

    return {
        messages
    }
}

export default useReadFromClient;