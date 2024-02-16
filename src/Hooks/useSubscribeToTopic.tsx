import { useContext, useState } from "react"
import { FeedbackContext } from "../context/FeedbackContext"
import ClientContext from "../context/ClientContext"
import { MQTTClientContextType } from "../@types/mqtt"
import { FeedbackType, ITFeedback } from "../@types/feedback"

const useSubscribeToTopic = () => {
    
    // Context
    const {client, topics, updateTopics} = useContext(ClientContext) as MQTTClientContextType
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
            return;
        }

        if (topic.trim() === '') {
            createFeedback('Invalid topic.', 'bad')
            return;
        }

        if (!client) {
            createFeedback('Client error.', 'bad')
            return;
        }

        try {
            setSubLoading(true)
            await client.subscribeAsync(topic)
            setSubLoading(false)
            createFeedback(`Subscribed to topic.`, 'good')
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
            return;
        }

        if (topic.trim() === '') {
            createFeedback('Invalid topic.', 'bad')
            return;
        }

        if (!client) {
            createFeedback('Client error.', 'bad')
            return;
        }

        try {
            setUnsubLoading(true)
            await client.unsubscribeAsync(topic)
            setUnsubLoading(false)
            createFeedback(`Unsubscribed from topic.`, 'bad')
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