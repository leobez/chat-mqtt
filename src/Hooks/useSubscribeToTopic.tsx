import { useContext, useState } from "react"
import { FeedbackContext } from "../context/FeedbackContext"
import ClientContext from "../context/ClientContext"
import { MQTTClientContextType } from "../@types/mqtt"
import { FeedbackType, ITFeedback } from "../@types/feedback"

const useSubscribeToTopic = () => {
    
    // Context
    const {client, topics, updateTopics, updateMessage} = useContext(ClientContext) as MQTTClientContextType
    const {updateFeedback} = useContext(FeedbackContext) as FeedbackType

    // Loading states
    const [subLoading, setSubLoading]       = useState<boolean>(false)
    const [unsubLoading, setUnsubLoading]   = useState<boolean>(false)

    const createFeedback = (message:string, status:string, source:string|null=null) => {

        const newFeedback:ITFeedback = {
            message,
            status,
            source
        }

        updateFeedback(newFeedback)
    }

    const subscribe = async(topic:string):Promise<void> => {

        if (topics.includes(topic)) {
            createFeedback(`Already subscribed to topic.`, 'bad')
            updateMessage(`Already subscribed to topic.`, 'addSystem')
            return;
        }

        if (topic.trim() === '') {
            createFeedback('Invalid topic.', 'bad')
            updateMessage('Invalid topic.', 'addSystem')
            return;
        }

        if (!client) {
            createFeedback('Client error.', 'bad')
            updateMessage('Client error.', 'addSystem')
            return;
        }

        try {
            setSubLoading(true)
            await client.subscribeAsync(topic)
            setSubLoading(false)
            updateMessage(`Subscribed to topic '${topic}' .`, 'addSystem')
            updateTopics(topic, 'add')
        } catch (error) {
            setSubLoading(false)
            console.log(error)
            createFeedback('Something went wrong.', 'bad')
        }

    }

    const unsubscribe = async(topic:string):Promise<void> => {

        if (!topics.includes(topic)) {
            createFeedback('Topic not subscribed.', 'bad')
            updateMessage('Topic not subscribed.', 'addSystem')
            return;
        }

        if (topic.trim() === '') {
            createFeedback('Invalid topic.', 'bad')
            updateMessage('Invalid topic.', 'addSystem')
            return;
        }

        if (!client) {
            createFeedback('Client error.', 'bad')
            updateMessage('Client error.', 'addSystem')
            return;
        }

        try {
            setUnsubLoading(true)
            await client.unsubscribeAsync(topic)
            setUnsubLoading(false)
            updateMessage(`Unsubscribed from topic '${topic}' .`, 'addSystem')
            updateTopics(topic, 'remove')
        } catch (error) {
            setUnsubLoading(false)
            console.log(error)
            createFeedback('Something went wrong.', 'bad')
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