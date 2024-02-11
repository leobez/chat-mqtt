import { useContext, useState } from "react"
import MessageContext from "../context/MessageContext"
import { MqttClient } from "mqtt"
import MessageAndStatus from "../classes/MessageAndStatus"

const usePublishToTopic = () => {

    const {changeMessageAndStatus} = useContext(MessageContext)
    const [loading, setLoading] = useState<boolean>(false)

    const publish = async(client:MqttClient, topic:string, message:string):Promise<void> => {

        if (topic.trim() === '') {
            console.log('Invalid topic.')
            changeMessageAndStatus(new MessageAndStatus('Invalid topic.', 'bad'))
            return;
        }

        if (message.trim() === '') {
            console.log('Invalid message.')
            changeMessageAndStatus(new MessageAndStatus('Invalid message.', 'bad'))
            return;
        }

        try {
            setLoading(true)
            await client.publish(topic, message)
            console.log('Message published.')
            setLoading(false)
            changeMessageAndStatus(new MessageAndStatus('Message published.', 'good'))
        } catch (error) {
            setLoading(false)
            console.log(error)
            changeMessageAndStatus(new MessageAndStatus('Something went wrong.', 'bad'))
        }
    }

    return {
        loading, 
        publish
    }
}

export default usePublishToTopic;