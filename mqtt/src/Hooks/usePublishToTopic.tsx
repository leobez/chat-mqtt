import { useState } from "react"

const usePublishToTopic = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')

    const publish = async(client:any, topic:string, message:any):Promise<void> => {
        try {
            setLoading(true)
            await client.publish(topic, message)
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