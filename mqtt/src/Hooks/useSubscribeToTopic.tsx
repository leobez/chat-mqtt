import { useEffect, useState } from "react"

const useSubscribeToTopic = () => {
    
    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [subscribedTopics, setSubscribedTopics] = useState<string[]>([])

    const subscribe = async(topic:string, client:any):Promise<void> => {

        if (subscribedTopics.includes(topic)) {
            setMessage('Already subscribed to topic.')
            console.log('Already subscribed to topic.')
            return;
        }

        if (topic.trim() === '') {
            setMessage('Invalid topic.')
            console.log('Invalid topic.')
            return;
        }

        try {
            setLoading(true)
            await client.subscribe(topic)
            setLoading(false)
            setMessage(`Subscribed to topic ${topic}`)
            setSubscribedTopics((prev) => [...prev, topic])
        } catch (error) {
            setLoading(false)
            console.log(error)
            setMessage('Something went wrong.')
        }

    }

    const unsubscribe = async(topic:string, client:any):Promise<void> => {

        if (!subscribedTopics.includes(topic)) {
            setMessage('Topic not subscribed.')
            console.log('Topic not subscribed.')
            return;
        }

        if (topic.trim() === '') {
            setMessage('Invalid topic.')
            console.log('Invalid topic.')
            return;
        }

        try {
            setLoading(true)
            await client.unsubscribe(topic)
            setLoading(false)
            setMessage(`Unsubscribed from topic ${topic}`)
            setSubscribedTopics((prev) => prev.filter(prevTopic => prevTopic !== topic))
        } catch (error) {
            setLoading(false)
            console.log(error)
            setMessage('Something went wrong.')
        }

    }

    return {
        loading, 
        message,
        subscribe,
        unsubscribe,
        subscribedTopics
    }
}

export default useSubscribeToTopic;