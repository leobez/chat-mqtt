import { useContext, useState } from "react"
import { MqttClient } from "mqtt"
import FeedbackMessageContext from "../context/FeedbackMessageContext"
import FeedbackMessage from "../classes/FeedbackMessage"

const usePublishToTopic = () => {

    const {changeFeedbackMessage} = useContext(FeedbackMessageContext)
    const [loading, setLoading] = useState<boolean>(false)

    const publish = async(client:MqttClient, topic:string, message:string):Promise<void> => {

        if (topic.trim() === '') {
            changeFeedbackMessage(new FeedbackMessage('Choose a topic.', 'bad'))
            console.log('Choose a topic.')
            return;
        }

        if (message.trim() === '') {
            changeFeedbackMessage(new FeedbackMessage('Invalid message.', 'bad'))
            console.log('Invalid message.')
            return;
        }

        try {
            setLoading(true)
            await client.publishAsync(topic, message)
            console.log('Message published.')
            setLoading(false)
            changeFeedbackMessage(new FeedbackMessage('Message published.', 'good'))
        } catch (error) {
            setLoading(false)
            console.log(error)
            changeFeedbackMessage(new FeedbackMessage('Something went wrong.', 'bad'))
        }
    }

    return {
        loading, 
        publish
    }
}

export default usePublishToTopic;