import { useContext, useState } from "react"
import { FeedbackContext } from "../context/FeedbackContext"
import ClientContext from "../context/ClientContext"
import { MQTTClientContextType } from "../@types/mqtt"
import { FeedbackType, ITFeedback } from "../@types/feedback"

const useSubscribeToTopic = () => {
    
    // Context
    const {client, topics, updateTopics, addSystemMessage} = useContext(ClientContext) as MQTTClientContextType
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

        console.log(message)

        updateFeedback(newFeedback)
    }

    const subscribe = async(topic:string):Promise<void> => {

        if (topics.includes(topic)) {
            createFeedback(`Already subscribed to topic.`, 'bad')
            addSystemMessage(`Already subscribed to topic.`)
            return;
        }

        if (topic.trim() === '') {
            createFeedback('Invalid topic.', 'bad')
            addSystemMessage('Invalid topic.')
            return;
        }

        if (!client) {
            createFeedback('Client error.', 'bad')
            addSystemMessage('Client error.')
            return;
        }

        try {
            setSubLoading(true)
            await client.subscribeAsync(topic)
            setSubLoading(false)
            addSystemMessage(`Subscribed to topic '${topic}' .`)
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
            addSystemMessage('Topic not subscribed.')
            return;
        }

        if (topic.trim() === '') {
            createFeedback('Invalid topic.', 'bad')
            addSystemMessage('Invalid topic.')
            return;
        }

        if (!client) {
            createFeedback('Client error.', 'bad')
            addSystemMessage('Client error.')
            return;
        }

        try {
            setUnsubLoading(true)
            await client.unsubscribeAsync(topic)
            setUnsubLoading(false)
            addSystemMessage(`Unsubscribed from topic '${topic}' .`)
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