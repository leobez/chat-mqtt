import { useState } from "react"
import mqtt from 'mqtt'

const useConnectToBroker = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [client, setClient] = useState<any>()

    const connect = async(connectionString:string):Promise<void> => {
        try {
            setLoading(true)
            let tempClient = await mqtt.connect(connectionString)
            setClient(tempClient)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        loading, 
        message,
        connect,
        client
    }
}

export default useConnectToBroker;