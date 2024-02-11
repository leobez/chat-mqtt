import { useContext, useState } from "react"
import MessageContext from "../context/MessageContext"
import { MqttClient } from "mqtt"
import MessageAndStatus from "../classes/MessageAndStatus"

const useSubscribeToTopic = () => {
    
    const {changeMessageAndStatus} = useContext(MessageContext)
    const [loading, setLoading] = useState<boolean>(false)
    const [subscribedTopics, setSubscribedTopics] = useState<string[]>([])

    const subscribe = async(topic:string, client:MqttClient):Promise<void> => {

        if (subscribedTopics.includes(topic)) {
            changeMessageAndStatus(new MessageAndStatus('Already subscribed to topic.', 'bad'))
            console.log('Already subscribed to topic.')
            return;
        }

        if (topic.trim() === '') {
            changeMessageAndStatus(new MessageAndStatus('Invalid topic.', 'bad'))
            console.log('Invalid topic.')
            return;
        }

        try {
            setLoading(true)
            await client.subscribe(topic)
            setLoading(false)
            changeMessageAndStatus(new MessageAndStatus(`Subscribed to topic '${topic}'`, 'good'))
            setSubscribedTopics((prev) => [...prev, topic])
        } catch (error) {
            setLoading(false)
            console.log(error)
            changeMessageAndStatus(new MessageAndStatus('Something went wrong.', 'bad'))
        }

    }

    const unsubscribe = async(topic:string, client:MqttClient):Promise<void> => {

        if (!subscribedTopics.includes(topic)) {
            changeMessageAndStatus(new MessageAndStatus('Topic not subscribed.', 'bad'))
            console.log('Topic not subscribed.')
            return;
        }

        if (topic.trim() === '') {
            changeMessageAndStatus(new MessageAndStatus('Invalid topic.', 'bad'))
            console.log('Invalid topic.')
            return;
        }

        try {
            setLoading(true)
            await client.unsubscribe(topic)
            setLoading(false)
            changeMessageAndStatus(new MessageAndStatus(`Unsubscribed from topic '${topic}'`, 'good'))
            setSubscribedTopics((prev) => prev.filter(prevTopic => prevTopic !== topic))
        } catch (error) {
            setLoading(false)
            console.log(error)
            changeMessageAndStatus(new MessageAndStatus('Something went wrong.', 'bad'))
        }

    }

    return {
        loading, 
        subscribe,
        unsubscribe,
        subscribedTopics
    }
}

export default useSubscribeToTopic;