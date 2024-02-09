import { useContext, useState } from "react"
import MessageContext from "../context/MessageContext"

const useSubscribeToTopic = () => {
    
    const {changeMessage} = useContext(MessageContext)
    const [loading, setLoading] = useState<boolean>(false)
    const [subscribedTopics, setSubscribedTopics] = useState<string[]>([])

    const subscribe = async(topic:string, client:any):Promise<void> => {

        if (subscribedTopics.includes(topic)) {
            changeMessage('Already subscribed to topic.')
            console.log('Already subscribed to topic.')
            return;
        }

        if (topic.trim() === '') {
            changeMessage('Invalid topic.')
            console.log('Invalid topic.')
            return;
        }

        try {
            setLoading(true)
            await client.subscribe(topic)
            setLoading(false)
            changeMessage(`Subscribed to topic ${topic}`)
            setSubscribedTopics((prev) => [...prev, topic])
        } catch (error) {
            setLoading(false)
            console.log(error)
            changeMessage('Something went wrong.')
        }

    }

    const unsubscribe = async(topic:string, client:any):Promise<void> => {

        if (!subscribedTopics.includes(topic)) {
            changeMessage('Topic not subscribed.')
            console.log('Topic not subscribed.')
            return;
        }

        if (topic.trim() === '') {
            changeMessage('Invalid topic.')
            console.log('Invalid topic.')
            return;
        }

        try {
            setLoading(true)
            await client.unsubscribe(topic)
            setLoading(false)
            changeMessage(`Unsubscribed from topic '${topic}' `)
            setSubscribedTopics((prev) => prev.filter(prevTopic => prevTopic !== topic))
        } catch (error) {
            setLoading(false)
            console.log(error)
            changeMessage('Something went wrong.')
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