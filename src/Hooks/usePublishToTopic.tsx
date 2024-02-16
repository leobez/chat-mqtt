import { useContext, useState } from "react"
import { FeedbackContext } from "../context/FeedbackContext"
import ClientContext from "../context/ClientContext"
import { MQTTClientContextType } from "../@types/mqtt"
import { FeedbackType, ITFeedback } from "../@types/feedback"

const usePublishToTopic = () => {

    // Context
    const {client, addSystemMessage} = useContext(ClientContext) as MQTTClientContextType
    const {updateFeedback} = useContext(FeedbackContext) as FeedbackType

    // Hook states
    const [loading, setLoading] = useState<boolean>(false)

    const createFeedback = (message:string, status:string, source:string|null=null) => {

        const newFeedback:ITFeedback = {
            message,
            status,
            source
        }

        console.log(message)

        updateFeedback(newFeedback)
    }

    const publish = async(topic:string, message:string):Promise<void> => {

        if (topic.trim() === '') {
            createFeedback('Choose a topic.', 'bad')
            addSystemMessage('Choose a topic.')
            return;
        }

        if (message.trim() === '') {
            createFeedback('Invalid message.', 'bad')
            addSystemMessage('Invalid message.')
            return;
        }

        if (!client) {
            createFeedback('Client error.', 'bad')
            addSystemMessage('Client error.')
            return;
        }

        try {
            setLoading(true)
            await client.publishAsync(topic, message)
            setLoading(false)
            createFeedback('Message published.', 'good')
        } catch (error) {
            setLoading(false)
            console.log(error)
            createFeedback('Something went wrong.', 'bad')
        }
    }

    return {
        loading, 
        publish
    }
}

export default usePublishToTopic;