import { useContext, useState } from "react"
import FeedbackMessageContext from "../context/FeedbackContext"
import FeedbackMessage from "../classes/FeedbackMessage"
import ClientContext from "../context/ClientContext"
import { MQTTClientContextType } from "../@types/mqtt"

const useSubscribeToTopic = () => {
    
    // Feedback context -> change later
    const {changeFeedbackMessage} = useContext(FeedbackMessageContext)

    // Context
    const {client, topics, updateTopics} = useContext(ClientContext) as MQTTClientContextType

    // Loading states
    const [subLoading, setSubLoading]       = useState<boolean>(false)
    const [unsubLoading, setUnsubLoading]   = useState<boolean>(false)

    const subscribe = async(topic:string):Promise<void> => {

        if (topics.includes(topic)) {
            changeFeedbackMessage(new FeedbackMessage(`Already subscribed to topic.`, 'bad'))
            console.log(`Already subscribed to topic '${topic}'`)
            return;
        }

        if (topic.trim() === '') {
            changeFeedbackMessage(new FeedbackMessage('Invalid topic.', 'bad'))
            console.log('Invalid topic.')
            return;
        }

        if (!client) {
            changeFeedbackMessage(new FeedbackMessage('Client error.', 'bad'))
            console.log('Client error')
            return;
        }

        try {
            setSubLoading(true)
            await client.subscribeAsync(topic)
            setSubLoading(false)
            changeFeedbackMessage(new FeedbackMessage(`Subscribed to topic.`, 'good'))
            updateTopics(topic, 'add')
        } catch (error) {
            setSubLoading(false)
            console.log(error)
            changeFeedbackMessage(new FeedbackMessage('Something went wrong.', 'bad'))
        }

    }

    const unsubscribe = async(topic:string):Promise<void> => {

        if (!topics.includes(topic)) {
            changeFeedbackMessage(new FeedbackMessage('Topic not subscribed.', 'bad'))
            console.log('Topic not subscribed.')
            return;
        }

        if (topic.trim() === '') {
            changeFeedbackMessage(new FeedbackMessage('Invalid topic.', 'bad'))
            console.log('Invalid topic.')
            return;
        }

        if (!client) {
            changeFeedbackMessage(new FeedbackMessage('Client error.', 'bad'))
            console.log('Client error')
            return;
        }

        try {
            setUnsubLoading(true)
            await client.unsubscribeAsync(topic)
            setUnsubLoading(false)
            changeFeedbackMessage(new FeedbackMessage(`Unsubscribed from topic.`, 'bad'))
            updateTopics(topic, 'remove')
        } catch (error) {
            setUnsubLoading(false)
            console.log(error)
            changeFeedbackMessage(new FeedbackMessage('Something went wrong.', 'bad'))
        }

    }

    return {
        subscribe,
        subLoading,
        unsubscribe,
        unsubLoading,
    }
}

export default useSubscribeToTopic;