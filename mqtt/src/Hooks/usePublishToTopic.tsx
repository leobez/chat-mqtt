import { useContext, useState } from "react"
import MessageContext from "../context/MessageContext"
import { MqttClient } from "mqtt"

const usePublishToTopic = () => {

    const {changeMessage} = useContext(MessageContext)
    const [loading, setLoading] = useState<boolean>(false)

    const publish = async(client:MqttClient, topic:string, message:string):Promise<void> => {

        if (topic.trim() === '') {
            console.log('Invalid topic.')
            changeMessage('Invalid topic.')
            return;
        }

        if (message.trim() === '') {
            console.log('Invalid message.')
            changeMessage('Invalid message.')
            return;
        }

        try {
            setLoading(true)
            await client.publish(topic, message)
            console.log('Message published.')
            setLoading(false)
            changeMessage('Message submited.')
        } catch (error) {
            setLoading(false)
            console.log(error)
            changeMessage('Something went wrong.')
        }
    }

    return {
        loading, 
        publish
    }
}

export default usePublishToTopic;