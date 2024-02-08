import { useState } from "react"

const usePublishToTopic = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')

    const publish = async(client:any, topic:string, message:any):Promise<void> => {

        try {
            setLoading(true)
            client.publish(topic, message)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
            setMessage('Algo deu errado.')
        }
    }

    return {
        loading, 
        message,
        publish
    }
}

export default usePublishToTopic;