import { useState } from "react"

const useSubscribeToTopic = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')

    const subscribe = async(topic:string, client:any):Promise<void> => {

        try {
            setLoading(true)
            client.subscribe(topic, () => {
                console.log('cliente inscrito no topico: ', topic)
            })
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
        subscribe
    }
}

export default useSubscribeToTopic;