import { useState } from "react"

const usePublishToTopic = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')

    const publish = async(client:any, topic:string, message:any):Promise<void> => {

        if (topic.trim() === '') {
            console.log('Invalid topic.')
            setMessage('Invalid topic.')
            return;
        }

        if (message.trim() === '') {
            console.log('Invalid message.')
            setMessage('Invalid message.')
            return;
        }

        try {
            setLoading(true)
            await client.publish(topic, message)
            console.log('Message published.')
            setLoading(false)
            setMessage('Message submited.')
        } catch (error) {
            setLoading(false)
            console.log(error)
            setMessage('Something went wrong.')
        }
    }

    return {
        loading, 
        message,
        publish
    }
}

export default usePublishToTopic;