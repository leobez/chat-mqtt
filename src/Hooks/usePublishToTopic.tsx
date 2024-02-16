import { useContext, useState } from "react"
import FeedbackMessageContext from "../context/FeedbackContext"
import FeedbackMessage from "../classes/FeedbackMessage"
import ClientContext from "../context/ClientContext"
import { MQTTClientContextType } from "../@types/mqtt"

const usePublishToTopic = () => {

    // Feedback context -> change later
    const {changeFeedbackMessage} = useContext(FeedbackMessageContext)

    // Context
    const {client} = useContext(ClientContext) as MQTTClientContextType

    // Hook states
    const [loading, setLoading] = useState<boolean>(false)

    const publish = async(topic:string, message:string):Promise<void> => {

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

        if (!client) {
            changeFeedbackMessage(new FeedbackMessage('Client error.', 'bad'))
            console.log('Client error')
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